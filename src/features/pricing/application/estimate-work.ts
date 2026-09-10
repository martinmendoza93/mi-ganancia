import { calculatePricing, failure, type CostLine, type CurrencyCode, type Money, type PricingResult } from '../domain';

export interface EstimateWorkInput {
  readonly currency: CurrencyCode;
  readonly materials?: Money;
  readonly transport?: Money;
  readonly extras?: readonly CostLine[];
  readonly hours?: number;
  readonly hourlyRate?: Money;
  readonly targetProfit: Money;
}

export class EstimateWorkUseCase {
  execute(input: EstimateWorkInput): PricingResult {
    const costs: CostLine[] = [];

    if (input.materials) {
      costs.push({ id: 'materials', kind: 'materials', amount: input.materials });
    }
    if (input.transport) {
      costs.push({ id: 'transport', kind: 'transport', amount: input.transport });
    }
    if (input.extras) {
      costs.push(...input.extras);
    }

    const hasHours = input.hours !== undefined;
    const hasRate = input.hourlyRate !== undefined;
    if (hasHours !== hasRate) {
      return failure(
        'INCOMPLETE_WORK_TIME',
        'Para valorar el tiempo indica horas y tarifa, o deja ambos vacíos.',
      );
    }

    const workTime =
      input.hours !== undefined && input.hourlyRate !== undefined
        ? { hours: input.hours, hourlyRate: input.hourlyRate }
        : undefined;

    return calculatePricing({
      currency: input.currency,
      costs,
      workTime,
      intent: { type: 'estimate', targetProfit: input.targetProfit },
    });
  }
}
