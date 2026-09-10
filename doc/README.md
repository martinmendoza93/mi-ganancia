# Documentación esencial

Revisión: **2026-09-09**. Extractos técnicos de Obsidian más la evidencia del V1 local.

- [Base técnica y límites](base-tecnica.md): alcance, motor compartido y ADR de V1.
- [Validación del motor](validacion.md): VAL-01 a VAL-16 y comando `npm test`.
- [IA del proyecto](../ia/README.md): agentes, reglas, habilidades y plantillas locales.
- [Bitácora técnica](bitacora/README.md): autorización y evidencia por entrega.
- [Historial de cambios](cambios.md): resumen de lo realizado.
- [ADR](adr/README.md): decisiones, incluido dominio (003) y stack (004).
- [Producto en Notion](https://app.notion.com/p/3d558a5d0535818f9a25eb6b6979ca00?pvs=204): gestión, estado V1 local actualizado y antecedentes.
- [Análisis de avance en Notion](https://app.notion.com/p/3d758a5d05358123a9b7cfc9ceaec471?pvs=204) y [Google Drive](https://docs.google.com/document/d/16X_gH2TazZwbWSRcVSXm0Yyyp18l9FtKzq2z0GcgVhg/edit): revisión, mejoras y próxima fase recomendada.
- [Carpeta del producto en Drive](https://drive.google.com/drive/folders/1SmsqWfEnmQx6nJm1UEmXkn-J3nwqB5hH): contexto maestro.

## Origen y mantenimiento

La documentación técnica completa está en la bóveda `Mi-documentacion`, bajo `04-Proyectos/Mi-Ganancia/README.md`. Actualizar la nota canónica y luego el extracto. No hay sincronización automática con Notion/Drive.

## Situación actual

REQ-001/002/003 tienen implementación V1 local (dominio, tests y tres flujos). BIT-0001 sigue sin código en este repo. PWA, SEO y validación con usuarios permanecen fuera de esta entrega.

La revisión [BIT-LOCAL-0004](bitacora/BIT-LOCAL-0004.md) verificó 28 tests y build correctos; encontró mejoras pendientes y recomienda estabilización antes del piloto. No declara aceptación funcional completa ni publicación.
