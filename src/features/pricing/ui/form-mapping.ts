import { isFailure, moneyFromMinor, type CostLine, type Money, type PricingFailure } from '@/features/pricing/domain';
import { parseHours, parseMajorAmount, type ParsedAmount } from '@/shared/utils/parse-amount';

export function moneyFromParsed(
  parsed: ParsedAmount,
  currency: string,
): Money | PricingFailure | undefined {
  if (parsed.status === 'absent') {
    return undefined;
  }
  if (parsed.status === 'invalid') {
    return { ok: false, code: parsed.code, message: parsed.message };
  }
  return moneyFromMinor(parsed.amountMinor, currency);
}

export function collectCostLines(
  rows: readonly { id: string; amount: string }[],
  currency: string,
): { costs: CostLine[] } | PricingFailure {
  const costs: CostLine[] = [];
  for (const row of rows) {
    const parsed = parseMajorAmount(row.amount);
    const money = moneyFromParsed(parsed, currency);
    if (isFailure(money)) {
      return money;
    }
    if (money) {
      costs.push({ id: row.id, kind: 'generic', amount: money });
    }
  }
  return { costs };
}

export function requiredMoney(
  raw: string,
  currency: string,
  emptyMessage: string,
): Money | PricingFailure {
  const parsed = parseMajorAmount(raw);
  const money = moneyFromParsed(parsed, currency);
  if (!money) {
    return { ok: false, code: 'INVALID_NUMBER', message: emptyMessage };
  }
  return money;
}

export function optionalHoursAndRate(
  hoursRaw: string,
  rateRaw: string,
  currency: string,
):
  | { hours?: number; hourlyRate?: Money }
  | PricingFailure {
  const hours = parseHours(hoursRaw);
  const rate = moneyFromParsed(parseMajorAmount(rateRaw), currency);

  if (hours.status === 'invalid') {
    return { ok: false, code: hours.code, message: hours.message };
  }
  if (isFailure(rate)) {
    return rate;
  }

  const hasHours = hours.status === 'present';
  const hasRate = Boolean(rate);
  if (hasHours !== hasRate) {
    return {
      ok: false,
      code: 'INCOMPLETE_WORK_TIME',
      message: 'Para valorar el tiempo indica horas y tarifa, o deja ambos vacíos.',
    };
  }
  if (hasHours && rate && hours.status === 'present') {
    return { hours: hours.hours, hourlyRate: rate };
  }
  return {};
}
