import { estimateWorkUseCase } from '@/app/providers/pricing';
import { isFailure, type PricingResult } from '@/features/pricing/domain';
import { DEFAULT_CURRENCY } from '@/shared/config/currency';
import { Field, TextInput } from '@/shared/ui/Field';
import { PageShell } from '@/shared/ui/PageShell';
import { parseMajorAmount } from '@/shared/utils/parse-amount';
import { useMemo, useState } from 'react';
import { CurrencySelect } from './CurrencySelect';
import { moneyFromParsed, optionalHoursAndRate, requiredMoney } from './form-mapping';
import { ResultPanel } from './ResultPanel';

export function EstimateWorkPage() {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [materials, setMaterials] = useState('');
  const [transport, setTransport] = useState('');
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [target, setTarget] = useState('');

  const result: PricingResult | undefined = useMemo(() => {
    const filled =
      materials.trim() !== '' ||
      transport.trim() !== '' ||
      hours.trim() !== '' ||
      rate.trim() !== '' ||
      target.trim() !== '';
    if (!filled) {
      return undefined;
    }

    const materialsMoney = moneyFromParsed(parseMajorAmount(materials), currency);
    if (materialsMoney && isFailure(materialsMoney)) {
      return materialsMoney;
    }
    const transportMoney = moneyFromParsed(parseMajorAmount(transport), currency);
    if (transportMoney && isFailure(transportMoney)) {
      return transportMoney;
    }
    const time = optionalHoursAndRate(hours, rate, currency);
    if (isFailure(time)) {
      return time;
    }

    if (target.trim() === '') {
      return undefined;
    }
    const targetMoney = requiredMoney(
      target,
      currency,
      'Indica lo que quieres que te quede además de cubrir materiales, tiempo y transporte.',
    );
    if (isFailure(targetMoney)) {
      return targetMoney;
    }

    return estimateWorkUseCase.execute({
      currency,
      materials: isFailure(materialsMoney) ? undefined : materialsMoney,
      transport: isFailure(transportMoney) ? undefined : transportMoney,
      hours: time.hours,
      hourlyRate: time.hourlyRate,
      targetProfit: targetMoney,
    });
  }, [currency, materials, transport, hours, rate, target]);

  return (
    <PageShell title="¿Cuánto sale este trabajo?">
      <p className="lede">
        Elige la moneda. Materiales, tiempo y transporte se suman una sola vez. La tarifa por hora es el
        costo de tu tiempo; lo que quieres que te quede va aparte.
      </p>
      <form className="stack" onSubmit={(event) => event.preventDefault()}>
        <CurrencySelect value={currency} onChange={setCurrency} />
        <div className="row two">
          <Field label="Materiales" hint="Opcional. Vacío = no aplica.">
            <TextInput inputMode="decimal" value={materials} onChange={(event) => setMaterials(event.target.value)} />
          </Field>
          <Field label="Transporte" hint="Opcional. Vacío = no aplica.">
            <TextInput inputMode="decimal" value={transport} onChange={(event) => setTransport(event.target.value)} />
          </Field>
        </div>
        <div className="row two">
          <Field label="Horas de trabajo" hint="Opcional, junto con la tarifa.">
            <TextInput inputMode="decimal" value={hours} onChange={(event) => setHours(event.target.value)} />
          </Field>
          <Field label="Valor de tu hora" hint="Costo o compensación del tiempo, no la ganancia.">
            <TextInput inputMode="decimal" value={rate} onChange={(event) => setRate(event.target.value)} />
          </Field>
        </div>
        <Field label="Lo que quieres que te quede" hint="Es un monto, además de cubrir materiales, tiempo y transporte.">
          <TextInput inputMode="decimal" value={target} onChange={(event) => setTarget(event.target.value)} />
        </Field>
      </form>
      {result ? (
        <ResultPanel result={result} />
      ) : (
        <p className="hint">Completa lo que quieres que te quede para ver el precio sugerido.</p>
      )}
    </PageShell>
  );
}
