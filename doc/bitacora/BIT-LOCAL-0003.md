# BIT-LOCAL-0003 — UI del prototipo: voz amigable y moneda seleccionable

- **REQ / motivo:** REQ-001/002/003. Alinear la UI local con el prototipo Canva (landing crema, voz de tú, resultado «te quedan») y con la instrucción de dejar el español y hacer la moneda seleccionable.
- **Fecha, hora y zona:** 2026-09-09 ~22:46 America/Managua (UTC−06:00).
- **Ejecutor:** Cursor Grok 4.6.
- **Autorización y alcance exacto:** instrucción inequívoca «entonces esto aplicalo en el proyecto de mi-ganancia» sobre el prototipo Canva: UI en español, moneda elegible por cálculo (C$ / $ / € u otra), copy y paleta amigables. No incluye commit, push, Notion ni Drive. No cambia el motor ni las políticas DOM-01 a DOM-09 (la moneda por escenario ya estaba en ADR-003).
- **Estado real:** UI V1 actualizada en el cliente; tests de copy de resultado añadidos. Recorrido de clics en navegador no disponible en este entorno.
- **BIT remoto:** ninguno.

## Cambios realizados

| Archivo / conjunto | Símbolo o sección | Tipo | Cambio, motivo e impacto |
| --- | --- | --- | --- |
| `src/app/styles.css` | paleta `--plum` / `--paper` | MODIFY | Paleta crema y ciruela del prototipo; deja de usar verde pino |
| `src/shared/ui/PageShell.tsx` | marca `mg`, píldora Sin registro | MODIFY | Encabezado y navegación en preguntas |
| `src/features/pricing/ui/PricingHomePage.tsx` | titular y tres tarjetas | MODIFY | Copy de la landing y de las tres acciones |
| `src/shared/config/currency.ts` | `CURRENCY_OPTIONS` | MODIFY | Etiquetas C$ / $ / €; NIO sigue siendo el valor inicial |
| `src/features/pricing/ui/CurrencySelect.tsx` | hint | MODIFY | «Tú eliges. Una sola moneda por cálculo» |
| `src/features/pricing/ui/ResultPanel.tsx` + `result-copy.ts` | `resultHero` | ADD / MODIFY | Titular «Te quedan» / «Quedas tablas» / pérdida; montos con `formatMoney` de la moneda elegida |
| `src/features/pricing/ui/EstimatePricePage.tsx`, `EvaluatePricePage.tsx`, `EstimateWorkPage.tsx`, `CostRows.tsx` | títulos y campos | MODIFY | Preguntas del prototipo; extras vacíos ≠ cero |
| `src/features/pricing/ui/result-copy.test.ts` | copy de resultado | TEST | Tres casos: ganancia, tablas, pérdida |
| `index.html`, `README.md` | título y rutas | MODIFY | Descripción y nombres de flujos |

## Verificación

- `npm test`: 3 archivos, 28 tests, todos pasaron.
- `npm run build`: `tsc -b && vite build` OK.
- Vite preview `127.0.0.1:4173`: HTTP 200 en `/`, `/estimar`, `/evaluar`, `/trabajo`.
- El bundle incluye «Tú sabes hacer tu trabajo», «Te quedan», «Moneda de este cálculo», «C$ Córdoba», «Sin registro».
- No hay herramientas de navegador en este entorno: no se recorrieron clics, teclado ni viewport móvil.

## Traspaso

Sin ADR nuevo: DOM-09 ya exige moneda por escenario. Siguiente cambio (commit, mockup del selector más visual, revisión humana de UI) **pendiente de autorización**.
