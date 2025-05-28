
import { useRef } from 'react';

interface UseCurrencyInputProps {
  amount: string;
  showDecimals: boolean;
  onAmountChange?: (amount: string) => void;
}

export const useCurrencyInput = ({ amount, showDecimals, onAmountChange }: UseCurrencyInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAmountChange = (value: string) => {
    console.log('handleAmountChange called with:', value);
    
    // Allow empty input
    if (value === '') {
      onAmountChange?.('');
      return;
    }
    
    // Simple validation: only digits and decimal point
    if (showDecimals) {
      // Allow digits, one decimal point, and at most 2 decimal places
      if (!/^\d*\.?\d{0,2}$/.test(value)) {
        console.log('Invalid decimal format, rejecting');
        return;
      }
    } else {
      // Only allow digits for whole numbers
      if (!/^\d*$/.test(value)) {
        console.log('Invalid whole number format, rejecting');
        return;
      }
    }
    
    console.log('Accepting input:', value);
    onAmountChange?.(value);
  };

  return {
    inputRef,
    handleAmountChange
  };
};
