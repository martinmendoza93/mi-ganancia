import { describe, expect, it } from 'vitest';
import { estimatePriceUseCase, estimateWorkUseCase, evaluatePriceUseCase } from '@/app/providers/pricing';
import { isFailure } from '@/features/pricing/domain';
import { collectCostLines, optionalHoursAndRate, requiredMoney } from './form-mapping';

describe('mapeo de formularios a casos de uso', () => {
  it('REQ-001: costos 50+10+5 y objetivo 20 sugieren precio 85', () => {
    const costs = collectCostLines(
      [
        { id: 'a', amount: '50' },
        { id: 'b', amount: '10' },
        { id: 'c', amount: '5' },
      ],
      'NIO',
    );
    expect(isFailure(costs)).toBe(false);
    if (isFailure(costs)) {
      return;
    }
    const target = requiredMoney('20', 'NIO', 'falta objetivo');
    expect(isFailure(target)).toBe(false);
    if (isFailure(target)) {
      return;
    }
    const result = estimatePriceUseCase.execute({
      currency: 'NIO',
      costs: costs.costs,
      targetProfit: target,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.price.amountMinor).toBe(8500);
      expect(result.profit.amountMinor).toBe(2000);
    }
  });

  it('REQ-002: precio 80 con costo 100 muestra pérdida', () => {
    const costs = collectCostLines([{ id: 'c', amount: '100' }], 'NIO');
    const price = requiredMoney('80', 'NIO', 'falta precio');
    expect(isFailure(costs)).toBe(false);
    expect(isFailure(price)).toBe(false);
    if (isFailure(costs) || isFailure(price)) {
      return;
    }
    const result = evaluatePriceUseCase.execute({
      currency: 'NIO',
      costs: costs.costs,
      knownPrice: price,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.status).toBe('LOSS');
    }
  });

  it('REQ-003: vacíos omitidos y 2x10 + materiales 30 + transporte 5', () => {
    const time = optionalHoursAndRate('2', '10', 'NIO');
    expect(isFailure(time)).toBe(false);
    if (isFailure(time)) {
      return;
    }
    const target = requiredMoney('15', 'NIO', 'falta objetivo');
    const materials = requiredMoney('30', 'NIO', 'materiales');
    const transport = requiredMoney('5', 'NIO', 'transporte');
    if (isFailure(target) || isFailure(materials) || isFailure(transport)) {
      return;
    }
    const result = estimateWorkUseCase.execute({
      currency: 'NIO',
      materials,
      transport,
      hours: time.hours,
      hourlyRate: time.hourlyRate,
      targetProfit: target,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.cost.amountMinor).toBe(5500);
      expect(result.price.amountMinor).toBe(7000);
    }
  });

  it('campo vacío no se convierte en cero; "0" sí es cero', () => {
    const empty = collectCostLines([{ id: 'a', amount: '   ' }], 'NIO');
    const zero = collectCostLines([{ id: 'a', amount: '0' }], 'NIO');
    expect(isFailure(empty)).toBe(false);
    expect(isFailure(zero)).toBe(false);
    if (!isFailure(empty) && !isFailure(zero)) {
      expect(empty.costs).toHaveLength(0);
      expect(zero.costs[0]?.amount.amountMinor).toBe(0);
    }
  });
});
