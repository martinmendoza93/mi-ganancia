---
name: mi-ganancia-revisar-dominio
description: Revisar cálculos, contratos monetarios y costo laboral del motor común de REQ-001/002/003 de Mi-Ganancia, preparando hallazgos y casos verificables.
---

# Revisar el dominio de Mi-Ganancia

Leer [base técnica](../../../doc/base-tecnica.md), [validación](../../../doc/validacion.md) y [autorización](../../rules/autorizacion.md). Si el análisis requiere el detalle, consultar en Obsidian `04-Proyectos/Mi-Ganancia/02-Dominio/Reglas-y-pendientes.md`.

Localizar primero el código real. BIT-0001 es un reporte; si faltan los archivos, declarar esa limitación y revisar únicamente contratos/documentos, sin reconstruirlos como si fueran la implementación original.

Confrontar los casos aprobados y el comportamiento observado:

- Margen usa precio; markup usa costo. Aclarar razón frente a porcentaje y denominador cero.
- Resolver moneda, escala, redondeo y equilibrio sin tolerancias arbitrarias.
- Distinguir entradas ausentes, cero, inválidas y una pérdida legítima como salida.
- Evitar contabilizar el mismo trabajo mediante LABOR y WorkTime; separar compensación laboral de ganancia adicional.
- Conservar consistencia entre escenarios equivalentes de producto y servicio y evitar fórmulas en UI.

Entregar hallazgos con REQ, evidencia, ejemplo y decisión pendiente. Derivar pruebas de resultados de negocio, no de copiar la implementación. Proponer correcciones concretas y solicitar autorización antes de aplicarlas cuando no estén ya cubiertas. Nunca aprobar una política monetaria solo porque el código existente la use.

