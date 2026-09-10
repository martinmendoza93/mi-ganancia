# Instrucciones para trabajar en Mi-Ganancia

Antes de trabajar, leer [reglas de autorización](ia/rules/autorizacion.md), [rol del agente](ia/agents/AGENT.md) y [contexto técnico](doc/base-tecnica.md). Consultar [ia/README.md](ia/README.md) para seleccionar la habilidad correspondiente y leer su `SKILL.md` antes de aplicarla.

**Martín exige autorización para cada cambio nuevo.** Preparar una propuesta concreta, explicar alcance, archivos, impacto y validación, y solicitar autorización antes de aplicarla. Si una instrucción explícita ya autoriza exactamente el trabajo, ejecutarlo dentro de ese alcance sin pedir el mismo permiso otra vez. No interpretar «vamos a empezar», el silencio ni una aprobación funcional antigua como permiso para implementar cualquier cambio.

La documentación y validación necesarias para cerrar el cambio autorizado forman parte de esa entrega. Registrar lo realizado en [bitácora](doc/bitacora/README.md) y [cambios](doc/cambios.md), y las decisiones relevantes mediante [ADR](doc/adr/README.md). Al cerrar, informar y esperar autorización para el siguiente cambio.

Las habilidades de `ia/skills/` se leen desde sus rutas locales. No asumir que están instaladas globalmente o que otra herramienta las carga automáticamente. Los roles de `ia/agents/` no configuran ni lanzan subagentes.

