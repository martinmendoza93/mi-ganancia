import type { OutcomeStatus, PricingSuccess } from '@/features/pricing/domain';
import { formatMoney } from './format';

const STATUS_COPY = {
  PROFIT: { className: 'status profit', label: 'Sí te deja' },
  LOSS: { className: 'status loss', label: 'Pérdida' },
  BREAK_EVEN: { className: 'status even', label: 'Quedas tablas' },
} as const;

export function resultStatusCopy(status: OutcomeStatus) {
  return STATUS_COPY[status];
}

export function resultHero(result: PricingSuccess): string {
  if (result.status === 'PROFIT') {
    return `Te quedan ${formatMoney(result.profit)}`;
  }
  if (result.status === 'BREAK_EVEN') {
    return 'Quedas tablas';
  }
  return 'Este precio te deja en pérdida';
}

export function resultExplanation(result: PricingSuccess): string {
  const cost = formatMoney(result.cost);
  const price = formatMoney(result.price);
  if (result.status === 'LOSS') {
    const loss = formatMoney({ ...result.profit, amountMinor: Math.abs(result.profit.amountMinor) });
    return `El costo es ${cost}. Si cobras ${price}, no cubres ese costo: la pérdida estimada es ${loss}.`;
  }
  if (result.status === 'BREAK_EVEN') {
    return `El costo es ${cost}. Cobrar ${price} cubre exactamente esos costos; no queda ganancia.`;
  }
  return `El costo es ${cost}. Si cobras ${price}, te quedan ${formatMoney(result.profit)} después de esos costos.`;
}
