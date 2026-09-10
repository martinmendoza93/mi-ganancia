# Validación del motor V1

**Origen:** Obsidian `04-Proyectos/Mi-Ganancia/06-Calidad/Plan-de-validacion.md`. **Revisión:** 2026-09-09. **Estado:** casos ejecutados con Vitest sobre el motor local. BIT-0001 de Notion no se localizó; estos resultados no lo validan.

Comando: `npm test` en `mi-ganancia/`.

| Caso | Resultado observado en tests |
| --- | --- |
| VAL-01 C=65 P=100 | G=35; margen 35 %; markup 35/65 |
| VAL-02 C=80 P=100 | G=20; margen 20 %; markup 25 %; PROFIT |
| VAL-03 C=100 P=80 | G=−20; margen −25 %; markup −20 %; LOSS |
| VAL-04 C=80 P=80 | G=0; ambos 0 %; BREAK_EVEN |
| VAL-05 C=65 objetivo 20 | P=85; G=20 |
| VAL-06 materiales 30 + transporte 5 + 2 h × 10, objetivo 15 | C=55; P=70; G=15 |
| VAL-07 C=10 P=0 | G=−10; margen no calculable; markup −100 % |
| VAL-08 C=0 P=10 | G=10; markup no calculable |
| VAL-09 C=0 P=0 | G=0; ambos no calculables |
| VAL-10 inválidos | Rechazo; vacío ≠ cero |
| VAL-11 0.10+0.20=0.30 | BREAK_EVEN en unidades menores |
| VAL-12 LABOR + WorkTime | `DUPLICATE_LABOR` |
| VAL-13 hora/tarifa 0 y sin materiales | Válido |
| VAL-14 monedas mixtas | Rechazo |
| VAL-15 horas 0.5 × 10 | C=5 |
| VAL-16 objetivo en monto C=80 + 20 | P=100; sin modalidad % |

Cuando exista revisión humana de UI: completar los tres flujos en móvil y teclado. Esta entrega comprobó `npm test`, `npm run build` y HTTP 200 de `/`, `/estimar`, `/evaluar` y `/trabajo` en Vite preview. No hubo automatización de clics en navegador.

La copy de resultado («Te quedan», «Quedas tablas», pérdida sin jerga `LOSS`) se cubre en `src/features/pricing/ui/result-copy.test.ts`.
