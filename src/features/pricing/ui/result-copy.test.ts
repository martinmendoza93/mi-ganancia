import { describe, expect, it } from 'vitest';
import type { Money, PricingSuccess } from '@/features/pricing/domain';
import { resultExplanation, resultHero, resultStatusCopy } from './result-copy';

function nio(amountMinor: number): Money {
  return { amountMinor, currency: 'NIO' };
}

function usd(amountMinor: number): Money {
  return { amountMinor, currency: 'USD' };
}

function success(partial: Pick<PricingSuccess, 'cost' | 'price' | 'profit' | 'status'>): PricingSuccess {
  return {
    ok: true,
    margin: { kind: 'ratio', value: 0.33 },
    markup: { kind: 'ratio', value: 0.5 },
    ...partial,
  };
}

describe('copy de resultado', () => {
  it('pone “te quedan” como titular cuando hay ganancia, en la moneda elegida', () => {
    const result = success({
      cost: nio(80000),
      price: nio(120000),
      profit: nio(40000),
      status: 'PROFIT',
    });
    expect(resultHero(result)).toMatch(/^Te quedan /);
    expect(resultHero(result)).toContain('400');
    expect(resultStatusCopy(result.status).label).toBe('Sí te deja');
    expect(resultExplanation(result)).toContain('te quedan');
  });

  it('dice “quedas tablas” en equilibrio', () => {
    const result = success({
      cost: usd(10000),
      price: usd(10000),
      profit: usd(0),
      status: 'BREAK_EVEN',
    });
    expect(resultHero(result)).toBe('Quedas tablas');
    expect(resultStatusCopy(result.status).label).toBe('Quedas tablas');
  });

  it('nombra la pérdida sin jerga LOSS', () => {
    const result = success({
      cost: nio(120000),
      price: nio(80000),
      profit: nio(-40000),
      status: 'LOSS',
    });
    expect(resultHero(result)).toBe('Este precio te deja en pérdida');
    expect(resultExplanation(result)).toContain('pérdida estimada');
  });
});
