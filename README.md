# TomTuT Pool Heatpump Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/TomTuTHub/tomtut-pool-heatpump-card)](https://github.com/TomTuTHub/tomtut-pool-heatpump-card/releases/latest)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2026.3.0%2B-blue)](https://www.home-assistant.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

![Preview](https://raw.githubusercontent.com/TomTuTHub/tomtut-pool-heatpump-card/main/waermepumpe_weiss.png)

> Vorlaeufiges Bild: das mitgelieferte Artwork (Variante `weiss`). Ein echter Dashboard-Screenshot
> folgt.

Custom Lovelace Dashboard Card fuer **beliebige Pool-Waermepumpen**. Die Card ist **generisch**: sie
bringt keine eigene Integration mit, sondern haengt an den Entities, die du ihr zuweist — egal ob die
Waermepumpe ueber LocalTuya, Tuya Cloud, Modbus, MQTT oder eine Herstellerintegration in Home Assistant
haengt. Zeigt Soll- und Ist-Temperatur, Stromverbrauch, einen Powerbutton mit Sicherheitsabfrage und
einen animierten Luefter auf einem Waermepumpen-Bild.

> **Disclaimer:** Dieses Projekt ist nicht affiliiert mit einem Waermepumpen-Hersteller, mit Poolsana
> oder mit Tuya. Nutzung auf eigene Verantwortung.

---

## Features

- **Soll-Temperatur einstellen** — mit **+/−**-Bedienung direkt auf der Card, wahlweise ueber eine
  `climate`-Entity (Zieltemperatur) oder eine `number`-Entity. Min/Max/Schrittweite kommen aus der Entity.
- **Ist-Temperatur anzeigen** — aus einer `climate`-Entity (`current_temperature`) oder einem `sensor`.
- **Stromverbrauch-Badge** — beliebiger Leistungssensor in W oder kW (z.B. Shelly), Position frei waehlbar.
- **Powerbutton-Badge mit Sicherheitsabfrage** — schaltet eine `switch`-Entity (z.B. Shelly-Steckdose).
  **Ausschalten fragt immer nach**, weil eine laufende Waermepumpe nicht einfach vom Netz getrennt
  werden sollte. Einschalten geht mit einem Klick.
- **Animierter Luefter** — dreht ueber der Luefterflaeche des Bildes. Aktiv-Bedingung frei waehlbar:
  eine Entity (an/aus) **oder** ein Leistungs-Schwellwert auf dem Stromsensor. Im Stillstand grau oder
  ausgeblendet.
- **Drei Bildvarianten** — `weiss`, `schwarz`, `transparent` (Standard), plus optionaler eigener Bildpfad.
- **Visueller Editor** — kompletter GUI-Editor mit Entity-Vorschlagslisten, keine YAML-Kenntnisse noetig.
- **Vollstaendig anpassbar** — Positionen, Groessen, Farben und Sichtbarkeit aller Elemente einstellbar.

---

## Voraussetzungen

- Home Assistant **2026.3.0** oder neuer
- [HACS](https://hacs.xyz/) installiert

> **Keine Integration noetig.** Diese Card bringt keine eigene Integration mit und braucht auch keine
> bestimmte. Du brauchst lediglich Entities, die deine Waermepumpe (und optional eine Steckdose)
> in Home Assistant abbilden — woher die kommen, ist der Card egal.

---

## Installation

### Via HACS (empfohlen)

1. HACS in Home Assistant oeffnen
2. **Frontend** → Drei-Punkte-Menue → **Benutzerdefinierte Repositories**
3. Repository hinzufuegen: `https://github.com/TomTuTHub/tomtut-pool-heatpump-card` — Kategorie: **Dashboard**
4. Nach **TomTuT Pool Heatpump Card** suchen und **Herunterladen**
5. Browser neu laden

HACS kopiert das komplette Repository nach `config/www/community/tomtut-pool-heatpump-card/` — die
Hintergrundbilder liegen damit automatisch am richtigen Platz und muessen nicht separat kopiert werden.

### Manuelle Installation

1. `tomtut-pool-heatpump-card.js` und die drei PNG-Dateien (`waermepumpe_weiss.png`,
   `waermepumpe_schwarz.png`, `waermepumpe_transparent.png`) herunterladen
2. Alles nach `config/www/community/tomtut-pool-heatpump-card/` kopieren
3. In HA: **Einstellungen → Dashboards → Ressourcen** → Ressource hinzufuegen:
   - URL: `/local/community/tomtut-pool-heatpump-card/tomtut-pool-heatpump-card.js`
   - Ressourcentyp: **JavaScript-Modul**
4. Browser neu laden

---

## Konfiguration

Die Card im Dashboard-Editor hinzufuegen: **Karte hinzufuegen** → **TomTuT Pool Heatpump** auswaehlen.
Der visuelle Editor oeffnet sich automatisch.

### Entities

| Option | Pflicht | Beschreibung |
|---|---|---|
| `switch_entity` | Nein* | Schalter fuer den Powerbutton, z.B. `switch.shelly_waermepumpe`. Ausschalten fragt nach. |
| `power_entity` | Nein* | Leistungssensor (W oder kW), z.B. `sensor.shelly_waermepumpe_power` |
| `target_entity` | Nein* | Soll-Temperatur: `climate.*` (Zieltemperatur) **oder** `number.*` |
| `current_entity` | Nein* | Ist-Temperatur: `climate.*` (`current_temperature`) **oder** `sensor.*` |
| `fan_entity` | Nein | Entity, die den Luefter-Zustand liefert (an/aus oder Zahl > 0) |

\* Mindestens **eine** dieser vier Entities muss gesetzt sein.

### Darstellung

| Option | Standard | Beschreibung |
|---|---|---|
| `image_variant` | `transparent` | Bildvariante: `weiss`, `schwarz`, `transparent` |
| `image_url` | – | Eigener Bildpfad, ueberschreibt `image_variant` (z.B. `/local/meine_wp.png`) |
| `label_text` | – | Freitext-Badge auf der Card |
| `show_power_button` | `true` | Powerbutton anzeigen |
| `show_power` | `true` | Stromverbrauch anzeigen |
| `show_current` | `true` | Ist-Temperatur anzeigen |
| `show_target` | `true` | Soll-Temperatur anzeigen |
| `show_fan` | `true` | Luefter-Animation anzeigen |

### Luefter

| Option | Standard | Beschreibung |
|---|---|---|
| `fan_source` | `auto` | `auto` (Entity, sonst Leistung), `entity` oder `power` |
| `fan_power_threshold` | `100` | Ab wie viel Watt der Luefter als laufend gilt |
| `fan_speed` | `60` | Drehgeschwindigkeit `0`–`100` (0 = steht) |
| `fan_inactive` | `gray` | Im Stillstand: `gray` oder `hidden` |
| `fan_color` | `black` | `black` oder `white` |
| `fan_top` / `fan_left` | `51` / `40` | Mittelpunkt in % (Bild) |
| `fan_size` | `24` | Breite in % der Bildbreite |
| `fan_ratio` | `1.12` | Hoehe/Breite des Luefterrads — `1` = rund, groesser = hochovale Ellipse |

Die Standardwerte sitzen auf dem Lueftergitter des mitgelieferten Artworks. Da das Geraet dort
perspektivisch dargestellt ist, ist das Gitter kein Kreis, sondern eine Ellipse — dafuer ist
`fan_ratio` da. Bei einem eigenen, frontal aufgenommenen Bild passt meist `fan_ratio: 1`.

### Positionen, Groessen, Farben

Alle Werte in Prozent des Hintergrundbildes; im Editor unter **Erweiterte Einstellungen** bequem
per Schieberegler einstellbar.

| Option | Standard | Beschreibung |
|---|---|---|
| `power_btn_top` / `power_btn_left` / `power_btn_scale` | `8` / `4` / `100` | Powerbutton (oben links) |
| `power_top` / `power_left` / `power_scale` | `10` / `84` / `95` | Stromverbrauch (oben rechts) |
| `power_decimals` | `0` | Nachkommastellen der Watt-Anzeige |
| `power_box` / `power_label` / `power_color` | `true` / `true` / `white` | Box, Einheit, Schriftfarbe |
| `current_bottom` / `current_left` / `current_scale` | `8` / `15` / `100` | Ist-Temperatur (unten links) |
| `current_box` / `current_label` / `current_color` | `true` / `true` / `white` | Box, Label, Schriftfarbe |
| `target_bottom` / `target_left` / `target_scale` | `8` / `80` / `100` | Soll-Temperatur (unten rechts) |
| `target_step` | aus Entity | Schrittweite der +/−-Tasten |
| `target_box` / `target_label` / `target_color` | `true` / `true` / `white` | Box, Label, Schriftfarbe |
| `label_top` / `label_left` / `label_scale` | `3` / `50` / `100` | Freitext-Badge (oben mittig) |
| `label_box` / `label_color` | `true` / `white` | Box, Schriftfarbe |

---

## YAML-Beispiele

### Waermepumpe ueber LocalTuya (climate-Entity)

```yaml
type: custom:tomtut-pool-heatpump-card
label_text: Pool-Waermepumpe
image_variant: transparent
target_entity: climate.pool_waermepumpe
current_entity: climate.pool_waermepumpe
power_entity: sensor.shelly_waermepumpe_power
switch_entity: switch.shelly_waermepumpe
fan_power_threshold: 150
```

`climate.pool_waermepumpe` liefert hier beides: die Zieltemperatur (Soll) und `current_temperature` (Ist).

### Getrennte Entities (number + sensor)

```yaml
type: custom:tomtut-pool-heatpump-card
target_entity: number.waermepumpe_solltemperatur
current_entity: sensor.waermepumpe_wassertemperatur
power_entity: sensor.shelly_waermepumpe_power
switch_entity: switch.shelly_waermepumpe
fan_entity: binary_sensor.waermepumpe_kompressor
fan_source: entity
image_url: /local/meine_waermepumpe.png
fan_top: 50
fan_left: 50
fan_size: 30
fan_ratio: 1
```

Das zweite Beispiel nutzt ein eigenes Bild — deshalb werden die Luefter-Position und `fan_ratio: 1`
(rundes Gitter) mitgegeben. Mit dem mitgelieferten Artwork brauchst du diese Zeilen nicht.

---

## Hinweis zum Powerbutton

Der Powerbutton schaltet eine ganz normale Steckdose. **Ausschalten** oeffnet deshalb immer eine
Rueckfrage:

> ⚠️ Eine laufende Waermepumpe sollte erst am Geraet bzw. ueber den Betriebsmodus ausgeschaltet werden —
> nicht einfach den Stecker ziehen! Hartes Trennen im Betrieb kann Kompressor und Elektronik schaden.

**Einschalten** geht ohne Rueckfrage mit einem Klick.

---

## Support & Issues

Bugs und Feature-Requests bitte hier melden:
[https://github.com/TomTuTHub/tomtut-pool-heatpump-card/issues](https://github.com/TomTuTHub/tomtut-pool-heatpump-card/issues)

---

## Lizenz

MIT License — siehe [LICENSE](LICENSE) fuer Details.

---

## Ueber den Autor

Ich bin ausgebildeter Fachinformatiker fuer Systemintegration mit langjaehriger IT-Erfahrung. Frueher
war es der MCSE — heute ist es Vibe Coding. Diese Card wurde mit Hilfe von Claude gebaut. Ohne
KI-Unterstuetzung haette ich das nebenbei nie in dieser Form hinbekommen. Der Code wurde von mir
getestet und laeuft in meinem eigenen Produktiv-Setup.

Mehr auf [thomasbase.de](https://thomasbase.de) und [YouTube @TomTuT](https://www.youtube.com/@TomTuT).

---

Das war TomTuT, bleib hart am Gas.
