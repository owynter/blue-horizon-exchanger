
import { useRef, useState } from 'react';

interface UseCurrencyInputProps {
  amount: string;
  showDecimals: boolean;
  onAmountChange?: (amount: string) => void;
}

export const useCurrencyInput = ({ amount, showDecimals, onAmountChange }: UseCurrencyInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [originalValue, setOriginalValue] = useState('');

  const sanitizeInput = (value: string): string => {
    console.log('sanitizeInput called with:', value);
    
    // Remove commas first (in case it's a formatted number)
    let cleaned = value.replace(/,/g, '');
    console.log('After removing commas:', cleaned);
    
    // If showDecimals is false, remove any decimal points and everything after
    if (!showDecimals) {
      cleaned = cleaned.replace(/\..*/g, '');
      console.log('Removed decimals (showDecimals=false):', cleaned);
      return cleaned;
    }
    
    // For decimal mode, be more flexible during typing
    // Remove any non-digit, non-decimal characters
    cleaned = cleaned.replace(/[^\d.]/g, '');
    console.log('After removing non-numeric chars:', cleaned);
    
    // Handle multiple decimal points - keep only the first one
    const decimalParts = cleaned.split('.');
    if (decimalParts.length > 2) {
      cleaned = decimalParts[0] + '.' + decimalParts.slice(1).join('');
      console.log('After handling multiple decimals:', cleaned);
    }
    
    // Limit decimal places to 2, but only if there are more than 2
    if (cleaned.includes('.')) {
      const [wholePart, decimalPart] = cleaned.split('.');
      if (decimalPart && decimalPart.length > 2) {
        cleaned = wholePart + '.' + decimalPart.substring(0, 2);
        console.log('Limited decimal places to 2:', cleaned);
      }
    }
    
    return cleaned;
  };

  const handleFocus = () => {
    console.log('Input focused, storing original value:', amount);
    setIsFocused(true);
    setHasStartedTyping(false);
    setOriginalValue(amount);
  };

  const handleBlur = () => {
    console.log('Input blurred, hasStartedTyping:', hasStartedTyping);
    setIsFocused(false);
    
    // If user didn't type anything, restore original value
    if (!hasStartedTyping && originalValue !== amount) {
      console.log('No typing occurred, restoring original value:', originalValue);
      onAmountChange?.(originalValue);
    }
    
    setHasStartedTyping(false);
    setOriginalValue('');
  };

  const handleAmountChange = (value: string) => {
    console.log('handleAmountChange called with:', value);
    
    // Check if this is the first keystroke after focus
    if (isFocused && !hasStartedTyping && originalValue && value !== originalValue.replace(/,/g, '')) {
      console.log('First keystroke detected, checking if we should clear');
      
      // Get the input element to check selection
      const input = inputRef.current;
      const hasSelection = input && input.selectionStart !== input.selectionEnd;
      
      console.log('Has selection:', hasSelection);
      
      if (!hasSelection) {
        // No text is selected, this is a "clear and start fresh" action
        // Extract only the new character(s) that were typed
        const cleanOriginal = originalValue.replace(/,/g, '');
        
        // If the new value is longer and contains the original, extract just the new part
        if (value.length > cleanOriginal.length && value.includes(cleanOriginal)) {
          // Find what was added and use only that
          const newChar = value.replace(cleanOriginal, '');
          console.log('Extracted new character:', newChar);
          value = newChar;
        } else if (value.length <= cleanOriginal.length) {
          // This might be a backspace or similar, treat as new value
          console.log('Using value as-is (backspace or replacement):', value);
        }
      }
      
      setHasStartedTyping(true);
    } else if (isFocused && !hasStartedTyping) {
      // Mark that user has started typing for subsequent changes
      setHasStartedTyping(true);
    }
    
    // Allow empty input
    if (value === '') {
      console.log('Empty input, calling onAmountChange');
      onAmountChange?.('');
      return;
    }
    
    // Sanitize the input
    const sanitized = sanitizeInput(value);
    console.log('Sanitized result:', sanitized);
    
    // Always use the sanitized version
    onAmountChange?.(sanitized);
  };

  return {
    inputRef,
    handleAmountChange,
    handleFocus,
    handleBlur,
    isFocused,
    hasStartedTyping
  };
};
