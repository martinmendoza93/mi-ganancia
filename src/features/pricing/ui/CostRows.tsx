import { Field, TextInput } from '@/shared/ui/Field';

export interface CostRow {
  id: string;
  amount: string;
}

export function CostRows({
  rows,
  onChange,
  onAdd,
  onRemove,
  label,
}: {
  rows: CostRow[];
  onChange: (id: string, amount: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  label: string;
}) {
  return (
    <div className="stack">
      <div className="cost-list">
        {rows.map((row, index) => (
          <div className="cost-item" key={row.id}>
            <Field
              label={index === 0 ? label : `Otro gasto ${index}`}
              hint={
                index === 0
                  ? 'Si no hay extras, déjalo vacío. Cero es un costo de 0, no un campo olvidado.'
                  : undefined
              }
            >
              <TextInput
                inputMode="decimal"
                value={row.amount}
                onChange={(event) => onChange(row.id, event.target.value)}
                placeholder={index === 0 ? '800' : ''}
              />
            </Field>
            {rows.length > 1 ? (
              <button type="button" className="ghost" onClick={() => onRemove(row.id)}>
                Quitar
              </button>
            ) : null}
          </div>
        ))}
      </div>
      <button type="button" className="ghost" onClick={onAdd}>
        Añadir otro gasto
      </button>
    </div>
  );
}
