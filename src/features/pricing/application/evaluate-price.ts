import { calculatePricing, type CostLine, type CurrencyCode, type Money, type PricingResult } from '../domain';

export interface EvaluatePriceInput {
  readonly currency: CurrencyCode;
  readonly costs: readonly CostLine[];
  readonly knownPrice: Money;
}

export class EvaluatePriceUseCase {
  execute(input: EvaluatePriceInput): PricingResult {
    return calculatePricing({
      currency: input.currency,
      costs: input.costs,
      intent: { type: 'evaluate', knownPrice: input.knownPrice },
    });
  }
}
