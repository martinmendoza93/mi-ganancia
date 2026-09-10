import { failure, isFailure, isIsoCurrency, laborFromWorkTime } from './money';
import type { PricingFailure, Scenario } from './types';

function isValidMinor(amountMinor: number): boolean {
  return Number.isFinite(amountMinor) && Number.isInteger(amountMinor) && Number.isSafeInteger(amountMinor);
}

export function validateScenario(scenario: Scenario): PricingFailure | undefined {
  if (!isIsoCurrency(scenario.currency)) {
    return failure('INVALID_CURRENCY', 'La moneda debe ser un código ISO de tres letras.');
  }

  const hasLaborLine = scenario.costs.some((line) => line.kind === 'labor');
  if (hasLaborLine && scenario.workTime) {
    return failure(
      'DUPLICATE_LABOR',
      'El mismo trabajo no puede entrar como tiempo y como costo de mano de obra a la vez.',
    );
  }

  for (const line of scenario.costs) {
    if (line.amount.currency !== scenario.currency) {
      return failure('MIXED_CURRENCY', 'Todos los importes de este cálculo deben usar la misma moneda.');
    }
    if (!Number.isFinite(line.amount.amountMinor)) {
      return failure('INVALID_NUMBER', 'Hay un costo que no es un número válido.');
    }
    if (!isValidMinor(line.amount.amountMinor)) {
      return failure('NON_INTEGER_MINOR', 'Hay un costo que no puede expresarse en centavos enteros.');
    }
    if (line.amount.amountMinor < 0) {
      return failure('NEGATIVE_AMOUNT', 'Los costos no pueden ser negativos.');
    }
  }

  if (scenario.workTime) {
    const { hours, hourlyRate } = scenario.workTime;
    if (!Number.isFinite(hours)) {
      return failure('INVALID_NUMBER', 'Las horas no son un número válido.');
    }
    if (hours < 0) {
      return failure('NEGATIVE_HOURS', 'Las horas no pueden ser negativas.');
    }
    if (hourlyRate.currency !== scenario.currency) {
      return failure('MIXED_CURRENCY', 'Todos los importes de este cálculo deben usar la misma moneda.');
    }
    if (hourlyRate.amountMinor < 0) {
      return failure('NEGATIVE_RATE', 'La tarifa por hora no puede ser negativa.');
    }
    if (!isValidMinor(hourlyRate.amountMinor)) {
      return failure('NON_INTEGER_MINOR', 'La tarifa por hora no puede expresarse en centavos enteros.');
    }
    const labor = laborFromWorkTime(hours, hourlyRate);
    if (isFailure(labor)) {
      return labor;
    }
  }

  if (scenario.intent.type === 'estimate') {
    const target = scenario.intent.targetProfit;
    if (target.currency !== scenario.currency) {
      return failure('MIXED_CURRENCY', 'Todos los importes de este cálculo deben usar la misma moneda.');
    }
    if (!Number.isFinite(target.amountMinor)) {
      return failure('INVALID_NUMBER', 'El objetivo de ganancia no es un número válido.');
    }
    if (!isValidMinor(target.amountMinor)) {
      return failure('NON_INTEGER_MINOR', 'El objetivo de ganancia no puede expresarse en centavos enteros.');
    }
    if (target.amountMinor < 0) {
      return failure('NEGATIVE_TARGET', 'El objetivo de ganancia no puede ser negativo.');
    }
    return undefined;
  }

  const price = scenario.intent.knownPrice;
  if (price.currency !== scenario.currency) {
    return failure('MIXED_CURRENCY', 'Todos los importes de este cálculo deben usar la misma moneda.');
  }
  if (!Number.isFinite(price.amountMinor)) {
    return failure('INVALID_NUMBER', 'El precio no es un número válido.');
  }
  if (!isValidMinor(price.amountMinor)) {
    return failure('NON_INTEGER_MINOR', 'El precio no puede expresarse en centavos enteros.');
  }
  if (price.amountMinor < 0) {
    return failure('NEGATIVE_PRICE', 'El precio no puede ser negativo.');
  }

  return undefined;
}
