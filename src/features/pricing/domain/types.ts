export const MINOR_SCALE = 100;

export type CurrencyCode = string;

export interface Money {
  readonly amountMinor: number;
  readonly currency: CurrencyCode;
}

export type CostKind = 'generic' | 'materials' | 'transport' | 'labor' | 'other';

export interface CostLine {
  readonly id: string;
  readonly kind: CostKind;
  readonly amount: Money;
}

export interface WorkTime {
  readonly hours: number;
  readonly hourlyRate: Money;
}

export type ScenarioIntent =
  | { readonly type: 'estimate'; readonly targetProfit: Money }
  | { readonly type: 'evaluate'; readonly knownPrice: Money };

export interface Scenario {
  readonly currency: CurrencyCode;
  readonly costs: readonly CostLine[];
  readonly workTime?: WorkTime;
  readonly intent: ScenarioIntent;
}

export type OutcomeStatus = 'PROFIT' | 'BREAK_EVEN' | 'LOSS';

export type Ratio =
  | { readonly kind: 'ratio'; readonly value: number }
  | { readonly kind: 'not_computable' };

export type ErrorCode =
  | 'MIXED_CURRENCY'
  | 'INVALID_CURRENCY'
  | 'INVALID_NUMBER'
  | 'NEGATIVE_AMOUNT'
  | 'NEGATIVE_HOURS'
  | 'NEGATIVE_RATE'
  | 'NEGATIVE_PRICE'
  | 'NEGATIVE_TARGET'
  | 'DUPLICATE_LABOR'
  | 'AMOUNT_TOO_LARGE'
  | 'INCOMPLETE_WORK_TIME'
  | 'NON_INTEGER_MINOR';

export interface PricingSuccess {
  readonly ok: true;
  readonly cost: Money;
  readonly price: Money;
  readonly profit: Money;
  readonly margin: Ratio;
  readonly markup: Ratio;
  readonly status: OutcomeStatus;
}

export interface PricingFailure {
  readonly ok: false;
  readonly code: ErrorCode;
  readonly message: string;
}

export type PricingResult = PricingSuccess | PricingFailure;
