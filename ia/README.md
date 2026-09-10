# IA del proyecto

Configuración documental local para trabajar en Producto #001. Entrada desde [AGENTS.md](../AGENTS.md). La carpeta `ia/` se creó el 2026-09-09 (BIT-LOCAL-0001). El motor y el stack V1 se autorizaron después, en [BIT-LOCAL-0002](../doc/bitacora/BIT-LOCAL-0002.md).

```text
ia/
├── agents/AGENT.md
├── rules/
│   ├── autorizacion.md
│   └── documentacion.md
├── skills/
│   ├── mi-ganancia-planificar-cambio/SKILL.md
│   ├── mi-ganancia-revisar-dominio/SKILL.md
│   └── mi-ganancia-registrar-entrega/SKILL.md
└── plantillas/
    ├── cambio.md
    ├── adr.md
    └── entrega.md
```

## Lectura y uso

1. Leer [autorización](rules/autorizacion.md) y [rol](agents/AGENT.md).
2. Revisar [base técnica](../doc/base-tecnica.md), estado local y documentos relacionados con la tarea.
3. Seleccionar y leer únicamente las habilidades necesarias:

| Habilidad | Cuándo se aplica |
| --- | --- |
| [Planificar cambio](skills/mi-ganancia-planificar-cambio/SKILL.md) | Preparar alcance técnico, criterios y propuesta para autorización |
| [Revisar dominio](skills/mi-ganancia-revisar-dominio/SKILL.md) | Analizar fórmulas, moneda, costos, trabajo y pruebas del motor |
| [Registrar entrega](skills/mi-ganancia-registrar-entrega/SKILL.md) | Cerrar un cambio autorizado con evidencia, bitácora, cambios y ADR cuando corresponda |

Las habilidades tienen formato `SKILL.md` y se mantienen en el proyecto; no se ha configurado instalación global ni detección automática desde esta carpeta. Un agente debe abrir el archivo indicado para usarlas. No se instalan dependencias ni se crean procesos de IA.

## Reutilización aplicada

Las [plantillas](plantillas/cambio.md) adaptan las tres notas de `Mi-documentacion/04-Proyectos/Mi-Ganancia/07-Reutilizables/`: requisito técnico, ADR y entrega técnica. Añaden rutas e identificadores de este repositorio. El razonamiento técnico amplio sigue en Obsidian; aquí se conserva lo necesario para trabajar.

Ver [reglas documentales](rules/documentacion.md), [bitácora](../doc/bitacora/README.md), [historial de cambios](../doc/cambios.md) y [ADR](../doc/adr/README.md).

