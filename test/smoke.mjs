/*
 * Smoke-Test der gebuendelten Card gegen ein jsdom-DOM.
 * Laeuft ohne Home Assistant: hass wird gestubbt, Service-Calls werden mitgeschrieben.
 *   node test/smoke.mjs
 */
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!DOCTYPE html><body></body>", { pretendToBeVisual: true });
/* Alle DOM-Konstruktoren (Grossbuchstabe) plus die genutzten Kleinschreib-Globals uebernehmen */
for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (/^[A-Z]/.test(key) && !(key in globalThis)) {
    try {
      globalThis[key] = dom.window[key];
    } catch {
      /* nicht kopierbare Getter ignorieren */
    }
  }
}
/* Diese kennt Node selbst — die jsdom-Varianten muessen trotzdem gewinnen */
for (const key of ["Event", "CustomEvent", "EventTarget", "DOMException", "AbortSignal"]) {
  globalThis[key] = dom.window[key];
}
for (const key of [
  "document",
  "customElements",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "getComputedStyle",
]) {
  globalThis[key] = dom.window[key];
}
globalThis.window = dom.window;

const results = [];
const check = (name, fn) => {
  try {
    fn();
    results.push(`  ok   ${name}`);
  } catch (err) {
    results.push(`  FAIL ${name}\n       ${err.message}`);
    process.exitCode = 1;
  }
};

await import("../tomtut-pool-heatpump-card.js");

/* --- Registrierung --- */
check("Card-Element registriert", () =>
  assert.ok(customElements.get("tomtut-pool-heatpump-card"))
);
check("Editor-Element registriert", () =>
  assert.ok(customElements.get("tomtut-pool-heatpump-card-editor"))
);
check("in window.customCards eingetragen", () =>
  assert.ok(window.customCards.some((c) => c.type === "tomtut-pool-heatpump-card"))
);

const Card = customElements.get("tomtut-pool-heatpump-card");

/* --- setConfig-Validierung --- */
check("setConfig ohne Entity wirft", () =>
  assert.throws(() => new Card().setConfig({}), /Mindestens eine Entity/)
);
check("setConfig mit switch_entity ok", () =>
  new Card().setConfig({ switch_entity: "switch.wp" })
);
check("getStubConfig liefert Defaults", () => {
  const stub = Card.getStubConfig();
  assert.equal(stub.image_variant, "transparent");
});
check("getConfigElement liefert Editor", () => {
  const el = Card.getConfigElement();
  assert.equal(el.tagName.toLowerCase(), "tomtut-pool-heatpump-card-editor");
});

/* --- hass-Stub --- */
const calls = [];
const makeHass = (overrides = {}) => ({
  config: { unit_system: { temperature: "°C" } },
  callService: (domain, service, data) => calls.push({ domain, service, data }),
  states: {
    "switch.wp": { state: "on", attributes: {} },
    "sensor.wp_power": { state: "820", attributes: { unit_of_measurement: "W" } },
    "climate.wp": {
      state: "heat",
      attributes: {
        temperature: 28,
        current_temperature: 26.4,
        min_temp: 15,
        max_temp: 40,
        target_temp_step: 0.5,
      },
    },
    "number.wp_soll": { state: "29", attributes: { min: 15, max: 40, step: 1 } },
    ...overrides,
  },
});

const CONFIG = {
  switch_entity: "switch.wp",
  power_entity: "sensor.wp_power",
  target_entity: "climate.wp",
  current_entity: "climate.wp",
  label_text: "Pool-Waermepumpe",
};

const mount = async (config = CONFIG, hass = makeHass()) => {
  const card = new Card();
  card.setConfig(config);
  card.hass = hass;
  document.body.appendChild(card);
  await card.updateComplete;
  return card;
};

const card = await mount();
const sr = () => card.shadowRoot;

check("Hintergrundbild aus dem Card-Ordner", () => {
  const src = sr().querySelector("img.bg").getAttribute("src");
  assert.equal(src, "/local/community/tomtut-pool-heatpump-card/waermepumpe_transparent.png");
});
check("image_url ueberschreibt die Variante", async () => {
  const c = new Card();
  c.setConfig({ ...CONFIG, image_url: "/local/eigen.png" });
  assert.equal(c._imagePath, "/local/eigen.png");
});
check("Powerbutton ist an", () => assert.ok(sr().querySelector(".power-badge.on")));
check("Stromverbrauch gerendert", () => {
  const txt = sr().textContent;
  assert.match(txt, /820/);
  assert.match(txt, /Watt/);
});
check("Ist- und Soll-Temperatur gerendert", () => {
  const txt = sr().textContent;
  assert.match(txt, /26,4 °C/);
  assert.match(txt, /28,0 °C/);
});
check("Freitext-Badge gerendert", () =>
  assert.match(sr().querySelector(".label-badge").textContent, /Pool-Waermepumpe/)
);
check("Luefter dreht bei 820 W (Schwelle 100)", () =>
  assert.ok(sr().querySelector(".fan-overlay.spinning"))
);
check("Luefter-Overlay auf das Artwork kalibriert", () => {
  const style = sr().querySelector(".fan-overlay").getAttribute("style");
  assert.match(style, /left:40%/);
  assert.match(style, /top:51%/);
  assert.match(style, /width:24%/);
  assert.match(style, /--fan-ratio:1\.12/);
});
check("Luefterrad rotiert im SVG-Koordinatensystem", () => {
  const svg = sr().querySelector(".fan-overlay svg");
  assert.equal(svg.getAttribute("preserveAspectRatio"), "none");
  assert.ok(svg.querySelector("g"), "rotierende <g>-Gruppe fehlt");
});

