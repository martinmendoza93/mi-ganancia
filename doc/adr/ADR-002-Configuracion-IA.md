# ADR-002 — IA local y autorización por cambio

- **Fecha:** 2026-09-09.
- **Estado:** aplicada bajo solicitud explícita del usuario; decisión de gobernanza documental.
- **Origen canónico:** `Mi-documentacion/04-Proyectos/Mi-Ganancia/05-Decisiones/ADR-002-Configuracion-IA.md`.
- **Autorización:** solicitud actual de Martín de crear IA del proyecto, aplicar reutilizables, bitácora, cambios y ADR, y pedir autorización para cada cambio nuevo.

## Decisión esencial

Mantener rol, reglas, habilidades y plantillas dentro de `ia/`, con `AGENTS.md` en la raíz como entrada. Una propuesta de cambio nuevo requiere autorización antes de ejecutarse; una instrucción inequívoca ya dada cubre su alcance y los registros necesarios para cerrarlo. Terminada la entrega, esperar la siguiente autorización.

Usar `BIT-LOCAL-NNNN` para la evidencia técnica local; `doc/cambios.md` como resumen y `doc/adr/` para índices/extractos de decisiones canónicas de Obsidian. Las habilidades se abren desde su ruta local; no se configura instalación global ni ejecución de subagentes.

## Consecuencias

La configuración viaja con el repositorio y mantiene fuentes/estados explícitos. Requiere revisar manualmente los extractos al cambiar las notas canónicas. No aprueba stack, motor, reglas monetarias, commit, publicación ni escrituras en Notion/Drive.

Detalle de entrega y validación: [BIT-LOCAL-0001](../bitacora/BIT-LOCAL-0001.md).

