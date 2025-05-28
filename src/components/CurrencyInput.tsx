
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, GripVertical } from 'lucide-react';

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
  return (
    <div className="text-sm mb-6">
      {!isBase && (
        <div className="flex items-center gap-2 mb-2">
          <div {...dragHandleProps} className="cursor-move text-blue-400 hover:text-blue-600">
            <GripVertical size={16} />
          </div>
          <label className="inline-block max-w-full text-blue-900 font-medium">
            {isBase ? 'Amount' : 'Converted to'}
          </label>
          {!isBase && onRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-auto p-1 h-auto"
            >
              <X size={14} />
            </Button>
          )}
        </div>
      )}
      
      {isBase && (
        <label className="inline-block max-w-full text-blue-900 font-medium mb-2">
          Amount
        </label>
      )}
      
      <div className="flex w-full rounded-xl border border-blue-200 overflow-hidden">
        <Input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange?.(e.target.value)}
          placeholder="0.00"
          className="text-stone-950 text-xl font-semibold py-3 px-4 flex-1 border-0 rounded-none focus:ring-0 focus:border-0"
          readOnly={!isBase}
        />
        
        <div className="relative">
          <Select value={currency} onValueChange={onCurrencyChange}>
            <SelectTrigger className="w-32 h-16 border-0 rounded-none bg-transparent [&>svg]:hidden">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{currencies.find(c => c.code === currency)?.flag}</span>
                  <span className="font-semibold text-stone-950">{currency}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white border-blue-200 shadow-xl">
              {currencies.map((curr) => (
                <SelectItem key={curr.code} value={curr.code} className="hover:bg-blue-50">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{curr.flag}</span>
                    <span className="font-medium">{curr.code}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput;
