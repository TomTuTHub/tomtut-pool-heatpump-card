/*!
 * tomtut-pool-heatpump-card.js — generische Lovelace Custom Card fuer Pool-Waermepumpen
 *
 * Keine Integration noetig: alle Werte kommen aus frei konfigurierbaren Entities
 * (climate / number / sensor / switch). Hintergrundbilder liegen im Card-Repo und
 * werden von HACS nach www/community/tomtut-pool-heatpump-card/ kopiert.
 *
 * Aufbau, Look und Positions-System sind an tomtut-pool-dosing-vigipool-card angelehnt.
 */

import { LitElement, html, css, nothing } from "lit";

/* Positions-/Darstellungs-Defaults (alle in % der Bildbreite/-hoehe).
   Die Werte sind auf das mitgelieferte Artwork kalibriert: das Lueftergitter liegt
   dort bei 28,2–51,9 % der Breite und 27,5–74,8 % der Hoehe, ist also perspektivisch
   elliptisch — daher fan_ratio (Hoehe/Breite) statt eines runden Overlays. */
const DEFAULTS = {
  /* Luefter-Overlay */
  fan_top: 51,
  fan_left: 40,
  fan_size: 24,
  fan_ratio: 1.12,
  fan_speed: 60,
  fan_color: "black",
  fan_inactive: "gray",
  fan_power_threshold: 100,
  /* Powerbutton */
  power_btn_top: 8,
  power_btn_left: 4,
  power_btn_scale: 100,
  /* Stromverbrauch */
  power_top: 10,
  power_left: 84,
  power_scale: 95,
  power_box: true,
  power_color: "white",
  power_label: true,
  power_decimals: 0,
  /* Ist-Temperatur */
  current_bottom: 8,
  current_left: 15,
  current_scale: 100,
  current_box: true,
  current_color: "white",
  current_label: true,
  /* Soll-Temperatur */
  target_bottom: 8,
  target_left: 80,
  target_scale: 100,
  target_box: true,
  target_color: "white",
  target_label: true,
  target_step: 0.5,
  /* Freitext-Badge */
  label_top: 3,
  label_left: 50,
  label_scale: 100,
  label_box: true,
  label_color: "white",
};

const IMAGES = {
  weiss: "waermepumpe_weiss.png",
  schwarz: "waermepumpe_schwarz.png",
  transparent: "waermepumpe_transparent.png",
};

const IMAGE_BASE = "/local/community/tomtut-pool-heatpump-card/";

/* Luefterrad — uebernommen aus der Vigipool-Card (pump_style "fan") */
const FAN_SVG =
  '<circle cx="20" cy="20" r="3" fill="currentColor"/>' +
  '<path d="M20,17 Q20,6 12,6 Q4,6 6,14 Q8,17 20,17 Z" fill="currentColor" opacity="0.85"/>' +
  '<path d="M23,20 Q34,20 34,12 Q34,4 26,6 Q23,8 23,20 Z" fill="currentColor" opacity="0.85"/>' +
  '<path d="M20,23 Q20,34 28,34 Q36,34 34,26 Q32,23 20,23 Z" fill="currentColor" opacity="0.85"/>' +
  '<path d="M17,20 Q6,20 6,28 Q6,36 14,34 Q17,32 17,20 Z" fill="currentColor" opacity="0.85"/>';

const ON_STATES = ["on", "true", "heat", "cool", "heating", "cooling", "auto", "dry", "fan_only", "open", "home"];

const fmt = (v, dec) =>
  Number(v)
    .toFixed(dec)
    .replace(".", ",");

class TomtutPoolHeatpumpCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _confirmOpen: { state: true },
  };

  setConfig(config) {
    if (!config) throw new Error("Ungueltige Konfiguration");
    if (
      !config.switch_entity &&
      !config.power_entity &&
      !config.target_entity &&
      !config.current_entity
    ) {
      throw new Error(
        "Mindestens eine Entity noetig: switch_entity, power_entity, target_entity oder current_entity"
      );
    }
    this._config = { image_variant: "transparent", ...config };
    this._confirmOpen = false;
  }

  static getConfigElement() {
    return document.createElement("tomtut-pool-heatpump-card-editor");
  }

  static getStubConfig() {
    return {
      image_variant: "transparent",
      switch_entity: "",
      power_entity: "",
      target_entity: "",
      current_entity: "",
      label_text: "Pool-Waermepumpe",
    };
  }

  getCardSize() {
    return 6;
  }

  /* ---------- Helfer ---------- */

  _v(key) {
    return this._config?.[key] ?? DEFAULTS[key];
  }

  _ent(id) {
    return id ? this.hass?.states?.[id] : undefined;
  }

  get _imagePath() {
    if (this._config.image_url) return this._config.image_url;
    const variant = this._config.image_variant ?? "transparent";
    return IMAGE_BASE + (IMAGES[variant] ?? IMAGES.transparent);
  }

  get _powerWatt() {
    const e = this._ent(this._config.power_entity);
    if (!e) return null;
    const v = parseFloat(e.state);
    if (isNaN(v)) return null;
    const unit = (e.attributes?.unit_of_measurement || "W").toLowerCase();
    return unit === "kw" ? v * 1000 : v;
  }

  get _switchOn() {
    const e = this._ent(this._config.switch_entity);
    return e ? ON_STATES.includes(String(e.state).toLowerCase()) : false;
  }

  /* Soll-Temperatur: climate (attributes.temperature) oder number (state) */
  get _target() {
    const id = this._config.target_entity;
    const e = this._ent(id);
    if (!e) return null;
    const climate = id.startsWith("climate.");
    const value = climate ? e.attributes?.temperature : parseFloat(e.state);
    if (value === undefined || value === null || isNaN(value)) return null;
    const a = e.attributes || {};
    return {
      climate,
      value: Number(value),
      min: climate ? a.min_temp ?? 5 : a.min ?? 5,
      max: climate ? a.max_temp ?? 40 : a.max ?? 40,
      step: this._config.target_step ?? (climate ? a.target_temp_step ?? 0.5 : a.step ?? 0.5),
      unit: climate
        ? this.hass?.config?.unit_system?.temperature ?? "°C"
        : a.unit_of_measurement ?? "°C",
    };
  }

  /* Ist-Temperatur: climate (attributes.current_temperature) oder sensor (state) */
  get _current() {
    const id = this._config.current_entity;
    const e = this._ent(id);
    if (!e) return null;
    const climate = id.startsWith("climate.");
    const value = climate ? e.attributes?.current_temperature : parseFloat(e.state);
    if (value === undefined || value === null || isNaN(value)) return null;
    return {
      value: Number(value),
      unit: climate
        ? this.hass?.config?.unit_system?.temperature ?? "°C"
        : e.attributes?.unit_of_measurement ?? "°C",
    };
  }

  get _fanActive() {
    const mode = this._config.fan_source ?? "auto";
    const fanEnt = this._ent(this._config.fan_entity);
    if (mode !== "power" && fanEnt) {
      const s = String(fanEnt.state).toLowerCase();
      if (ON_STATES.includes(s)) return true;
      const n = parseFloat(s);
      return !isNaN(n) && n > 0;
    }
    if (mode === "entity") return false;
    const w = this._powerWatt;
    if (w === null) return false;
    return w >= Number(this._v("fan_power_threshold"));
  }

  /* ---------- Aktionen ---------- */

  _callSwitch(turnOn) {
    const id = this._config.switch_entity;
    if (!id || !this.hass) return;
    this.hass.callService(id.split(".")[0], turnOn ? "turn_on" : "turn_off", {
      entity_id: id,
    });
  }

  _onPowerClick(ev) {
    ev?.stopPropagation();
    if (!this._config.switch_entity) return;
    if (this._switchOn) {
      /* Ausschalten nur mit Bestaetigung — Kompressor darf nicht hart vom Netz */
      this._confirmOpen = true;
    } else {
      this._callSwitch(true);
    }
  }

  _confirmOff(ev) {
    ev?.stopPropagation();
    this._confirmOpen = false;
    this._callSwitch(false);
  }

  _cancelOff(ev) {
    ev?.stopPropagation();
    this._confirmOpen = false;
  }

  _stepTarget(delta) {
    const t = this._target;
    if (!t || !this.hass) return;
    let next = Math.round((t.value + delta * t.step) / t.step) * t.step;
    next = Math.min(t.max, Math.max(t.min, next));
    next = Math.round(next * 100) / 100;
    if (next === t.value) return;
    if (t.climate) {
      this.hass.callService("climate", "set_temperature", {
        entity_id: this._config.target_entity,
        temperature: next,
      });
    } else {
      this.hass.callService("number", "set_value", {
        entity_id: this._config.target_entity,
        value: next,
      });
    }
  }

  _targetUp(ev) {
    ev?.stopPropagation();
    this._stepTarget(1);
  }

  _targetDown(ev) {
    ev?.stopPropagation();
    this._stepTarget(-1);
  }

  _moreInfo(ev) {
    const id = ev?.currentTarget?.dataset?.entity;
    if (!id) return;
    ev.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: id },
        bubbles: true,
        composed: true,
      })
    );
  }

  /* ---------- Render ---------- */

  render() {
    if (!this._config || !this.hass) return nothing;

    const showFan = this._config.show_fan !== false;
    const showPowerBtn = this._config.show_power_button !== false && !!this._config.switch_entity;
    const showPower = this._config.show_power !== false && !!this._config.power_entity;
    const showTarget = this._config.show_target !== false && !!this._config.target_entity;
    const showCurrent = this._config.show_current !== false && !!this._config.current_entity;
    const labelText = this._config.label_text || "";

    const fanActive = showFan && this._fanActive;
    const fanSpeed = Number(this._v("fan_speed")) || 0;
    const fanDur = fanSpeed <= 0 ? 0 : Math.max(0.2, 4 - (fanSpeed / 100) * 3.6);
    const fanColor = this._v("fan_color") === "white" ? "#ffffff" : "#111111";

    const watt = this._powerWatt;
    const target = this._target;
    const current = this._current;

    return html`
      <ha-card>
        <div class="card-wrap">
          <img class="bg" src="${this._imagePath}" alt="Waermepumpe" />

          <!-- Luefter -->
          ${showFan
            ? html`
                <div
                  class="fan-overlay ${fanActive ? "spinning" : this._v("fan_inactive") === "hidden" ? "hidden" : "idle"}"
                  style="top:${this._v("fan_top")}%; left:${this._v("fan_left")}%; width:${this._v(
                    "fan_size"
                  )}%; --fan-dur:${fanDur}s; --fan-color:${fanColor}; --fan-ratio:${this._v(
                    "fan_ratio"
                  )};"
                >
                  <svg viewBox="0 0 40 40" preserveAspectRatio="none">
                    <g .innerHTML="${FAN_SVG}"></g>
                  </svg>
                </div>
              `
            : nothing}

          <!-- Powerbutton -->
          ${showPowerBtn
            ? html`
                <div
                  class="power-badge ${this._switchOn ? "on" : "off"}"
                  style="top:${this._v("power_btn_top")}%; left:${this._v(
                    "power_btn_left"
                  )}%; transform:scale(${(this._v("power_btn_scale") ?? 100) / 100});"
                  title="${this._switchOn ? "Ausschalten (mit Rueckfrage)" : "Einschalten"}"
                  @click="${this._onPowerClick}"
                >
                  <ha-icon icon="mdi:power"></ha-icon>
                </div>
              `
            : nothing}

          <!-- Stromverbrauch -->
          ${showPower
            ? html`
                <div
                  class="value-box ${this._v("power_box") === false ? "no-bg" : ""}"
                  style="top:${this._v("power_top")}%; left:${this._v(
                    "power_left"
                  )}%; transform:translateX(-50%) scale(${(this._v("power_scale") ?? 100) /
                  100}); --val-color:${this._v("power_color") === "black" ? "#111" : "#fff"};"
                  data-entity="${this._config.power_entity}"
                  @click="${this._moreInfo}"
                >
                  <span class="val"
                    >${watt === null ? "—" : fmt(watt, Number(this._v("power_decimals")) || 0)}</span
                  >
                  ${this._v("power_label") === false ? nothing : html`<span class="unit">Watt</span>`}
                </div>
              `
            : nothing}

          <!-- Ist-Temperatur -->
          ${showCurrent
            ? html`
                <div
                  class="value-box ${this._v("current_box") === false ? "no-bg" : ""}"
                  style="bottom:${this._v("current_bottom")}%; left:${this._v(
                    "current_left"
                  )}%; transform:translateX(-50%) scale(${(this._v("current_scale") ?? 100) /
                  100}); --val-color:${this._v("current_color") === "black" ? "#111" : "#fff"};"
                  data-entity="${this._config.current_entity}"
                  @click="${this._moreInfo}"
                >
                  <span class="val"
                    >${current === null ? "—" : fmt(current.value, 1) + " " + current.unit}</span
                  >
                  ${this._v("current_label") === false ? nothing : html`<span class="unit">Ist</span>`}
                </div>
              `
            : nothing}

          <!-- Soll-Temperatur mit +/- -->
          ${showTarget
            ? html`
                <div
                  class="value-box target ${this._v("target_box") === false ? "no-bg" : ""}"
                  style="bottom:${this._v("target_bottom")}%; left:${this._v(
                    "target_left"
                  )}%; transform:translateX(-50%) scale(${(this._v("target_scale") ?? 100) /
                  100}); --val-color:${this._v("target_color") === "black" ? "#111" : "#fff"};"
                >
                  <div class="target-row">
                    <button
                      class="step"
                      ?disabled="${target === null}"
                      @click="${this._targetDown}"
                      title="Soll-Temperatur senken"
                    >
                      −
                    </button>
                    <div class="target-val">
                      <span class="val"
                        >${target === null ? "—" : fmt(target.value, 1) + " " + target.unit}</span
                      >
                      ${this._v("target_label") === false
                        ? nothing
                        : html`<span class="unit">Soll</span>`}
                    </div>
                    <button
                      class="step"
                      ?disabled="${target === null}"
                      @click="${this._targetUp}"
                      title="Soll-Temperatur anheben"
                    >
                      +
                    </button>
                  </div>
                </div>
              `
            : nothing}

          <!-- Freitext -->
          ${labelText
            ? html`
                <div
                  class="label-badge ${this._v("label_box") === false ? "no-bg" : ""}"
                  style="top:${this._v("label_top")}%; left:${this._v(
                    "label_left"
                  )}%; transform:translateX(-50%) scale(${(this._v("label_scale") ?? 100) /
                  100}); color:${this._v("label_color") === "black" ? "#111" : "#fff"};"
                >
                  ${labelText}
                </div>
              `
            : nothing}

          <!-- Bestaetigung vor dem Stromlos-Schalten -->
          ${this._confirmOpen
            ? html`
                <div class="confirm-overlay" @click="${this._cancelOff}">
                  <div class="confirm-panel" @click="${(e) => e.stopPropagation()}">
                    <h3><ha-icon icon="mdi:alert"></ha-icon> Wirklich stromlos schalten?</h3>
                    <p>
                      Eine laufende Waermepumpe sollte erst am Geraet bzw. ueber den Betriebsmodus
                      ausgeschaltet werden — nicht einfach den Stecker ziehen! Hartes Trennen im Betrieb
                      kann Kompressor und Elektronik schaden.
                    </p>
                    <div class="confirm-actions">
                      <button class="btn cancel" @click="${this._cancelOff}">Abbrechen</button>
                      <button class="btn danger" @click="${this._confirmOff}">
                        Trotzdem ausschalten
                      </button>
                    </div>
                  </div>
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card { overflow: hidden; padding: 0; background: transparent; }
    .card-wrap { position: relative; width: 100%; line-height: 0; }
    .bg { width: 100%; height: auto; display: block; }

    /* Luefter */
    /* Hoehe/Breite ueber fan_ratio, damit das Overlay auf perspektivisch
       elliptische Lueftergitter passt */
    .fan-overlay {
      position: absolute; aspect-ratio: 1 / var(--fan-ratio, 1); pointer-events: none;
      transform: translate(-50%, -50%);
      color: var(--fan-color, #111);
      opacity: 0.3; filter: grayscale(1);
      transition: opacity 0.3s, filter 0.3s;
    }
    .fan-overlay svg { width: 100%; height: 100%; overflow: visible; }
    /* Rotation im SVG-Koordinatensystem: preserveAspectRatio="none" staucht das
       drehende Rad danach zur Ellipse — ein rotierender Container wuerde taumeln */
    .fan-overlay svg g { transform-box: fill-box; transform-origin: center; }
    .fan-overlay.hidden { opacity: 0; }
    .fan-overlay.spinning { opacity: 0.9; filter: none; }
    .fan-overlay.spinning svg g { animation: fanSpin var(--fan-dur, 1s) linear infinite; }
    @keyframes fanSpin { to { transform: rotate(360deg); } }

    /* Powerbutton */
    .power-badge {
      position: absolute; cursor: pointer; padding: 5px;
      border-radius: 50%; --mdc-icon-size: 26px;
      transition: box-shadow 0.3s, color 0.3s, opacity 0.3s;
      line-height: 0; background: rgba(0,0,0,0.45);
      transform-origin: top left; z-index: 6;
    }
    .power-badge.on { color: #4caf50; box-shadow: 0 0 10px rgba(76,175,80,0.55); }
    .power-badge.off { color: #f44336; opacity: 0.75; }
    .power-badge:hover { filter: brightness(1.2); }

    /* Wertefelder */
    .value-box {
      position: absolute; display: flex; flex-direction: column; align-items: center;
      justify-content: center; background: rgba(0,0,0,0.75);
      border: 1px solid rgba(255,255,255,0.15); border-radius: 10px;
      padding: 6px 16px; min-width: 75px; line-height: 1.2; backdrop-filter: blur(4px);
      cursor: default;
    }
    .value-box.no-bg { background: none; border: none; backdrop-filter: none; padding: 2px 6px; }
    .val { font-size: 1.4em; font-weight: 700; color: var(--val-color, #fff); white-space: nowrap; }
    .unit {
      font-size: 0.8em; font-weight: 600; color: var(--val-color, #fff);
      opacity: 0.7; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px;
    }

    /* Soll-Temperatur */
    .value-box.target { padding: 5px 8px; }
    .target-row { display: flex; align-items: center; gap: 8px; }
    .target-val { display: flex; flex-direction: column; align-items: center; }
    .step {
      background: rgba(255,255,255,0.12); color: var(--val-color, #fff);
      border: 1px solid rgba(255,255,255,0.2); border-radius: 8px;
      width: 28px; height: 28px; font-size: 18px; font-weight: 700;
      line-height: 1; cursor: pointer; padding: 0;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, transform 0.1s;
    }
    .step:hover { background: rgba(255,255,255,0.24); }
    .step:active { transform: scale(0.92); }
    .step[disabled] { opacity: 0.35; cursor: not-allowed; }

    /* Freitext */
    .label-badge {
      position: absolute; padding: 2px 8px;
      background: rgba(0,0,0,0.6); border-radius: 4px;
      font-size: 0.8em; font-weight: 700; color: #fff;
      letter-spacing: 0.5px; line-height: 1.3;
      pointer-events: none; white-space: nowrap;
    }
    .label-badge.no-bg { background: none; }

    /* Bestaetigungs-Dialog */
    .confirm-overlay {
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      z-index: 20; line-height: normal;
      animation: fadeIn 0.15s ease-out;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .confirm-panel {
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #fff);
      border-radius: 16px; box-shadow: 0 16px 48px rgba(0,0,0,0.6);
      padding: 18px 20px; width: min(92%, 420px);
      max-height: 92%; overflow-y: auto;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .confirm-panel h3 {
      margin: 0 0 10px 0; font-size: 1.05em; font-weight: 700;
      display: flex; align-items: center; gap: 8px;
      color: var(--warning-color, #ff9800); --mdc-icon-size: 22px;
    }
    .confirm-panel p { margin: 0 0 16px 0; font-size: 0.9em; line-height: 1.45; }
    .confirm-actions { display: flex; gap: 10px; justify-content: flex-end; }
    .btn {
      padding: 8px 14px; border-radius: 8px; font-size: 0.9em; font-weight: 600;
      cursor: pointer; border: 1px solid var(--divider-color, #555);
      background: transparent; color: var(--primary-text-color, #fff);
      font-family: inherit;
    }
    .btn.cancel:hover { background: rgba(255,255,255,0.1); }
    .btn.danger { background: #d32f2f; border-color: #d32f2f; color: #fff; }
    .btn.danger:hover { background: #b71c1c; }
  `;
}

customElements.define("tomtut-pool-heatpump-card", TomtutPoolHeatpumpCard);

/* ============================ GUI-Editor ============================ */

class TomtutPoolHeatpumpCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = { ...config };
  }

  _ev(key) {
    return this._config?.[key] ?? DEFAULTS[key];
  }

  _changed(ev) {
    const el = ev.target;
    const key = el.dataset.key;
    let value;
    if (el.type === "range" || el.type === "number") {
      value = parseFloat(el.value);
      if (isNaN(value)) value = undefined;
    } else if (el.type === "checkbox") {
      value = el.checked;
    } else {
      value = el.value;
    }
    this._config = { ...this._config, [key]: value };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _entityOptions(...domains) {
    const states = this.hass?.states ?? {};
    return Object.keys(states)
      .filter((id) => domains.some((d) => id.startsWith(d + ".")))
      .sort();
  }

  _entityField(label, key, hint, ...domains) {
    const listId = `list-${key}`;
    return html`
      <label
        >${label}
        <input
          type="text"
          list="${listId}"
          .value="${this._config?.[key] || ""}"
          data-key="${key}"
          @change="${this._changed}"
          @input="${this._changed}"
          placeholder="${domains[0]}.beispiel"
        />
        <datalist id="${listId}">
          ${this._entityOptions(...domains).map((id) => html`<option value="${id}"></option>`)}
        </datalist>
        <small>${hint}</small>
      </label>
    `;
  }

  _slider(label, key, min, max, unit = "%", step = 1) {
    const v = this._ev(key) ?? 0;
    return html`
      <div class="slider-row">
        <span class="slider-label">${label}</span>
        <input
          type="range"
          min="${min}"
          max="${max}"
          step="${step}"
          .value="${String(v)}"
          data-key="${key}"
          @input="${this._changed}"
        />
        <span class="slider-val">${v}${unit}</span>
      </div>
    `;
  }

  _toggle(label, key, def) {
    const v = this._config?.[key] ?? def;
    return html`
      <div class="toggle-row">
        <span class="slider-label">${label}</span>
        <input type="checkbox" ?checked="${v}" data-key="${key}" @change="${this._changed}" />
      </div>
    `;
  }

  _colorSelect(label, key) {
    const v = this._ev(key) ?? "white";
    return html`
      <div class="slider-row">
        <span class="slider-label">${label}</span>
        <select data-key="${key}" @change="${this._changed}">
          <option value="white" ?selected="${v === "white"}">Weiß</option>
          <option value="black" ?selected="${v === "black"}">Schwarz</option>
        </select>
      </div>
    `;
  }

  _section(title, content) {
    return html`
      <details class="section">
        <summary>${title}</summary>
        <div class="section-body">${content}</div>
      </details>
    `;
  }

  render() {
    if (!this._config) return nothing;
    const fanSource = this._config.fan_source ?? "auto";

    return html`
      <div class="editor">
        ${this._entityField(
          "Powerbutton — Schalter (optional)",
          "switch_entity",
          "z.B. die Shelly-Steckdose der Waermepumpe. Ausschalten fragt immer nach.",
          "switch",
          "input_boolean",
          "light"
        )}
        ${this._entityField(
          "Stromverbrauch — Sensor (optional)",
          "power_entity",
          "Leistungssensor in W oder kW (z.B. Shelly).",
          "sensor"
        )}
        ${this._entityField(
          "Soll-Temperatur — climate oder number",
          "target_entity",
          "climate.* nutzt die Zieltemperatur, number.* den Wert direkt.",
          "climate",
          "number"
        )}
        ${this._entityField(
          "Ist-Temperatur — climate oder sensor",
          "current_entity",
          "climate.* nutzt current_temperature, sensor.* den Zustand.",
          "climate",
          "sensor"
        )}

        <label
          >Freitext auf der Card (optional)
          <input
            type="text"
            .value="${this._config.label_text || ""}"
            data-key="label_text"
            @input="${this._changed}"
            placeholder="z.B. Pool-Waermepumpe"
          />
        </label>

        <label
          >Bildvariante
          <select data-key="image_variant" @change="${this._changed}">
            <option value="weiss" ?selected="${this._config.image_variant === "weiss"}">Weiß</option>
            <option value="schwarz" ?selected="${this._config.image_variant === "schwarz"}">
              Schwarz
            </option>
            <option
              value="transparent"
              ?selected="${(this._config.image_variant ?? "transparent") === "transparent"}"
            >
              Transparent (Standard)
            </option>
          </select>
        </label>

        <label
          >Eigenes Bild (optional)
          <input
            type="text"
            .value="${this._config.image_url || ""}"
            data-key="image_url"
            @input="${this._changed}"
            placeholder="/local/meine_waermepumpe.png"
          />
          <small>Leer = mitgeliefertes Bild aus dem Card-Ordner.</small>
        </label>

        ${this._section(
          "Luefter-Animation",
          html`
            <div class="slider-row">
              <span class="slider-label">Aktiv wenn …</span>
              <select data-key="fan_source" @change="${this._changed}">
                <option value="auto" ?selected="${fanSource === "auto"}">
                  Automatisch (Entity, sonst Leistung)
                </option>
                <option value="entity" ?selected="${fanSource === "entity"}">Nur Entity</option>
                <option value="power" ?selected="${fanSource === "power"}">Nur Leistung</option>
              </select>
            </div>
            ${this._entityField(
              "Luefter-Entity (optional)",
              "fan_entity",
              "an/aus oder Zahlenwert > 0 = Luefter dreht.",
              "binary_sensor",
              "switch",
              "sensor",
              "fan",
              "climate"
            )}
            ${this._slider("Leistungs-Schwelle", "fan_power_threshold", 0, 2000, " W", 10)}
            ${this._slider("Drehgeschwindigkeit", "fan_speed", 0, 100)}
            <div class="slider-row">
              <span class="slider-label">Bei Stillstand</span>
              <select data-key="fan_inactive" @change="${this._changed}">
                <option value="gray" ?selected="${(this._ev("fan_inactive") ?? "gray") === "gray"}">
                  Grau + stehend
                </option>
                <option value="hidden" ?selected="${this._ev("fan_inactive") === "hidden"}">
                  Ausblenden
                </option>
              </select>
            </div>
            ${this._colorSelect("Farbe", "fan_color")}
          `
        )}
        ${this._section(
          "Elemente anzeigen",
          html`
            ${this._toggle("⏻ Powerbutton", "show_power_button", true)}
            ${this._toggle("⚡ Stromverbrauch", "show_power", true)}
            ${this._toggle("🌡 Ist-Temperatur", "show_current", true)}
            ${this._toggle("🎚 Soll-Temperatur", "show_target", true)}
            ${this._toggle("🌀 Luefter", "show_fan", true)}
          `
        )}

        <details class="section advanced">
          <summary>Erweiterte Einstellungen</summary>
          <div class="section-body advanced-body">
            ${this._section(
              "Luefter — Position",
              html`
                ${this._slider("Von oben", "fan_top", 0, 100, "%", 0.5)}
                ${this._slider("Von links", "fan_left", 0, 100, "%", 0.5)}
                ${this._slider("Breite", "fan_size", 5, 80, "%", 0.5)}
                ${this._slider("Höhe/Breite", "fan_ratio", 0.5, 2, "", 0.02)}
              `
            )}
            ${this._section(
              "Powerbutton — Position",
              html`
                ${this._slider("Von oben", "power_btn_top", 0, 100)}
                ${this._slider("Von links", "power_btn_left", 0, 100)}
                ${this._slider("Größe", "power_btn_scale", 50, 200)}
              `
            )}
            ${this._section(
              "Stromverbrauch — Darstellung",
              html`
                ${this._slider("Von oben", "power_top", 0, 100)}
                ${this._slider("Von links", "power_left", 0, 100)}
                ${this._slider("Größe", "power_scale", 50, 150)}
                ${this._slider("Nachkommastellen", "power_decimals", 0, 2, "", 1)}
                ${this._colorSelect("Schriftfarbe", "power_color")}
                ${this._toggle("Box anzeigen", "power_box", true)}
                ${this._toggle("Einheit anzeigen", "power_label", true)}
              `
            )}
            ${this._section(
              "Ist-Temperatur — Darstellung",
              html`
                ${this._slider("Von unten", "current_bottom", 0, 100)}
                ${this._slider("Von links", "current_left", 0, 100)}
                ${this._slider("Größe", "current_scale", 50, 150)}
                ${this._colorSelect("Schriftfarbe", "current_color")}
                ${this._toggle("Box anzeigen", "current_box", true)}
                ${this._toggle("Label anzeigen", "current_label", true)}
              `
            )}
            ${this._section(
              "Soll-Temperatur — Darstellung",
              html`
                ${this._slider("Von unten", "target_bottom", 0, 100)}
                ${this._slider("Von links", "target_left", 0, 100)}
                ${this._slider("Größe", "target_scale", 50, 150)}
                ${this._slider("Schrittweite", "target_step", 0.1, 5, "", 0.1)}
                ${this._colorSelect("Schriftfarbe", "target_color")}
                ${this._toggle("Box anzeigen", "target_box", true)}
                ${this._toggle("Label anzeigen", "target_label", true)}
              `
            )}
            ${this._section(
              "Freitext — Darstellung",
              html`
                ${this._slider("Von oben", "label_top", 0, 100)}
                ${this._slider("Von links", "label_left", 0, 100)}
                ${this._slider("Größe", "label_scale", 50, 200)}
                ${this._colorSelect("Schriftfarbe", "label_color")}
                ${this._toggle("Box anzeigen", "label_box", true)}
              `
            )}
          </div>
        </details>
      </div>
    `;
  }

  static styles = css`
    .editor { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
    label { display: flex; flex-direction: column; font-weight: 500; gap: 4px; }
    input[type="text"], select {
      padding: 8px; border: 1px solid var(--divider-color, #ccc);
      border-radius: 4px; font-size: 14px;
    }
    small { color: var(--secondary-text-color, #888); font-weight: 400; }

    .section { border: 1px solid var(--divider-color, #ccc); border-radius: 8px; overflow: hidden; }
    .section summary {
      padding: 10px 14px; font-size: 14px; font-weight: 600; cursor: pointer;
      color: var(--primary-text-color); background: var(--card-background-color, rgba(0,0,0,0.05));
      list-style: none; display: flex; align-items: center; gap: 8px; user-select: none;
    }
    .section summary::-webkit-details-marker { display: none; }
    .section summary::before { content: "▶"; font-size: 10px; transition: transform 0.2s; }
    .section[open] summary::before { transform: rotate(90deg); }
    .section-body { display: flex; flex-direction: column; gap: 10px; padding: 12px 14px; }
    .section.advanced { border-color: var(--warning-color, #ff9800); }
    .section.advanced > summary {
      font-size: 13px; color: var(--warning-color, #ff9800); background: rgba(255,152,0,0.08);
    }
    .advanced-body { gap: 8px; }

    .slider-row, .toggle-row { display: flex; align-items: center; gap: 8px; }
    .slider-label { flex: 1; font-size: 13px; color: var(--primary-text-color); }
    .slider-row input[type="range"] { flex: 2; }
    .slider-row select { flex: 2; padding: 6px; border: 1px solid var(--divider-color, #ccc); border-radius: 4px; font-size: 13px; }
    .slider-val { width: 52px; text-align: right; font-size: 13px; font-weight: 600; color: var(--primary-color); }
    .toggle-row input[type="checkbox"] { width: 18px; height: 18px; }
  `;
}

customElements.define("tomtut-pool-heatpump-card-editor", TomtutPoolHeatpumpCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "tomtut-pool-heatpump-card",
  name: "TomTuT Pool Heatpump",
  description:
    "Generische Card fuer Pool-Waermepumpen: Soll-/Ist-Temperatur, Stromverbrauch, Powerbutton mit Rueckfrage und animierter Luefter — beliebige Entities, keine Integration noetig",
  preview: true,
  documentationURL: "https://github.com/TomTuTHub/tomtut-pool-heatpump-card",
});

export { TomtutPoolHeatpumpCard, TomtutPoolHeatpumpCardEditor };
