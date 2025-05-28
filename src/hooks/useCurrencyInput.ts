import { useRef } from 'react';
import { removeCommas } from '@/lib/numberUtils';

interface UseCurrencyInputProps {
  amount: string;
  showDecimals: boolean;
  onAmountChange?: (amount: string) => void;
}

export const useCurrencyInput = ({ amount, showDecimals, onAmountChange }: UseCurrencyInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced smart number building for decimal shifting
  const buildSmartNumber = (currentValue: string, newInput: string): string | null => {
    if (!showDecimals) return null;
    
    const cleanCurrent = removeCommas(currentValue);
    
    // Only do smart building if we're adding digits to a decimal value at the end
    if (cleanCurrent.includes('.') && /^\d+$/.test(newInput)) {
      const parts = cleanCurrent.split('.');
      const wholePart = parts[0];
      const decimalPart = parts[1] || '';
      
      // Handle any number with exactly 2 decimal places
      if (decimalPart.length === 2) {
        // Combine all digits: whole part + decimal part + new input
        const allDigits = wholePart + decimalPart + newInput;
        
        // Split to keep last 2 digits as decimals
        const newDecimalPart = allDigits.slice(-2);
        const newWholePart = allDigits.slice(0, -2) || '0';
        
        const result = `${newWholePart}.${newDecimalPart}`;
        console.log('Decimal shifting:', cleanCurrent, '+', newInput, '->', result);
        return result;
      }
      
      // For "0.00" + new digits, shift left and add new digit (existing behavior)
      if (wholePart === '0' && decimalPart.length === 2) {
        const newDigits = newInput;
        const allDigits = decimalPart + newDigits;
        const newWhole = allDigits.slice(0, -2) || '0';
        const newDecimals = allDigits.slice(-2);
        return `${newWhole}.${newDecimals}`;
      }
    }
    
    return null;
  };

  const handleAmountChange = (value: string) => {
    console.log('useCurrencyInput handleAmountChange raw input:', value);
    
    const input = inputRef.current;
    if (!input) return;
    
    const oldValue = input.value;
    
    // Check if this is smart number building scenario
    if (value.length > oldValue.length) {
      const addedChars = value.slice(oldValue.length);
      const smartResult = buildSmartNumber(oldValue, addedChars);
      if (smartResult) {
        console.log('Smart number building result:', smartResult);
        onAmountChange?.(removeCommas(smartResult));
        return;
      }
    }
    
    // Remove commas for processing
    const cleanValue = removeCommas(value);
    console.log('useCurrencyInput handleAmountChange cleaned value:', cleanValue);
    
    // Allow empty input
    if (cleanValue === '') {
      onAmountChange?.('');
      return;
    }
    
    // Input validation
    if (showDecimals) {
      if (!/^\d*\.?\d*$/.test(cleanValue) || (cleanValue.match(/\./g) || []).length > 1) {
        return;
      }
    } else {
      if (!/^\d*$/.test(cleanValue)) {
        return;
      }
    }
    
    console.log('useCurrencyInput handleAmountChange: calling onAmountChange with:', cleanValue);
    onAmountChange?.(cleanValue);
  };

  return {
    inputRef,
    handleAmountChange
  };
};
