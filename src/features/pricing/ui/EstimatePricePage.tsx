import { estimatePriceUseCase } from '@/app/providers/pricing';
import { isFailure, type PricingResult } from '@/features/pricing/domain';
import { DEFAULT_CURRENCY } from '@/shared/config/currency';
import { Field, TextInput } from '@/shared/ui/Field';
import { PageShell } from '@/shared/ui/PageShell';
import { useMemo, useState } from 'react';
import { CostRows, type CostRow } from './CostRows';
import { CurrencySelect } from './CurrencySelect';
import { collectCostLines, requiredMoney } from './form-mapping';
import { ResultPanel } from './ResultPanel';

function newRow(): CostRow {
  return { id: crypto.randomUUID(), amount: '' };
}

export function EstimatePricePage() {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [rows, setRows] = useState<CostRow[]>([newRow()]);
  const [target, setTarget] = useState('');

  const result: PricingResult | undefined = useMemo(() => {
    const costsOrError = collectCostLines(rows, currency);
    if (isFailure(costsOrError)) {
      const hasAnyInput = rows.some((row) => row.amount.trim() !== '') || target.trim() !== '';
      return hasAnyInput ? costsOrError : undefined;
    }

    if (target.trim() === '' && rows.every((row) => row.amount.trim() === '')) {
      return undefined;
    }

    const targetMoney = requiredMoney(
      target,
      currency,
      'Indica lo que quieres que te quede, en dinero. Un campo vacío no es cero.',
    );
    if (isFailure(targetMoney)) {
      return target.trim() === '' ? undefined : targetMoney;
    }

    return estimatePriceUseCase.execute({
      currency,
      costs: costsOrError.costs,
      targetProfit: targetMoney,
    });
  }, [currency, rows, target]);

  return (
    <PageShell title="¿Cuánto cobro?">
      <p className="lede">
        Elige la moneda, lo que te costó y lo que quieres que te quede. El objetivo es un monto, no un
        porcentaje.
      </p>
      <form className="stack" onSubmit={(event) => event.preventDefault()}>
        <CurrencySelect value={currency} onChange={setCurrency} />
        <CostRows
          label="Lo que te costó"
          rows={rows}
          onChange={(id, amount) =>
            setRows((current) => current.map((row) => (row.id === id ? { ...row, amount } : row)))
          }
          onAdd={() => setRows((current) => [...current, newRow()])}
          onRemove={(id) => setRows((current) => current.filter((row) => row.id !== id))}
        />
        <Field
          label="Lo que quieres que te quede"
          hint="Es un monto, no un porcentaje. Así no se confunde margen con markup."
        >
          <TextInput
            inputMode="decimal"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            placeholder="400"
          />
        </Field>
      </form>
      {result ? (
        <ResultPanel result={result} />
      ) : (
        <p className="hint">El resultado aparece cuando indicas lo que quieres que te quede.</p>
      )}
    </PageShell>
  );
}
