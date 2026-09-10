import { describe, expect, it } from 'vitest';
import { EstimatePriceUseCase } from '../application/estimate-price';
import { EstimateWorkUseCase } from '../application/estimate-work';
import { EvaluatePriceUseCase } from '../application/evaluate-price';
import {
  calculatePricing,
  isFailure,
  moneyFromMajor,
  moneyFromMinor,
  type CostKind,
  type CostLine,
  type Money,
  type PricingSuccess,
  type Scenario,
} from '../domain';

const NIO = 'NIO';

function major(n: number, currency = NIO): Money {
  const money = moneyFromMajor(n, currency);
  if (isFailure(money)) {
    throw new Error(money.message);
  }
  return money;
}

function minor(amountMinor: number, currency = NIO): Money {
  const money = moneyFromMinor(amountMinor, currency);
  if (isFailure(money)) {
    throw new Error(money.message);
  }
  return money;
}

function cost(id: string, n: number, kind: CostKind = 'generic', currency = NIO): CostLine {
  return { id, kind, amount: major(n, currency) };
}

function expectSuccess(result: ReturnType<typeof calculatePricing>): PricingSuccess {
  expect(result.ok).toBe(true);
  if (!result.ok) {
    throw new Error(result.message);
  }
  return result;
}

describe('VAL-01 a VAL-06 aritmética explícita', () => {
  it('VAL-01: costos 50+10+5 y precio 100', () => {
    const result = expectSuccess(
      calculatePricing({
        currency: NIO,
        costs: [cost('a', 50), cost('b', 10), cost('c', 5)],
        intent: { type: 'evaluate', knownPrice: major(100) },
      }),
    );
    expect(result.cost.amountMinor).toBe(6500);
    expect(result.profit.amountMinor).toBe(3500);
    expect(result.margin).toEqual({ kind: 'ratio', value: 35 / 100 });
    expect(result.markup.kind).toBe('ratio');
    if (result.markup.kind === 'ratio') {
      expect(result.markup.value).toBeCloseTo(35 / 65, 10);
    }
    expect(result.status).toBe('PROFIT');
  });

  it('VAL-02: C=80 P=100 ganancia, margen 20 % y markup 25 %', () => {
    const result = expectSuccess(
      calculatePricing({
        currency: NIO,
        costs: [cost('c', 80)],
        intent: { type: 'evaluate', knownPrice: major(100) },
      }),
    );
    expect(result.profit.amountMinor).toBe(2000);
    expect(result.margin).toEqual({ kind: 'ratio', value: 0.2 });
    expect(result.markup).toEqual({ kind: 'ratio', value: 0.25 });
    expect(result.status).toBe('PROFIT');
  });

  it('VAL-03: C=100 P=80 pérdida', () => {
    const result = expectSuccess(
      calculatePricing({
        currency: NIO,
        costs: [cost('c', 100)],
        intent: { type: 'evaluate', knownPrice: major(80) },
      }),
    );
    expect(result.profit.amountMinor).toBe(-2000);
    expect(result.margin).toEqual({ kind: 'ratio', value: -0.25 });
    expect(result.markup).toEqual({ kind: 'ratio', value: -0.2 });
    expect(result.status).toBe('LOSS');
  });

  it('VAL-04: C=80 P=80 equilibrio', () => {
    const result = expectSuccess(
      calculatePricing({
        currency: NIO,
        costs: [cost('c', 80)],
        intent: { type: 'evaluate', knownPrice: major(80) },
      }),
    );
    expect(result.profit.amountMinor).toBe(0);
    expect(result.margin).toEqual({ kind: 'ratio', value: 0 });
    expect(result.markup).toEqual({ kind: 'ratio', value: 0 });
    expect(result.status).toBe('BREAK_EVEN');
  });

  it('VAL-05: C=65 objetivo 20 → P=85', () => {
    const result = expectSuccess(
      new EstimatePriceUseCase().execute({
        currency: NIO,
        costs: [cost('c', 65)],
        targetProfit: major(20),
      }),
    );
    expect(result.price.amountMinor).toBe(8500);
    expect(result.profit.amountMinor).toBe(2000);
    expect(result.status).toBe('PROFIT');
  });

  it('VAL-06: materiales 30, transporte 5, 2h×10, objetivo 15', () => {
    const result = expectSuccess(
      new EstimateWorkUseCase().execute({
        currency: NIO,
        materials: major(30),
        transport: major(5),
        hours: 2,
        hourlyRate: major(10),
        targetProfit: major(15),
      }),
    );
    expect(result.cost.amountMinor).toBe(5500);
    expect(result.price.amountMinor).toBe(7000);
    expect(result.profit.amountMinor).toBe(1500);
  });
});

