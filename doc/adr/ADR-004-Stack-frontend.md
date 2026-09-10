# ADR-004 — Stack V1: Vite, React y TypeScript

- **Fecha:** 2026-09-09.
- **Estado:** aplicada bajo instrucción de implementar el plan Arranque V1.
- **Origen canónico:** `Mi-documentacion/04-Proyectos/Mi-Ganancia/05-Decisiones/ADR-004-Stack-frontend.md`.
- **Autorización:** «Implement the plan as specified» (Fase 0 del plan Arranque V1). REQ-001/002/003.

## Decisión esencial

Aplicación web con Vite, React y TypeScript. Cálculo en el cliente. Sin backend, PWA ni SEO como alcance de V1. Un feature `pricing` (dominio, aplicación, UI) y pruebas de dominio con Vitest.

## Consecuencias

Queda cerrado el stack candidato documentado en Notion para este V1. Añadir PWA, API o otro framework requiere otro ADR. Evidencia: código en `src/` y comandos en el README del producto.
