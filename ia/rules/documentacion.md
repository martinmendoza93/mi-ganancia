# Documentación, ADR y trazabilidad

## Responsabilidades

| Fuente | Responsabilidad |
| --- | --- |
| Notion | REQ, decisiones de negocio, autorizaciones y gestión del producto |
| Drive | Contexto portátil y gobernanza existente |
| Obsidian | Diseño técnico extenso, diagramas, análisis y ADR completos |
| `ia/` | Instrucciones y procedimientos locales para el agente |
| `doc/` | Contratos esenciales, bitácora técnica, resumen de cambios y extractos de ADR próximos al repo |
| Git | Diff y evidencia de versión cuando existan commits |

Las escrituras en Notion/Drive necesitan estar incluidas en la autorización. Un registro local no prueba sincronización remota.

## Cada cambio autorizado

1. Vincularlo al REQ existente o describir el motivo documental; no inventar un REQ aprobado para ajustes de gobernanza.
2. Registrar qué autorización lo cubre.
3. Actualizar la documentación afectada y verificar lo apropiado al cambio.
4. Añadir una entrada `doc/bitacora/BIT-LOCAL-NNNN.md` con [la plantilla de entrega](../plantillas/entrega.md). Los IDs locales no compiten con BIT-0000/0001 de Notion/Drive.
5. Añadir en [cambios](../../doc/cambios.md) un resumen breve con enlace a esa entrada; no repetir allí la tabla completa de archivos.
6. Si hay decisión relevante sobre arquitectura, contratos o gobernanza, usar [la plantilla ADR](../plantillas/adr.md). Un ajuste de redacción no necesita un ADR nuevo.

## ADR y reutilización

Consultar el [índice de ADR](../../doc/adr/README.md) antes de asignar número. Mantener un mismo ID para el ADR completo de Obsidian y su extracto del repo. El extracto declara la ubicación de la nota canónica, estado, autorización y consecuencias esenciales. No cambiar una decisión aprobada silenciosamente.

Las plantillas locales derivan de `04-Proyectos/Mi-Ganancia/07-Reutilizables` en Obsidian. Al reutilizarlas en otro proyecto, reemplazar REQ, fechas, personas y fuentes; no heredar aprobaciones ni resultados. Al actualizar un extracto técnico, revisar la nota canónica correspondiente.

## Evidencia mínima honesta

Registrar rutas y símbolos/secciones; líneas antes/después si ayudan, commit/PR solo si existen. Distinguir pruebas previstas, verificaciones ejecutadas y reportes de otros agentes. Mantener los hallazgos y limitaciones visibles. No declarar validado BIT-0001 porque se hayan comprobado enlaces Markdown.

