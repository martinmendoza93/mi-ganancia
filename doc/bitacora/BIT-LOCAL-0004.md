# BIT-LOCAL-0004 — Análisis de avance y sincronización remota

- **REQ / motivo:** revisión del estado de REQ-001/002/003 y documentación del avance, mejoras y próxima fase.
- **Fecha y hora de cierre:** 2026-09-09 23:07, America/Managua (UTC−06:00).
- **Ejecutor:** Codex.
- **Autorización:** solicitud explícita del usuario en esta conversación de analizar lo desarrollado, fase actual, mejoras y fase siguiente, y documentarlo en Notion y Google Drive.
- **Alcance:** lectura de código/ADR/bitácoras/fuentes remotas, verificaciones existentes y sondeos de contratos, informe y actualización documental. No incluye correcciones de aplicación, commit ni publicación.
- **Estado:** análisis documentado en ambas herramientas y verificado por lectura posterior.

## Cambios realizados

| Artefacto | Tipo | Cambio y motivo |
| --- | --- | --- |
| [Informe en Notion](https://app.notion.com/p/3d758a5d05358123a9b7cfc9ceaec471?pvs=204) | ADD / DOC | Desarrollo observado, pruebas, seis hallazgos, mejoras y puertas de salida |
| [Página del producto](https://app.notion.com/p/3d558a5d0535818f9a25eb6b6979ca00?pvs=204) | MODIFY / DOC | Estado vigente y próximo paso; se etiquetaron los apartados anteriores como antecedentes sin borrar BIT-0001 |
| [Informe en Drive](https://docs.google.com/document/d/16X_gH2TazZwbWSRcVSXm0Yyyp18l9FtKzq2z0GcgVhg/edit) | ADD / DOC | Análisis equivalente con fuentes y enlace a Notion, ubicado en la carpeta del Producto #001 |
| [Documento Maestro](https://docs.google.com/document/d/1MvneOCgYIQY_LTpLuENo6bqaRpCBXHWIZ1UxCiOgd4M/edit) | MODIFY / DOC | Actualización de estado al inicio y enlace al informe; cuerpo histórico conservado |
| `doc/bitacora/BIT-LOCAL-0004.md`, `doc/bitacora/README.md` | ADD / MODIFY / DOC | Esta entrada y su índice |
| `doc/cambios.md`, `doc/README.md` | MODIFY / DOC | Resumen y acceso a informes vigentes |

Los documentos históricos de Planner, Iteraciones y Bitácora de Drive se leyeron y se reconciliaron en el informe; no se reescribieron. No se creó un ADR nuevo: esta entrega recomienda una fase y correcciones, no aprueba una decisión técnica nueva.

## Evidencia de revisión

- `npm test`: 3 archivos, 28 tests aprobados (21 dominio/aplicación, 4 mapeo, 3 copy).
- `npm run build`: TypeScript y Vite terminaron correctamente; se generaron artefactos de build locales.
- Lectura de dominio/aplicación/UI, parser, configuración de moneda, rutas, pruebas, ADR-003/004 y BIT-LOCAL-0002/0003. Las autorizaciones de esas entregas se citan como registradas por su ejecutor; no se auditó su conversación externa completa.
- Sondeo de los módulos reales con Vite SSR: `parseMajorAmount('1.005')` → 100; `'1.015'` → 101; `'1,000'` → 100 unidades menores. Se recomienda definir explícitamente precisión adicional y separadores.
- `moneyFromMinor(100, 'ABC')` acepta el formato de tres letras sin validar una moneda soportada; el selector UI sí limita las opciones actuales.
- `sumCosts` acepta un costo de -100 unidades menores como éxito; `calculatePricing` rechaza ese escenario con `NEGATIVE_AMOUNT`. La entrada auxiliar exportada no se observó en uso por los flujos actuales.
- REQ-003: el caso de uso admite `extras`, pero la página de trabajo no los captura ni los pasa al caso de uso.
- El primer sondeo Vite tuvo un error de puerto del sandbox; la repetición con escalación autorizada completó la comprobación sin ese error. No se modificaron fuentes para reproducir los casos.

## Verificación documental y límites

Lectura posterior confirmó el contenido del informe de Notion, el resumen y próximo paso del producto, todos los párrafos/secciones del informe de Google Docs, enlaces cruzados y la carpeta de destino. El informe de Drive contiene encabezados nativos, un chip de fecha y cuatro chips de fuentes Google. La actualización del Maestro mantiene el contenido histórico y enlaza al nuevo informe. No se realizó verificación visual de paginación de Google Docs.

No se recorrió la UI con clics, teclado, lector de pantalla o viewport móvil; no hubo piloto con usuarios. Las pruebas actuales de UI son funciones de mapeo/texto, no pruebas de navegador. El HTTP 200 de preview corresponde al reporte de la entrega anterior.

No hay HEAD/commit local verificable. Se preservaron el índice Git y los cambios del usuario; no se verificó el contenido del remoto ni un despliegue. Las pruebas y el build no equivalen a aceptación completa de V1.

## Próxima fase recomendada

Estabilizar V1: contrato de captura monetaria, otros gastos en servicios, contratos públicos y validación de interacción. Después, proponer un piloto pequeño con usuarios y una versión reproducible. Cada corrección, commit o publicación requiere autorización específica. El BIT-0001 de Gemini permanece como antecedente separado y no bloquea por sí mismo la implementación local propia.

