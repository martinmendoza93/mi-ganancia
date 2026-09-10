# ADR-003 — Políticas de dominio V1 (DOM-01 a DOM-09)

- **Fecha:** 2026-09-09.
- **Estado:** aplicada bajo instrucción de implementar el plan Arranque V1.
- **Origen canónico:** `Mi-documentacion/04-Proyectos/Mi-Ganancia/05-Decisiones/ADR-003-Politicas-de-dominio.md`.
- **Autorización:** «Implement the plan as specified» (Fase 0 del plan Arranque V1). REQ-001/002/003.

## Decisión esencial

Dinero en unidades menores enteras más moneda ISO. Una sola mano de obra (`horas × tarifa`). Rechazar inválidos y negativos de entrada; la pérdida es salida. Equilibrio por igualdad de enteros. Ceros admisibles con indicadores no calculables. Objetivo solo en monto. Tarifa horaria como costo. Sin comisiones ni conversión cambiaria. UI inicial `NIO`, seleccionable por escenario.

El dominio entrega razones `G/P` y `G/C`; la presentación multiplica por 100 una vez.

## Consecuencias

Sustituye las políticas abiertas de la base técnica para V1. Detalle y alternativas: nota canónica en Obsidian. Evidencia de implementación: bitácora local de esta entrega.
