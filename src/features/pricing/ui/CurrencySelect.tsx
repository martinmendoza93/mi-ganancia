import { Field, SelectInput } from '@/shared/ui/Field';
import { CURRENCY_OPTIONS } from '@/shared/config/currency';

export function CurrencySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field
      label="Moneda de este cálculo"
      hint="Tú eliges. Una sola moneda por cálculo, sin mezclar ni convertir."
    >
      <SelectInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Moneda de este cálculo"
      >
        {CURRENCY_OPTIONS.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </SelectInput>
    </Field>
  );
}
