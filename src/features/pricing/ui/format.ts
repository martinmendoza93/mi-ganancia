import type { Money, Ratio } from '@/features/pricing/domain';

const LOCALE = 'es-NI';

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: money.currency,
  }).format(money.amountMinor / 100);
}

export function formatPercent(ratio: Ratio, missingLabel: string): string {
  if (ratio.kind === 'not_computable') {
    return missingLabel;
  }
  return `${new Intl.NumberFormat(LOCALE, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(ratio.value * 100)} %`;
}
