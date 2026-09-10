# Mi-Ganancia — Producto #001

Herramienta para entender costos, estimar cuánto cobrar por productos o servicios y evaluar la ganancia de un precio conocido.

V1 calcula **en el navegador**, sin cuenta ni servidor. El idioma de la UI es español; **la moneda se elige en cada cálculo** (NIO por defecto). El detalle técnico vive en Obsidian (`04-Proyectos/Mi-Ganancia`) y en [doc/](doc/README.md).

## Cómo ejecutar

```bash
npm install
npm test
npm run dev
```

- Inicio: `/`
- ¿Cuánto cobro?: `/estimar` (REQ-001)
- ¿Este precio me deja algo?: `/evaluar` (REQ-002)
- ¿Cuánto sale este trabajo?: `/trabajo` (REQ-003)

Políticas de dominio: [ADR-003](doc/adr/ADR-003-Politicas-de-dominio.md). Stack: [ADR-004](doc/adr/ADR-004-Stack-frontend.md).

BIT-0001 de Notion **no está** en este repositorio. El motor local es una implementación V1 propia, no una reconstrucción atribuida a Gemini.

Para trabajar con IA, comenzar por [AGENTS.md](AGENTS.md). Cada cambio nuevo requiere autorización de Martín.