/* --- Powerbutton: Ausschalten nur mit Bestaetigung --- */
calls.length = 0;
sr().querySelector(".power-badge").click();
await card.updateComplete;
check("Klick auf 'an' schaltet nicht sofort", () => assert.equal(calls.length, 0));
check("Bestaetigungs-Dialog offen", () => assert.ok(sr().querySelector(".confirm-overlay")));
sr().querySelector(".btn.cancel").click();
await card.updateComplete;
check("Abbrechen schliesst ohne Schaltvorgang", () => {
  assert.equal(sr().querySelector(".confirm-overlay"), null);
  assert.equal(calls.length, 0);
});
sr().querySelector(".power-badge").click();
await card.updateComplete;
sr().querySelector(".btn.danger").click();
check("Bestaetigen schaltet aus", () =>
  assert.deepEqual(calls[0], {
    domain: "switch",
    service: "turn_off",
    data: { entity_id: "switch.wp" },
  })
);

/* --- Einschalten ohne Rueckfrage --- */
const offHass = makeHass({ "switch.wp": { state: "off", attributes: {} } });
const cardOff = await mount(CONFIG, offHass);
calls.length = 0;
cardOff.shadowRoot.querySelector(".power-badge").click();
await cardOff.updateComplete;
check("Einschalten ohne Dialog", () => {
  assert.equal(cardOff.shadowRoot.querySelector(".confirm-overlay"), null);
  assert.deepEqual(calls[0], {
    domain: "switch",
    service: "turn_on",
    data: { entity_id: "switch.wp" },
  });
});

/* --- Soll-Temperatur +/- --- */
calls.length = 0;
const steps = sr().querySelectorAll(".step");
steps[1].click();
check("climate: + ruft set_temperature (28 -> 28.5)", () =>
  assert.deepEqual(calls[0], {
    domain: "climate",
    service: "set_temperature",
    data: { entity_id: "climate.wp", temperature: 28.5 },
  })
);
calls.length = 0;
steps[0].click();
check("climate: - ruft set_temperature (28 -> 27.5)", () =>
  assert.equal(calls[0].data.temperature, 27.5)
);

const numCard = await mount({ ...CONFIG, target_entity: "number.wp_soll" });
calls.length = 0;
numCard.shadowRoot.querySelectorAll(".step")[1].click();
check("number: + ruft number.set_value (29 -> 30)", () =>
  assert.deepEqual(calls[0], {
    domain: "number",
    service: "set_value",
    data: { entity_id: "number.wp_soll", value: 30 },
  })
);

/* --- Luefter-Quellen --- */
const lowHass = makeHass({
  "sensor.wp_power": { state: "12", attributes: { unit_of_measurement: "W" } },
});
const idleCard = await mount(CONFIG, lowHass);
check("Luefter steht unter der Schwelle", () =>
  assert.ok(idleCard.shadowRoot.querySelector(".fan-overlay.idle"))
);
const entHass = makeHass({
  "sensor.wp_power": { state: "5", attributes: { unit_of_measurement: "W" } },
  "binary_sensor.kompressor": { state: "on", attributes: {} },
});
const entCard = await mount(
  { ...CONFIG, fan_source: "entity", fan_entity: "binary_sensor.kompressor" },
  entHass
);
check("Luefter dreht ueber fan_entity", () =>
  assert.ok(entCard.shadowRoot.querySelector(".fan-overlay.spinning"))
);
check("kW-Sensor wird auf W umgerechnet", () => {
  const c = new Card();
  c.setConfig(CONFIG);
  c.hass = makeHass({
    "sensor.wp_power": { state: "1.4", attributes: { unit_of_measurement: "kW" } },
  });
  assert.equal(c._powerWatt, 1400);
});

/* --- Editor --- */
const Editor = customElements.get("tomtut-pool-heatpump-card-editor");
const editor = new Editor();
editor.setConfig(CONFIG);
editor.hass = makeHass();
document.body.appendChild(editor);
await editor.updateComplete;
check("Editor rendert Eingabefelder", () =>
  assert.ok(editor.shadowRoot.querySelector('input[data-key="switch_entity"]'))
);
check("Editor schlaegt Entities vor", () =>
  assert.ok(editor.shadowRoot.querySelectorAll("datalist option").length > 0)
);
check("Editor hat erweiterte Sektionen", () =>
  assert.ok(editor.shadowRoot.querySelector(".section.advanced"))
);
check("Editor feuert config-changed", () => {
  let fired = null;
  editor.addEventListener("config-changed", (e) => (fired = e.detail.config));
  const input = editor.shadowRoot.querySelector('input[data-key="label_text"]');
  input.value = "Neue WP";
  input.dispatchEvent(new dom.window.Event("input"));
  assert.equal(fired.label_text, "Neue WP");
});

console.log(results.join("\n"));
console.log(
  process.exitCode ? "\nSmoke-Test FEHLGESCHLAGEN" : `\nSmoke-Test ok (${results.length} Checks)`
);
