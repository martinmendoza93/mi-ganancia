# BIT-LOCAL-0001 — Configuración IA y trazabilidad

- **REQ / motivo:** gobernanza documental de Producto #001, contexto de REQ-001/002/003. No se crea un REQ funcional.
- **Fecha/hora de inicio del registro:** 2026-09-09 21:38:35, America/Managua (UTC−06:00).
- **Ejecutor:** Codex.
- **Autorización:** petición de Martín en esta conversación de crear `ia` con agents, rules y skills, usar bitácora, cambios y ADR, aplicar reutilizables y pedir autorización para cada cambio nuevo.
- **Alcance:** configuración documental, habilidades locales, enlaces, ADR y verificación de estos artefactos.
- **Estado:** configuración documental realizada y verificada; sin implementación de aplicación.
- **BIT remoto:** ninguno asignado; no confundir con BIT-0001 del motor reportado por Gemini.

## Cambios realizados

Rutas relativas al repositorio, salvo donde se indica Obsidian. Secciones Markdown como referencia; no se modificaron funciones de aplicación.

| Archivo / conjunto | Sección o responsabilidad | Tipo | Cambio y motivo |
| --- | --- | --- | --- |
| `AGENTS.md` | Entrada del agente | ADD / DOC | Referencias a reglas y habilidades; alcance explícito de autorización |
| `ia/README.md` | Catálogo y estructura | ADD / DOC | Ruta de lectura y selección de habilidades locales |
| `ia/agents/AGENT.md` | Rol | ADD / DOC | Analista, arquitecto y diseñador; límites del producto |
| `ia/rules/autorizacion.md` | Propuesta, aprobación y cierre | ADD / DOC | Aplicar la preferencia del usuario sin pedir otra vez permisos ya concedidos |
| `ia/rules/documentacion.md` | Trazabilidad | ADD / DOC | Responsabilidades, numeración y vínculo entre registros |
| `ia/skills/mi-ganancia-planificar-cambio/SKILL.md` | Planificación | ADD / DOC | Preparar propuestas concretas antes del cambio nuevo |
| `ia/skills/mi-ganancia-revisar-dominio/SKILL.md` | Revisión técnica | ADD / DOC | Reglas monetarias, mano de obra y evidencia real del motor |
| `ia/skills/mi-ganancia-registrar-entrega/SKILL.md` | Cierre | ADD / DOC | Evidencia, bitácora, cambios y ADR |
| `ia/plantillas/cambio.md`, `adr.md`, `entrega.md` | Plantillas | ADD / DOC | Adaptación de los tres reutilizables de Obsidian con procedencia |
| `doc/bitacora/README.md`, `BIT-LOCAL-0001.md` | Registro local | ADD / DOC | Índice y esta entrada con numeración separada de fuentes remotas |
| `doc/cambios.md` | Resumen | ADD / DOC | Historial breve enlazado a la evidencia |
| `doc/adr/README.md`, `ADR-002-Configuracion-IA.md` | Decisiones | ADD / DOC | Índice y extracto de decisión de gobernanza |
| `README.md`, `doc/README.md` | Navegación | MODIFY / DOC | Exponer IA, ADR, bitácora y cambios |
| Obsidian: `05-Decisiones/ADR-002-Configuracion-IA.md` | Decisión canónica | ADD / DOC | Organización solicitada y sus consecuencias |
| Obsidian: `README.md`, `00-Contexto/Logica-documental.md`, `07-Reutilizables/README.md` | Navegación y reutilización | MODIFY / DOC | Reflejar la configuración operativa y las adaptaciones del repo |

## Verificación

- Se ejecutó `python3 /home/martin/.codex/skills/.system/skill-creator/scripts/quick_validate.py` para cada carpeta de habilidad: `mi-ganancia-planificar-cambio`, `mi-ganancia-revisar-dominio` y `mi-ganancia-registrar-entrega`. Los tres resultados fueron `Skill is valid!`.
- Comprobación local con Python sobre repo y carpeta del proyecto en Obsidian: 36 archivos Markdown y 93 enlaces relativos, todos resueltos; bloques de código cerrados, saltos finales presentes y sin espacios finales.
- Revisión de coherencia: las instrucciones distinguen propuesta, autorización vigente y ampliación; mantienen BIT-LOCAL separado del reporte remoto y el mismo ADR-002 en Obsidian y repo. Los enlaces de las habilidades llegan a sus reglas, plantillas y contexto.
- `git status --short`: `AGENTS.md`, `README.md`, `doc/` e `ia/` sin seguimiento; no se crearon commits. Los documentos de la entrega anterior también estaban sin seguimiento.
- Límites: el validador comprueba formato, no prueba el comportamiento de un agente futuro. No se verificó carga automática de habilidades ni se afirma instalación global. No hubo aplicación o suite de pruebas del motor que ejecutar.

## Traspaso

- ADR: [ADR-002](../adr/ADR-002-Configuracion-IA.md).
- Historial: [cambios](../cambios.md).
- Notion / Drive: no modificados; esta entrada no acredita sincronización remota.
- Commit / PR / release: no creados.
- Código y pruebas del motor: no implementados ni ejecutados en esta entrega.
- Siguiente cambio: pendiente de propuesta y autorización de Martín; la configuración no autoriza construir la aplicación.
