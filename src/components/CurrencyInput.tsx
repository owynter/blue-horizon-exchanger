import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { X, GripVertical } from 'lucide-react';
import { formatNumberWithCommas, removeCommas } from '@/lib/numberUtils';

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
  const handleAmountChange = (value: string) => {
    // Remove commas for processing, but keep the raw number
    const cleanValue = removeCommas(value);
    onAmountChange?.(cleanValue);
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
            type="text"
            value={displayAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0.00"
            className="text-stone-950 font-inter font-semibold py-0 px-4 flex-1 border-0 rounded-none focus:ring-0 focus:border-0 h-full"
            style={{ fontSize: '1.25rem' }}
          />
          
          <div className="relative h-full flex items-center flex-1">
            <Select value={currency} onValueChange={onCurrencyChange}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SelectTrigger className="w-full h-full border-0 rounded-none bg-transparent border-l border-blue-200 flex items-center gap-2 px-4">
                    <SelectValue>
                      <div className="flex items-center gap-3">
                        <span style={{ fontSize: '1.5rem' }}>{currencies.find(c => c.code === currency)?.flag}</span>
                        <span className="font-semibold text-stone-950 font-sora" style={{ fontSize: '1.125rem' }}>{currency}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isBase ? 'Select your base currency' : 'Change currency'}</p>
                </TooltipContent>
              </Tooltip>
              <SelectContent className="bg-white border-blue-200 shadow-xl z-50 min-w-[300px]">
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code} className="hover:bg-blue-50">
                    <div className="flex items-center gap-3 w-full">
                      <span style={{ fontSize: '1.5rem' }}>{curr.flag}</span>
                      <span className="font-medium font-sora" style={{ fontSize: '1rem' }}>{curr.name} ({curr.code})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
