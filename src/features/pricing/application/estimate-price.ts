import { calculatePricing, type CostLine, type CurrencyCode, type Money, type PricingResult } from '../domain';

export interface EstimatePriceInput {
  readonly currency: CurrencyCode;
  readonly costs: readonly CostLine[];
  readonly targetProfit: Money;
}

export class EstimatePriceUseCase {
  execute(input: EstimatePriceInput): PricingResult {
    return calculatePricing({
      currency: input.currency,
      costs: input.costs,
      intent: { type: 'estimate', targetProfit: input.targetProfit },
    });
  }
}
