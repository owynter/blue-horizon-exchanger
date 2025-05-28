
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
  const buildSmartNumber = (currentValue: string, newInput: string, cursorPos: number): { result: string | null, newCursorPos?: number } => {
    if (!showDecimals) return { result: null };
    
    const cleanCurrent = removeCommas(currentValue);
    console.log('buildSmartNumber called with:', cleanCurrent, 'new input:', newInput, 'cursor pos:', cursorPos);
    
    // Only do smart building if we're adding digits to a decimal value
    if (cleanCurrent.includes('.') && /^\d+$/.test(newInput)) {
      const parts = cleanCurrent.split('.');
      const wholePart = parts[0];
      const decimalPart = parts[1] || '';
      
      // Find the decimal point position in the formatted value
      const formattedValue = currentValue;
      const decimalPointPos = formattedValue.indexOf('.');
      
      console.log('Decimal point position:', decimalPointPos, 'Cursor position:', cursorPos);
      
      // Check if cursor is in the decimal area (after decimal point)
      if (cursorPos > decimalPointPos && decimalPart.length === 2) {
        // Combine all digits: whole part + decimal part + new input
        const allDigits = wholePart + decimalPart + newInput;
        
        // Split to keep last 2 digits as decimals
        const newDecimalPart = allDigits.slice(-2);
        const newWholePart = allDigits.slice(0, -2) || '0';
        
        const result = `${newWholePart}.${newDecimalPart}`;
        console.log('Decimal shifting:', cleanCurrent, '+', newInput, '->', result);
        
        // Calculate new cursor position (should stay at end of input)
        const newCursorPos = result.length;
        
        return { result, newCursorPos };
      }
      
      // Handle typing at the very end with 2 decimal places
      if (cursorPos >= formattedValue.length && decimalPart.length === 2) {
        const allDigits = wholePart + decimalPart + newInput;
        const newDecimalPart = allDigits.slice(-2);
        const newWholePart = allDigits.slice(0, -2) || '0';
        const result = `${newWholePart}.${newDecimalPart}`;
        
        return { result, newCursorPos: result.length };
      }
    }
    
    return { result: null };
  };

  const handleAmountChange = (value: string) => {
    console.log('useCurrencyInput handleAmountChange raw input:', value);
    
    const input = inputRef.current;
    if (!input) return;
    
    // Get cursor position before processing
    const cursorPosition = input.selectionStart || 0;
    const isAtEnd = cursorPosition === value.length;
    
    console.log('Cursor position:', cursorPosition, 'Value length:', value.length, 'Is at end:', isAtEnd);
    
    // Clean the old and new values to compare them properly
    const oldCleanValue = removeCommas(amount);
    const newCleanValue = removeCommas(value);
    
    console.log('Comparing clean values - old:', oldCleanValue, 'new:', newCleanValue);
    
    // Check if this is smart number building scenario (adding digits)
    if (newCleanValue.length > oldCleanValue.length) {
      const addedChars = newCleanValue.slice(oldCleanValue.length);
      console.log('Added chars:', addedChars);
      
      const smartResult = buildSmartNumber(amount, addedChars, cursorPosition);
      if (smartResult.result) {
        console.log('Smart number building result:', smartResult.result);
        onAmountChange?.(smartResult.result);
        
        // Set cursor position after the state update
        setTimeout(() => {
          if (input && smartResult.newCursorPos !== undefined) {
            input.setSelectionRange(smartResult.newCursorPos, smartResult.newCursorPos);
          }
        }, 0);
        return;
      }
    }
    
    // Remove commas for processing
    const cleanValue = newCleanValue;
    console.log('useCurrencyInput handleAmountChange cleaned value:', cleanValue);
    
    // Allow empty input
    if (cleanValue === '') {
      onAmountChange?.('');
      return;
    }
    
    // Input validation
    if (showDecimals) {
      // Prevent more than 2 decimal places
      if (cleanValue.includes('.')) {
        const parts = cleanValue.split('.');
        if (parts[1] && parts[1].length > 2) {
          console.log('Preventing more than 2 decimal places');
          return;
        }
      }
      
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
