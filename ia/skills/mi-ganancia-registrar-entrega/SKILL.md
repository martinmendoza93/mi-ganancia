---
name: mi-ganancia-registrar-entrega
description: Cerrar cambios autorizados de Mi-Ganancia con bitácora técnica, historial de cambios, evidencia de validación y ADR cuando exista una decisión relevante.
---

# Registrar una entrega de Mi-Ganancia

Leer [reglas documentales](../../rules/documentacion.md), la propuesta/autorización y el estado real de los archivos. Usar [plantilla de entrega](../../plantillas/entrega.md).

Consultar [bitácora](../../../doc/bitacora/README.md), asignar el siguiente `BIT-LOCAL-NNNN` libre y registrar solo cambios realmente realizados: REQ o motivo, autorización, fecha/hora/zona, rutas y secciones/símbolos, motivo, impacto, verificaciones y limitaciones. No inventar commit, PR ni prueba superada.

Actualizar el índice y [cambios](../../../doc/cambios.md) con un resumen y enlace. Ante una decisión relevante, consultar [ADR](../../../doc/adr/README.md), usar [plantilla](../../plantillas/adr.md) y mantener el mismo ID/estado que la nota canónica de Obsidian. La entrada de bitácora no convierte una propuesta en ADR aprobado.

La documentación y validación para cerrar el alcance autorizado pertenecen a esa entrega; no solicitar permiso por cada registro. No extender la autorización a escribir en Notion/Drive o a hacer commit/publicar. Informar qué se hizo y esperar autorización para el siguiente cambio.

