
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CurrencyInput from './CurrencyInput';
import { TargetCurrency, Currency } from '@/data/CurrencyData';

interface SortableCurrencyInputProps {
  targetCurrency: TargetCurrency;
  displayAmount: string;
  onAmountChange: (id: string, amount: string) => void;
  onCurrencyChange: (id: string, newCode: string) => void;
  onRemove: (id: string) => void;
  currencies: Currency[];
  showDecimals: boolean;
}

const SortableCurrencyInput: React.FC<SortableCurrencyInputProps> = ({
  targetCurrency,
  displayAmount,
  onAmountChange,
  onCurrencyChange,
  onRemove,
  currencies,
  showDecimals
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
        amount={displayAmount}
        currency={targetCurrency.code}
        onAmountChange={(amount) => onAmountChange(targetCurrency.id, amount)}
        onCurrencyChange={(newCode) => onCurrencyChange(targetCurrency.id, newCode)}
        onRemove={() => onRemove(targetCurrency.id)}
        currencies={currencies}
        dragHandleProps={{ ...attributes, ...listeners }}
        showDecimals={showDecimals}
      />
    </div>
  );
};

export default SortableCurrencyInput;
