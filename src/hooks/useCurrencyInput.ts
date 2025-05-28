import { useRef } from 'react';
import { removeCommas } from '@/lib/numberUtils';

interface UseCurrencyInputProps {
  amount: string;
  showDecimals: boolean;
  onAmountChange?: (amount: string) => void;
}

export const useCurrencyInput = ({ amount, showDecimals, onAmountChange }: UseCurrencyInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAmountChange = (value: string) => {
    console.log('handleAmountChange called with:', value);
    
    const input = inputRef.current;
    if (!input) return;
    
    // Get cursor position
    const cursorPosition = input.selectionStart || 0;
    const isAtEnd = cursorPosition === value.length;
    
    // Clean the values
    const oldCleanValue = removeCommas(amount);
    const newCleanValue = removeCommas(value);
    
    console.log('Old clean:', oldCleanValue, 'New clean:', newCleanValue);
    
    // Check for decimal shifting case: typing digits at the very end when we have exactly 2 decimal places
    if (showDecimals && isAtEnd && newCleanValue.length > oldCleanValue.length) {
      const addedChars = newCleanValue.slice(oldCleanValue.length);
      
      // Only apply decimal shifting if:
      // 1. We're adding digits (not other characters)
      // 2. The old value has exactly 2 decimal places
      // 3. We're typing at the very end
      if (/^\d+$/.test(addedChars) && oldCleanValue.includes('.')) {
        const parts = oldCleanValue.split('.');
        if (parts[1] && parts[1].length === 2) {
          // Apply decimal shifting
          const wholePart = parts[0];
          const decimalPart = parts[1];
          const allDigits = wholePart + decimalPart + addedChars;
          
          // Keep last 2 digits as decimals
          const newDecimalPart = allDigits.slice(-2);
          const newWholePart = allDigits.slice(0, -2) || '0';
          
          const shiftedResult = `${newWholePart}.${newDecimalPart}`;
          console.log('Decimal shifting applied:', oldCleanValue, '->', shiftedResult);
          
          onAmountChange?.(shiftedResult);
          return;
        }
      }
    }
    
    // Regular input validation
    const cleanValue = newCleanValue;
    
    // Allow empty input
    if (cleanValue === '') {
      onAmountChange?.('');
      return;
    }
    
    // Input validation
    if (showDecimals) {
      // Check for valid decimal format
      if (!/^\d*\.?\d*$/.test(cleanValue) || (cleanValue.match(/\./g) || []).length > 1) {
        console.log('Invalid decimal format, rejecting');
        return;
      }
      
      // Prevent more than 2 decimal places
      if (cleanValue.includes('.')) {
        const parts = cleanValue.split('.');
        if (parts[1] && parts[1].length > 2) {
          console.log('More than 2 decimal places, rejecting');
          return;
        }
      }
    } else {
      // Only allow digits for non-decimal mode
      if (!/^\d*$/.test(cleanValue)) {
        console.log('Invalid whole number format, rejecting');
        return;
      }
    }
    
    console.log('Accepting input:', cleanValue);
    onAmountChange?.(cleanValue);
  };

  return {
    inputRef,
    handleAmountChange
  };
};
