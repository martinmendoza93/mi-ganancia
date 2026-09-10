import type { PricingResult } from '@/features/pricing/domain';
import { formatMoney, formatPercent } from './format';
import { resultExplanation, resultHero, resultStatusCopy } from './result-copy';

export function ResultPanel({ result }: { result: PricingResult }) {
  if (!result.ok) {
    return (
      <p className="error" role="alert">
        {result.message}
      </p>
    );
  }

  const status = resultStatusCopy(result.status);
  const profitLabel = result.status === 'LOSS' ? 'Pérdida estimada' : 'Ganancia';

  return (
    <section className="result" aria-live="polite">
      <p className={status.className}>{status.label}</p>
      <h2 className="result-hero">{resultHero(result)}</h2>
      <p>{resultExplanation(result)}</p>
      <div className="metrics">
        <div className="metric">
          <span>Costo</span>
          <strong>{formatMoney(result.cost)}</strong>
        </div>
        <div className="metric">
          <span>Precio a cobrar</span>
          <strong>{formatMoney(result.price)}</strong>
        </div>
        <div className="metric">
          <span>{profitLabel}</span>
          <strong>{formatMoney(result.profit)}</strong>
        </div>
        <div className="metric">
          <span>Margen (sobre el precio)</span>
          <strong>{formatPercent(result.margin, 'No calculable: el precio es 0')}</strong>
        </div>
        <div className="metric">
          <span>Markup (sobre el costo)</span>
          <strong>{formatPercent(result.markup, 'No calculable: el costo es 0')}</strong>
        </div>
      </div>
      <p className="hint">
        Los montos salen en la moneda que elegiste. Margen y markup no son lo mismo: el margen es sobre el
        precio; el markup, sobre el costo. Este precio es una guía, no una garantía de lo que el mercado acepte.
      </p>
    </section>
  );
}
