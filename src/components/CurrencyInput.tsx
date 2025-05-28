
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

  // Smart number building for typing at the end
  const buildSmartNumber = (currentValue: string, newInput: string): string | null => {
    if (!showDecimals) return null;
    
    const cleanCurrent = removeCommas(currentValue);
    
    // Only do smart building if we're adding digits to a decimal value at the end
    if (cleanCurrent.includes('.') && /^\d+$/.test(newInput)) {
      const parts = cleanCurrent.split('.');
      const wholePart = parts[0];
      const decimalPart = parts[1] || '';
      
      // For "0.00" + new digits, shift left and add new digit
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
    console.log('CurrencyInput handleAmountChange raw input:', value);
    
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
    console.log('CurrencyInput handleAmountChange cleaned value:', cleanValue);
    
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
    
    console.log('CurrencyInput handleAmountChange: calling onAmountChange with:', cleanValue);
    onAmountChange?.(cleanValue);
  };

  // Simplified display value - minimal formatting while focused
  const getDisplayValue = () => {
    console.log('CurrencyInput getDisplayValue called with amount:', amount);
    
    if (!amount) return '';
    
    const input = inputRef.current;
    const isFocused = input && document.activeElement === input;
    
    if (isFocused) {
      // While focused, only add commas but preserve decimal structure
      return formatNumberWithCommas(amount);
    } else {
      // When not focused, use full formatting
      return formatNumberWithDecimals(amount, showDecimals);
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
              <p className="font-inter">Remove this currency</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default CurrencyInput;
