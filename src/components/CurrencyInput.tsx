
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { X, GripVertical } from 'lucide-react';
import { formatInputNumber, removeCommas, calculateCursorPosition, formatNumberWithDecimals } from '@/lib/numberUtils';
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

  const handleAmountChange = (value: string) => {
    const input = inputRef.current;
    if (!input) return;
    
    const cursorPosition = input.selectionStart || 0;
    const isAtEnd = cursorPosition === value.length;
    
    // Remove commas for processing
    const cleanValue = removeCommas(value);
    
    // Allow empty input
    if (cleanValue === '') {
      onAmountChange?.('');
      return;
    }
    
    // Input validation based on decimal setting
    if (showDecimals) {
      // Allow numbers and one decimal point
      if (!/^\d*\.?\d*$/.test(cleanValue)) return;
      if ((cleanValue.match(/\./g) || []).length > 1) return;
    } else {
      // Allow only whole numbers (no decimal point)
      if (!/^\d+$/.test(cleanValue)) return;
    }
    
    onAmountChange?.(cleanValue);
    
    // Handle cursor positioning after formatting
    setTimeout(() => {
      if (input && document.activeElement === input) {
        const formattedValue = formatInputNumber(cleanValue, isAtEnd, showDecimals);
        const newPosition = calculateCursorPosition(value, formattedValue, cursorPosition);
        input.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  };

  // Format the display value based on focus state and decimal setting
  const getDisplayValue = () => {
    if (!amount) return '';
    const input = inputRef.current;
    const isFocused = input && document.activeElement === input;
    const isAtEnd = isFocused && input.selectionStart === input.value.length;
    
    // When focused, use input-friendly formatting
    if (isFocused) {
      return formatInputNumber(amount, isAtEnd, showDecimals);
    } else {
      // When not focused, use display formatting
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
