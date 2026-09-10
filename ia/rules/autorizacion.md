# Autorización de cambios

**Origen:** instrucción de Martín del 2026-09-09 en esta conversación: «siempre pidiendo mi autorizacion para algun cambio».

## Antes de un cambio nuevo

Preparar una propuesta concreta con objetivo, REQ o motivo documental, alcance, archivos/componentes afectados, impacto, alternativas relevantes y validación prevista. Presentarla con estado **PENDIENTE DE AUTORIZACIÓN** y preguntar si autoriza aplicarla.

Se puede inspeccionar y analizar sin modificar el producto. Preparar el texto de la propuesta en la conversación no requiere escribir archivos del proyecto. Para guardarla en un archivo, comprobar que la solicitud incluya esa escritura documental.

## Qué cuenta como autorización

- Una aprobación explícita vinculada a la propuesta, o una instrucción inequívoca para ejecutar una acción concreta.
- La autorización cubre solo el alcance indicado, incluidos los registros y verificaciones necesarios para cerrarlo.
- Una aprobación ya dada para ese mismo alcance sigue vigente; no pedir permiso por cada archivo, comprobación o corrección necesaria dentro de la entrega autorizada.
- Si aparece un cambio distinto o se amplía materialmente el alcance, preparar esa ampliación y solicitar autorización antes de aplicarla.

El silencio, una pregunta, una solicitud de análisis, un roadmap y una aprobación funcional no equivalen a permiso para implementar. «Vamos a empezar» por sí solo no autoriza motor, stack, dependencias, despliegue o cambios de reglas de negocio.

## Registro y cierre

Conservar referencia de la instrucción o aprobación y su alcance en la entrada de bitácora. Si no existe autorización de implementación, no registrar «implementado» ni crear un ADR aprobado.

Al concluir el cambio autorizado, informar el resultado y esperar la siguiente autorización. No encadenar refactors, nuevas funciones, commits, publicaciones ni escrituras remotas por iniciativa propia. Los permisos del entorno siguen aplicando independientemente de esta autorización de trabajo.

## Aplicación a esta configuración inicial

La petición de crear `ia`, agentes, reglas, habilidades, bitácora, cambios, ADR y aplicar reutilizables autoriza esos artefactos y sus enlaces/validación. No autoriza comenzar el código de la aplicación. Ver [registro local](../../doc/bitacora/BIT-LOCAL-0001.md).

