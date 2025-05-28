
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
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
      {!isBase && (
        <div {...dragHandleProps} className="cursor-move text-blue-400 hover:text-blue-600">
          <GripVertical size={20} />
        </div>
      )}
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-blue-900 mb-2">
          {isBase ? 'Amount' : 'Converted to'}
        </label>
        <div className="flex gap-3">
          <Input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange?.(e.target.value)}
            placeholder="0.00"
            className="flex-1 text-lg font-semibold border-blue-200 focus:border-blue-500 focus:ring-blue-500"
            readOnly={!isBase}
          />
          
          <Select value={currency} onValueChange={onCurrencyChange}>
            <SelectTrigger className="w-32 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue />
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
      
      {!isBase && onRemove && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <X size={16} />
        </Button>
      )}
    </div>
  );
};

export default CurrencyInput;
