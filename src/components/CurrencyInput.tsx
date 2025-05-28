
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { X, GripVertical } from 'lucide-react';
import { formatNumberWithCommas, removeCommas } from '@/lib/numberUtils';
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
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount,
  currency,
  isBase = false,
  onAmountChange,
  onCurrencyChange,
  onRemove,
  currencies,
  dragHandleProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAmountChange = (value: string) => {
    // Store cursor position before formatting
    const input = inputRef.current;
    const cursorPosition = input?.selectionStart || 0;
    
    // Remove commas for processing
    const cleanValue = removeCommas(value);
    
    // Only allow numbers and decimal point
    if (!/^\d*\.?\d*$/.test(cleanValue)) return;
    
    onAmountChange?.(cleanValue);
    
    // Restore cursor position after formatting
    setTimeout(() => {
      if (input) {
        const newFormattedLength = formatNumberWithCommas(cleanValue).length;
        const oldFormattedLength = value.length;
        const lengthDiff = newFormattedLength - oldFormattedLength;
        const newPosition = Math.max(0, cursorPosition + lengthDiff);
        input.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  };

  const displayAmount = formatNumberWithCommas(amount);

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
              <p>Drag to reorder currencies</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {/* Main Input Container */}
        <div className="flex w-full rounded-xl border border-blue-200 overflow-hidden flex-1 h-full items-center">
          <Input
            ref={inputRef}
            type="text"
            value={displayAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0.00"
            className="text-stone-950 font-inter font-semibold py-0 px-4 flex-1 border-0 rounded-none focus:ring-0 focus:border-0 h-full"
            style={{ fontSize: '1.25rem' }}
          />
          
          <div className="relative h-full flex items-center w-32">
            <CurrencyDropdown
              availableCurrencies={currencies}
              onSelect={onCurrencyChange}
              selectedCurrency={currency}
              placeholder={isBase ? 'Select your base currency' : 'Change currency'}
              triggerClassName="w-full h-full border-0 rounded-none bg-transparent border-l border-blue-200 flex items-center gap-2 px-2 text-sm"
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
              <p>Remove this currency</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default CurrencyInput;
