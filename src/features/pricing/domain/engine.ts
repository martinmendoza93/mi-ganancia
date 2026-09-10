import { addMoney, isFailure, laborFromWorkTime, moneyFromMinor, subtractMoney } from './money';
import type { Money, PricingFailure, PricingResult, Ratio, Scenario } from './types';
import { validateScenario } from './validation';

function zero(currency: string): Money {
  return { amountMinor: 0, currency };
}

export function sumApplicableCosts(scenario: Scenario): Money | PricingFailure {
  let total: Money = zero(scenario.currency);

  for (const line of scenario.costs) {
    const next = addMoney(total, line.amount);
    if (isFailure(next)) {
      return next;
    }
    total = next;
  }

  if (scenario.workTime) {
    const labor = laborFromWorkTime(scenario.workTime.hours, scenario.workTime.hourlyRate);
    if (isFailure(labor)) {
      return labor;
    }
    const next = addMoney(total, labor);
    if (isFailure(next)) {
      return next;
    }
    total = next;
  }

  return total;
}

export function sumCosts(scenario: Scenario): PricingResult {
  const total = sumApplicableCosts(scenario);
  if (isFailure(total)) {
    return total;
  }

  return {
    ok: true,
    cost: total,
    price: total,
    profit: zero(scenario.currency),
    margin: { kind: 'not_computable' },
    markup: { kind: 'not_computable' },
    status: 'BREAK_EVEN',
  };
}

function ratio(numeratorMinor: number, denominatorMinor: number): Ratio {
  if (denominatorMinor === 0) {
    return { kind: 'not_computable' };
  }
  return { kind: 'ratio', value: numeratorMinor / denominatorMinor };
}

export function calculatePricing(scenario: Scenario): PricingResult {
  const invalid = validateScenario(scenario);
  if (invalid) {
    return invalid;
  }

  const cost = sumApplicableCosts(scenario);
  if (isFailure(cost)) {
    return cost;
  }

  const priceResult =
    scenario.intent.type === 'estimate'
      ? addMoney(cost, scenario.intent.targetProfit)
      : moneyFromMinor(scenario.intent.knownPrice.amountMinor, scenario.currency);

  if (isFailure(priceResult)) {
    return priceResult;
  }

  const profitResult = subtractMoney(priceResult, cost);
  if (isFailure(profitResult)) {
    return profitResult;
  }

  const status =
    profitResult.amountMinor > 0
      ? 'PROFIT'
      : profitResult.amountMinor < 0
        ? 'LOSS'
        : 'BREAK_EVEN';

  return {
    ok: true,
    cost,
    price: priceResult,
    profit: profitResult,
    margin: ratio(profitResult.amountMinor, priceResult.amountMinor),
    markup: ratio(profitResult.amountMinor, cost.amountMinor),
    status,
  };
}
