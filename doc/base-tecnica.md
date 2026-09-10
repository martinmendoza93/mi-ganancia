# Base técnica de trabajo

**Origen:** Obsidian `04-Proyectos/Mi-Ganancia` (requisitos, dominio, arquitectura). **Revisión:** 2026-09-09. **Estado:** contrato V1 según ADR-003 y ADR-004.

## Alcance

| REQ | Función |
| --- | --- |
| REQ-001 | Núcleo: estimar cuánto cobrar a partir de costos y ganancia objetivo en monto |
| REQ-002 | Complementaria: evaluar un precio existente y explicar ganancia/pérdida |
| REQ-003 | Servicios: materiales, tiempo, valor/hora y transporte con cálculo compartido |

La función esencial debe seguir siendo útil gratuitamente. V1 excluye rentabilidad mensual completa, login, base remota, inventario, POS, facturación, contabilidad formal, app móvil nativa, IA generativa, API pública, microservicios, suscripciones, dashboard empresarial y PWA.

## Reglas V1

Misma moneda y base: `C = suma de costos`, `G = P - C`; margen razón `G/P` si `P > 0`; markup razón `G/C` si `C > 0`. La UI muestra porcentaje como `100 × razón` una sola vez. En estimación, `P = C + objetivo` (monto).

Con C = 80 y P = 100: ganancia 20, margen 20 %, markup 25 %. El precio sugerido no es una garantía de mercado.

Políticas cerradas: [ADR-003](adr/ADR-003-Politicas-de-dominio.md) (DOM-01 a DOM-09). Motor en `src/features/pricing/`.

## Reutilización y arquitectura

Un núcleo de cálculo compartido; tres flujos de captura. Las reglas se verifican con `npm test` sin UI. Stack: Vite + React + TypeScript, cálculo en el cliente ([ADR-004](adr/ADR-004-Stack-frontend.md)).

Las rutas reportadas por Gemini (`src/core/domain/types.ts`, `src/core/engine/calculator.ts`) no existen aquí y no se reutilizan.
