# BIT-LOCAL-0002 — Arranque V1: políticas, motor y tres flujos

- **REQ / motivo:** REQ-001, REQ-002, REQ-003. Implementación V1 del plan *Arranque V1 de Mi-Ganancia*.
- **Fecha, hora y zona:** 2026-09-09 ~22:10 America/Managua (UTC−06:00).
- **Ejecutor:** Cursor Grok 4.6.
- **Autorización y alcance exacto:** instrucción «Implement the plan as specified» sobre el plan Arranque V1 (políticas DOM-01 a DOM-09 según la tabla de Fase 0, ADR de stack Vite/React/TS sin PWA, motor + tests VAL, tres UI, cierre documental). No incluye commit, push ni escrituras en Notion/Drive.
- **Estado real:** aplicación V1 local con tests de dominio; preview HTTP comprobado; UI no ejercida con clics automatizados.
- **BIT remoto:** ninguno. No reutiliza ni valida BIT-0001.

## Cambios realizados

| Archivo / conjunto | Símbolo o sección | Tipo | Cambio, motivo e impacto |
| --- | --- | --- | --- |
| Obsidian `05-Decisiones/ADR-003-Politicas-de-dominio.md` y `doc/adr/ADR-003-Politicas-de-dominio.md` | DOM-01…09 | ADD / DOC | Contrato monetario y laboral V1 |
| Obsidian `05-Decisiones/ADR-004-Stack-frontend.md` y `doc/adr/ADR-004-Stack-frontend.md` | Stack | ADD / DOC | Vite + React + TypeScript, cálculo local |
| `src/features/pricing/domain/*` | `calculatePricing`, `Money` | ADD | Motor puro en unidades menores |
| `src/features/pricing/application/*` | use cases | ADD | Estimar precio, evaluar precio, estimar trabajo |
| `src/features/pricing/ui/*` | tres páginas | ADD | Flujos REQ-001/002/003 |
| `src/app/*`, `index.html`, `package.json` | SPA | ADD / CONFIG | Composición y Vite |
| `src/features/pricing/domain/engine.test.ts` | VAL-01…16 | TEST | 21 casos de dominio |
| `src/features/pricing/ui/form-mapping.test.ts` | mapeo de formularios | TEST | 4 casos de captura → use case |
| `doc/base-tecnica.md`, `validacion.md`, README | extractos | MODIFY / DOC | Contratos y comandos reales |
| Obsidian dominio, arquitectura, validación | notas canónicas | MODIFY / DOC | Políticas cerradas y stack V1 |

## Verificación

- `npm test`: 2 archivos, 25 tests, todos pasaron.
- `npm run build`: `tsc -b && vite build` OK.
- Vite preview `127.0.0.1:4173`: HTTP 200 en `/`, `/estimar`, `/evaluar`, `/trabajo` (SPA; el HTML es el cascarón, no prueba de interacción).
- No hay herramientas de navegador en este entorno: no se recorrieron teclado/móvil ni se validó CA-06 visualmente.
- Sin commit. Notion y Drive no se modificaron.

## Traspaso

ADR-003 y ADR-004 aplicados bajo la autorización de esta entrega. Siguiente cambio (commit, PWA, objetivo porcentual, localizar BIT-0001, pruebas de UI humanas) **pendiente de autorización**.
