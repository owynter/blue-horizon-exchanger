
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CurrencyInput from './CurrencyInput';
import { TargetCurrency, Currency } from '@/data/CurrencyData';

interface SortableCurrencyInputProps {
  targetCurrency: TargetCurrency;
  baseAmount: string;
  baseCurrency: string;
  onCurrencyChange: (id: string, newCode: string) => void;
  onRemove: (id: string) => void;
  currencies: Currency[];
  calculateConversion: (amount: string, from: string, to: string) => string;
}

const SortableCurrencyInput: React.FC<SortableCurrencyInputProps> = ({
  targetCurrency,
  baseAmount,
  baseCurrency,
  onCurrencyChange,
  onRemove,
  currencies,
  calculateConversion
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: targetCurrency.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <CurrencyInput
        amount={calculateConversion(baseAmount, baseCurrency, targetCurrency.code)}
        currency={targetCurrency.code}
        onCurrencyChange={(newCode) => onCurrencyChange(targetCurrency.id, newCode)}
        onRemove={() => onRemove(targetCurrency.id)}
        currencies={currencies}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};

export default SortableCurrencyInput;
