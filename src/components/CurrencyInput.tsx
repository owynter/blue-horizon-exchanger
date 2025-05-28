
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { X, GripVertical } from 'lucide-react';
import { formatNumberWithCommas, removeCommas, formatNumberWithDecimals } from '@/lib/numberUtils';
import CurrencyDropdown from './CurrencyDropdown';

interface CurrencyInputProps {
  amount: string;
  currency: string;
  isBase?: boolean;
  onAmountChange?: (amount: string) => void;
  onCurrencyChange: (currency: string) => void;
  onRemove?: () => void;
  currencies: Array<{ code: string; name: string; symbol: string; flag: string }>;
  dragHandleProps?: any;
  showDecimals: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount,
  currency,
  isBase = false,
  onAmountChange,
  onCurrencyChange,
  onRemove,
  currencies,
  dragHandleProps,
  showDecimals
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Smart number building function
  const buildSmartNumber = (currentValue: string, newDigit: string, cursorPosition: number): string => {
    const cleanCurrent = removeCommas(currentValue);
    
    // If we're at the end and have a decimal value like "0.00", build number intelligently
    if (cursorPosition === currentValue.length && cleanCurrent.includes('.')) {
      const parts = cleanCurrent.split('.');
      const wholePart = parts[0];
      const decimalPart = parts[1] || '';
      
      // If typing at the end of "0.00", shift digits left and add new digit
      if (wholePart === '0' && decimalPart.length === 2) {
        const allDigits = decimalPart + newDigit;
        const newWhole = allDigits.slice(0, -2) || '0';
        const newDecimals = allDigits.slice(-2);
        return `${newWhole}.${newDecimals}`;
      }
    }
    
    return null; // Use normal input handling
  };

  const handleAmountChange = (value: string) => {
    const input = inputRef.current;
    if (!input) return;
    
    console.log('CurrencyInput handleAmountChange raw input:', value);
    
    const cursorPosition = input.selectionStart || 0;
    const oldValue = input.value;
    const isAtEnd = cursorPosition === value.length;
    
    // Check if this is a single character addition at the end
    const isSingleDigitAtEnd = value.length === oldValue.length + 1 && 
                               isAtEnd && 
                               /\d/.test(value.slice(-1));
    
    // Try smart number building for single digit additions at the end
    if (isSingleDigitAtEnd && showDecimals) {
      const newDigit = value.slice(-1);
      const smartResult = buildSmartNumber(oldValue, newDigit, cursorPosition);
      if (smartResult) {
        const cleanResult = removeCommas(smartResult);
        console.log('Smart number building result:', cleanResult);
        onAmountChange?.(cleanResult);
        return;
      }
    }
    
    // Remove commas for processing
    const cleanValue = removeCommas(value);
    console.log('CurrencyInput handleAmountChange cleaned value:', cleanValue);
    
    // Allow empty input
    if (cleanValue === '') {
      console.log('CurrencyInput handleAmountChange: empty input, calling onAmountChange with empty string');
      onAmountChange?.('');
      return;
    }
    
    // Input validation based on decimal setting
    if (showDecimals) {
      // Allow numbers and one decimal point
      if (!/^\d*\.?\d*$/.test(cleanValue)) {
        console.log('CurrencyInput handleAmountChange: invalid input for decimals mode');
        return;
      }
      if ((cleanValue.match(/\./g) || []).length > 1) {
        console.log('CurrencyInput handleAmountChange: multiple decimal points');
        return;
      }
    } else {
      // Allow only whole numbers (no decimal point)
      if (!/^\d+$/.test(cleanValue)) {
        console.log('CurrencyInput handleAmountChange: invalid input for no decimals mode');
        return;
      }
    }
    
    console.log('CurrencyInput handleAmountChange: calling onAmountChange with:', cleanValue);
    onAmountChange?.(cleanValue);
    
    // Improved cursor positioning after formatting
    setTimeout(() => {
      if (input && document.activeElement === input) {
        // For focused input, maintain cursor at the end if user was typing there
        if (isAtEnd) {
          input.setSelectionRange(input.value.length, input.value.length);
        } else {
          // For other positions, try to maintain relative position
          const newFormattedValue = getDisplayValue();
          const newLength = newFormattedValue.length;
          const oldLength = oldValue.length;
          const lengthDiff = newLength - oldLength;
          const newPosition = Math.max(0, Math.min(newLength, cursorPosition + lengthDiff));
          input.setSelectionRange(newPosition, newPosition);
        }
      }
    }, 0);
  };

  // Format the display value based on focus state and decimal setting
  const getDisplayValue = () => {
    console.log('CurrencyInput getDisplayValue called with amount:', amount);
    
    if (!amount) return '';
    const input = inputRef.current;
    const isFocused = input && document.activeElement === input;
    
    // When focused, use simpler formatting to avoid cursor jumps
    if (isFocused) {
      const numValue = parseFloat(removeCommas(amount));
      if (isNaN(numValue)) return '';
      
      // For focused state, be less aggressive with formatting
      if (showDecimals) {
        // If the raw amount already has a decimal, preserve it
        if (amount.includes('.')) {
          const result = formatNumberWithCommas(amount);
          console.log('CurrencyInput getDisplayValue (focused, has decimal):', result);
          return result;
        } else {
          // If no decimal in raw amount, don't force one during typing
          const result = formatNumberWithCommas(numValue.toString());
          console.log('CurrencyInput getDisplayValue (focused, no decimal):', result);
          return result;
        }
      } else {
        const result = formatNumberWithCommas(Math.floor(numValue).toString());
        console.log('CurrencyInput getDisplayValue (focused, no decimals):', result);
        return result;
      }
    } else {
      // When not focused, use full display formatting
      const result = formatNumberWithDecimals(amount, showDecimals);
      console.log('CurrencyInput getDisplayValue (not focused):', result);
      return result;
    }
  };

  return (
    <div className="text-sm mb-6">
      <div className="flex items-center gap-3 h-16">
        {/* Drag Handle - only for non-base currencies */}
        {!isBase && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div {...dragHandleProps} className="cursor-move text-blue-400 hover:text-blue-600 flex-shrink-0">
                <GripVertical size={20} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {/* Tooltip text - using Inter font for body text */}
              <p className="font-inter">Drag to reorder currencies</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {/* Main Input Container */}
        <div className="flex w-full rounded-xl border border-blue-200 overflow-hidden flex-1 h-full items-center">
          <Input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder={showDecimals ? "0.00" : "0"}
            className="text-stone-950 font-inter font-semibold py-0 px-4 flex-1 border-0 rounded-none focus:ring-0 focus:border-0 h-full"
            style={{ fontSize: '1.25rem' }}
          />
          
          <div className="relative h-full flex items-center">
            <CurrencyDropdown
              availableCurrencies={currencies}
              onSelect={onCurrencyChange}
              selectedCurrency={currency}
              placeholder={isBase ? 'Select your base currency' : 'Change currency'}
              triggerClassName="h-full border-0 rounded-none bg-transparent border-l border-blue-200 flex items-center gap-2 px-2 text-sm"
            />
          </div>
        </div>
        
        {/* Remove Button - only for non-base currencies */}
        {!isBase && onRemove && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 h-auto flex-shrink-0"
              >
                <X size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {/* Tooltip text - using Inter font for body text */}
              <p className="font-inter">Remove this currency</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default CurrencyInput;
