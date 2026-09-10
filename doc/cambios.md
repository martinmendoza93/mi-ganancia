# Historial de cambios

Resumen de entregas realizadas. La [bitácora](bitacora/README.md) conserva autorización, detalle y evidencia; Git conservará el diff cuando se registren commits. Las propuestas no se registran aquí como realizadas.

## 2026-09-09 — Configuración de IA y trazabilidad

Se añadió `ia/` con rol, reglas, tres habilidades y plantillas adaptadas de Obsidian, y `AGENTS.md` como entrada del proyecto. Se estableció autorización explícita para cada cambio nuevo y se conectaron bitácora local, historial y ADR.

Evidencia y alcance: [BIT-LOCAL-0001](bitacora/BIT-LOCAL-0001.md). Decisión: [ADR-002](adr/ADR-002-Configuracion-IA.md). Sin cambios de código de aplicación.

## 2026-09-09 — Arranque V1 (motor y tres flujos)

Se cerraron las políticas DOM-01 a DOM-09 y el stack Vite/React/TypeScript, se implementó el motor compartido con tests VAL-01 a VAL-16 y tres pantallas locales. Cálculo en el cliente; sin PWA ni backend.

Evidencia: [BIT-LOCAL-0002](bitacora/BIT-LOCAL-0002.md). Decisiones: [ADR-003](adr/ADR-003-Politicas-de-dominio.md), [ADR-004](adr/ADR-004-Stack-frontend.md).

## 2026-09-09 — UI del prototipo (voz y moneda)

Se alineó la interfaz local con el prototipo Canva: paleta crema/ciruela, marca `mg`, copy en preguntas y resultado «te quedan». El español se mantiene; la moneda se elige por cálculo (NIO inicial). El motor no cambió.

Evidencia: [BIT-LOCAL-0003](bitacora/BIT-LOCAL-0003.md).

## 2026-09-09 — Revisión de avance y documentación remota

Se contrastó la V1 local con Notion/Drive, se ejecutaron las 28 pruebas y el build, y se documentaron hallazgos adicionales de captura monetaria, servicios y contratos. Se crearon informes en ambas herramientas y se actualizaron el estado del producto en Notion y el inicio del Documento Maestro. Se recomienda estabilización antes del piloto; no se corrigió código de aplicación.

Evidencia y enlaces: [BIT-LOCAL-0004](bitacora/BIT-LOCAL-0004.md).