describe('VAL-07 a VAL-16 políticas V1', () => {
  it('VAL-07: P=0 admite G negativa y margen no calculable', () => {
    const result = expectSuccess(
      calculatePricing({
        currency: NIO,
        costs: [cost('c', 10)],
        intent: { type: 'evaluate', knownPrice: major(0) },
      }),
    );
    expect(result.profit.amountMinor).toBe(-1000);
    expect(result.margin).toEqual({ kind: 'not_computable' });
    expect(result.markup).toEqual({ kind: 'ratio', value: -1 });
    expect(result.status).toBe('LOSS');
  });

  it('VAL-08: C=0 P=10 markup no calculable', () => {
    const result = expectSuccess(
      calculatePricing({
        currency: NIO,
        costs: [],
        intent: { type: 'evaluate', knownPrice: major(10) },
      }),
    );
    expect(result.profit.amountMinor).toBe(1000);
    expect(result.margin).toEqual({ kind: 'ratio', value: 1 });
    expect(result.markup).toEqual({ kind: 'not_computable' });
  });

  it('VAL-09: C=0 P=0 ambos indicadores no calculables', () => {
    const result = expectSuccess(
      calculatePricing({
        currency: NIO,
        costs: [],
        intent: { type: 'evaluate', knownPrice: major(0) },
      }),
    );
    expect(result.profit.amountMinor).toBe(0);
    expect(result.margin).toEqual({ kind: 'not_computable' });
    expect(result.markup).toEqual({ kind: 'not_computable' });
    expect(result.status).toBe('BREAK_EVEN');
  });

  it('VAL-10: rechaza negativos, NaN e infinito; vacío no es cero', () => {
    const negative = calculatePricing({
      currency: NIO,
      costs: [{ id: 'c', kind: 'generic', amount: minor(-1) }],
      intent: { type: 'evaluate', knownPrice: major(10) },
    });
    expect(negative.ok).toBe(false);
    if (!negative.ok) {
      expect(negative.code).toBe('NEGATIVE_AMOUNT');
    }

    const nanHours = calculatePricing({
      currency: NIO,
      costs: [],
      workTime: { hours: Number.NaN, hourlyRate: major(10) },
      intent: { type: 'evaluate', knownPrice: major(10) },
    });
    expect(nanHours.ok).toBe(false);

    const infPrice = calculatePricing({
      currency: NIO,
      costs: [],
      intent: { type: 'evaluate', knownPrice: { amountMinor: Number.POSITIVE_INFINITY, currency: NIO } },
    });
    expect(infPrice.ok).toBe(false);

    const absentCosts = expectSuccess(
      new EvaluatePriceUseCase().execute({
        currency: NIO,
        costs: [],
        knownPrice: major(10),
      }),
    );
    expect(absentCosts.cost.amountMinor).toBe(0);
  });

  it('VAL-11: 0.10 + 0.20 con P=0.30 es equilibrio en menores', () => {
    const result = expectSuccess(
      calculatePricing({
        currency: NIO,
        costs: [
          { id: 'a', kind: 'generic', amount: minor(10) },
          { id: 'b', kind: 'generic', amount: minor(20) },
        ],
        intent: { type: 'evaluate', knownPrice: minor(30) },
      }),
    );
    expect(result.status).toBe('BREAK_EVEN');
    expect(result.profit.amountMinor).toBe(0);
  });

  it('VAL-12: LABOR y WorkTime del mismo trabajo se rechazan', () => {
    const result = calculatePricing({
      currency: NIO,
      costs: [cost('labor', 20, 'labor')],
      workTime: { hours: 2, hourlyRate: major(10) },
      intent: { type: 'evaluate', knownPrice: major(100) },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe('DUPLICATE_LABOR');
    }
  });

  it('VAL-13: hora cero, tarifa cero y sin materiales son válidos', () => {
    const result = expectSuccess(
      new EstimateWorkUseCase().execute({
        currency: NIO,
        hours: 0,
        hourlyRate: major(0),
        transport: major(5),
        targetProfit: major(10),
      }),
    );
    expect(result.cost.amountMinor).toBe(500);
    expect(result.price.amountMinor).toBe(1500);
  });

  it('VAL-14: monedas distintas se rechazan', () => {
    const result = calculatePricing({
      currency: NIO,
      costs: [cost('a', 10, 'generic', 'USD')],
      intent: { type: 'evaluate', knownPrice: major(20) },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe('MIXED_CURRENCY');
    }
  });

  it('VAL-15: horas fraccionarias y redondeo de frontera', () => {
    const halfHour = expectSuccess(
      new EstimateWorkUseCase().execute({
        currency: NIO,
        hours: 0.5,
        hourlyRate: major(10),
        targetProfit: major(0),
      }),
    );
    expect(halfHour.cost.amountMinor).toBe(500);

    const rounding = expectSuccess(
      new EstimateWorkUseCase().execute({
        currency: NIO,
        hours: 1 / 3,
        hourlyRate: major(10),
        targetProfit: major(0),
      }),
    );
    expect(rounding.cost.amountMinor).toBe(Math.round((1 / 3) * 1000));
  });

  it('VAL-16: V1 solo admite objetivo en monto (C=80 objetivo 20 → P=100)', () => {
    const result = expectSuccess(
      new EstimatePriceUseCase().execute({
        currency: NIO,
        costs: [cost('c', 80)],
        targetProfit: major(20),
      }),
    );
    expect(result.price.amountMinor).toBe(10000);
    expect(result.profit.amountMinor).toBe(2000);
  });
});

describe('invariantes del núcleo', () => {
  it('no muta las entradas y es determinista', () => {
    const costs = [cost('a', 50), cost('b', 10)];
    const scenario: Scenario = {
      currency: NIO,
      costs,
      intent: { type: 'evaluate', knownPrice: major(80) },
    };
    const first = expectSuccess(calculatePricing(scenario));
    const second = expectSuccess(calculatePricing(scenario));
    expect(costs[0]?.amount.amountMinor).toBe(5000);
    expect(scenario.costs).toBe(costs);
    expect(first).toEqual(second);
  });

  it('el orden de costos no cambia el total', () => {
    const left = expectSuccess(
      calculatePricing({
        currency: NIO,
        costs: [cost('a', 10), cost('b', 20), cost('c', 30)],
        intent: { type: 'evaluate', knownPrice: major(100) },
      }),
    );
    const right = expectSuccess(
      calculatePricing({
        currency: NIO,
        costs: [cost('c', 30), cost('a', 10), cost('b', 20)],
        intent: { type: 'evaluate', knownPrice: major(100) },
      }),
    );
    expect(left.cost).toEqual(right.cost);
  });

  it('estimar y luego evaluar conserva la ganancia objetivo', () => {
    const estimated = expectSuccess(
      new EstimatePriceUseCase().execute({
        currency: NIO,
        costs: [cost('c', 65)],
        targetProfit: major(20),
      }),
    );
    const evaluated = expectSuccess(
      new EvaluatePriceUseCase().execute({
        currency: NIO,
        costs: [cost('c', 65)],
        knownPrice: estimated.price,
      }),
    );
    expect(evaluated.profit).toEqual(estimated.profit);
  });

  it('producto y servicio normalizados equivalentes coinciden', () => {
    const product = expectSuccess(
      new EstimatePriceUseCase().execute({
        currency: NIO,
        costs: [cost('m', 30), cost('t', 5), cost('l', 20)],
        targetProfit: major(15),
      }),
    );
    const service = expectSuccess(
      new EstimateWorkUseCase().execute({
        currency: NIO,
        materials: major(30),
        transport: major(5),
        hours: 2,
        hourlyRate: major(10),
        targetProfit: major(15),
      }),
    );
    expect(product.cost).toEqual(service.cost);
    expect(product.price).toEqual(service.price);
  });

  it('tiempo incompleto no se convierte en cero silencioso', () => {
    const result = new EstimateWorkUseCase().execute({
      currency: NIO,
      hours: 2,
      targetProfit: major(10),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe('INCOMPLETE_WORK_TIME');
    }
  });
});
