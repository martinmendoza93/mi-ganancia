import { MINOR_SCALE, type ErrorCode } from '@/features/pricing/domain';

export type ParsedAmount =
  | { readonly status: 'absent' }
  | { readonly status: 'invalid'; readonly code: ErrorCode; readonly message: string }
  | { readonly status: 'present'; readonly amountMinor: number };

export type ParsedHours =
  | { readonly status: 'absent' }
  | { readonly status: 'invalid'; readonly code: ErrorCode; readonly message: string }
  | { readonly status: 'present'; readonly hours: number };

function normalizeDecimal(raw: string): string {
  return raw.trim().replace(/\s/g, '').replace(',', '.');
}

export function parseMajorAmount(raw: string): ParsedAmount {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return { status: 'absent' };
  }

  const normalized = normalizeDecimal(trimmed);
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    if (normalized.startsWith('-')) {
      return {
        status: 'invalid',
        code: 'NEGATIVE_AMOUNT',
        message: 'Los importes no pueden ser negativos.',
      };
    }
    return {
      status: 'invalid',
      code: 'INVALID_NUMBER',
      message: 'Escribe un importe numérico, por ejemplo 80 o 80.50',
    };
  }

  const major = Number(normalized);
  if (!Number.isFinite(major)) {
    return {
      status: 'invalid',
      code: 'INVALID_NUMBER',
      message: 'El importe no es un número válido.',
    };
  }

  const amountMinor = Math.round(major * MINOR_SCALE);
  if (!Number.isSafeInteger(amountMinor)) {
    return {
      status: 'invalid',
      code: 'AMOUNT_TOO_LARGE',
      message: 'El importe supera el máximo seguro de cálculo.',
    };
  }

  return { status: 'present', amountMinor };
}

export function parseHours(raw: string): ParsedHours {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return { status: 'absent' };
  }

  const normalized = normalizeDecimal(trimmed);
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    if (normalized.startsWith('-')) {
      return {
        status: 'invalid',
        code: 'NEGATIVE_HOURS',
        message: 'Las horas no pueden ser negativas.',
      };
    }
    return {
      status: 'invalid',
      code: 'INVALID_NUMBER',
      message: 'Escribe las horas como número, por ejemplo 2 o 1.5.',
    };
  }

  const hours = Number(normalized);
  if (!Number.isFinite(hours)) {
    return {
      status: 'invalid',
      code: 'INVALID_NUMBER',
      message: 'Las horas no son un número válido.',
    };
  }

  return { status: 'present', hours };
}
