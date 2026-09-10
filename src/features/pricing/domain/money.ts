import { MINOR_SCALE, type CurrencyCode, type ErrorCode, type Money, type PricingFailure } from './types';

export function isIsoCurrency(code: string): boolean {
  return /^[A-Z]{3}$/.test(code);
}

export function isFailure(value: unknown): value is PricingFailure {
  return (
    typeof value === 'object' &&
    value !== null &&
    'ok' in value &&
    (value as { ok: unknown }).ok === false &&
    'code' in value
  );
}

export function failure(code: ErrorCode, message: string): PricingFailure {
  return { ok: false, code, message };
}

export function moneyFromMinor(
  amountMinor: number,
  currency: CurrencyCode,
): Money | PricingFailure {
  if (!isIsoCurrency(currency)) {
    return failure('INVALID_CURRENCY', 'La moneda debe ser un código ISO de tres letras.');
  }
  if (!Number.isFinite(amountMinor) || !Number.isInteger(amountMinor)) {
    return failure('NON_INTEGER_MINOR', 'El importe interno debe ser un entero finito.');
  }
  if (!Number.isSafeInteger(amountMinor)) {
    return failure('AMOUNT_TOO_LARGE', 'El importe supera el máximo seguro de cálculo.');
  }
  return { amountMinor, currency };
}

export function moneyFromMajor(
  major: number,
  currency: CurrencyCode,
): Money | PricingFailure {
  if (!Number.isFinite(major)) {
    return failure('INVALID_NUMBER', 'El importe no es un número válido.');
  }
  return moneyFromMinor(Math.round(major * MINOR_SCALE), currency);
}

export function addMoney(left: Money, right: Money): Money | PricingFailure {
  if (left.currency !== right.currency) {
    return failure('MIXED_CURRENCY', 'Todos los importes de este cálculo deben usar la misma moneda.');
  }
  const sum = left.amountMinor + right.amountMinor;
  return moneyFromMinor(sum, left.currency);
}

export function subtractMoney(left: Money, right: Money): Money | PricingFailure {
  if (left.currency !== right.currency) {
    return failure('MIXED_CURRENCY', 'Todos los importes de este cálculo deben usar la misma moneda.');
  }
  return moneyFromMinor(left.amountMinor - right.amountMinor, left.currency);
}

export function laborFromWorkTime(hours: number, hourlyRate: Money): Money | PricingFailure {
  if (!Number.isFinite(hours)) {
    return failure('INVALID_NUMBER', 'Las horas no son un número válido.');
  }
  const amountMinor = Math.round(hours * hourlyRate.amountMinor);
  return moneyFromMinor(amountMinor, hourlyRate.currency);
}
