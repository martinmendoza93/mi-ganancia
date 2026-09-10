import { evaluatePriceUseCase } from '@/app/providers/pricing';
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

export function EvaluatePricePage() {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [rows, setRows] = useState<CostRow[]>([newRow()]);
  const [price, setPrice] = useState('');

  const result: PricingResult | undefined = useMemo(() => {
    const costsOrError = collectCostLines(rows, currency);
    if (isFailure(costsOrError)) {
      const hasAnyInput = rows.some((row) => row.amount.trim() !== '') || price.trim() !== '';
      return hasAnyInput ? costsOrError : undefined;
    }

    if (price.trim() === '') {
      return undefined;
    }

    const knownPrice = requiredMoney(price, currency, 'Indica el precio que ya tienes pensado cobrar.');
    if (isFailure(knownPrice)) {
      return knownPrice;
    }

    return evaluatePriceUseCase.execute({
      currency,
      costs: costsOrError.costs,
      knownPrice,
    });
  }, [currency, rows, price]);

  return (
    <PageShell title="¿Este precio me deja algo?">
      <p className="lede">
        Elige la moneda y el precio que ya tienes. Te decimos si ganas, quedas tablas o pierdes, en esa misma
        moneda.
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
        <Field label="Precio que piensas cobrar">
          <TextInput
            inputMode="decimal"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="1200"
          />
        </Field>
      </form>
      {result ? (
        <ResultPanel result={result} />
      ) : (
        <p className="hint">Escribe el precio para ver si ganas, empatas o pierdes.</p>
      )}
    </PageShell>
  );
}
