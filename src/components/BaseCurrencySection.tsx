import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Currency } from '@/data/AllCurrencies';
import CurrencyInput from './CurrencyInput';

interface BaseCurrencySectionProps {
  baseAmount: string;
  baseCurrency: string;
  onAmountChange: (amount: string) => void;
  onCurrencyChange: (currency: string) => void;
  currencies: Currency[];
  showDecimals: boolean;
  onDecimalToggle: (show: boolean) => void;
}

const BaseCurrencySection: React.FC<BaseCurrencySectionProps> = ({
  baseAmount,
  baseCurrency,
  onAmountChange,
  onCurrencyChange,
  currencies,
  showDecimals,
  onDecimalToggle
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-blue-900 font-sora">
          Base Currency
        </label>
        <CurrencyInput
          amount={baseAmount}
          currency={baseCurrency}
          isBase={true}
          onAmountChange={onAmountChange}
          onCurrencyChange={onCurrencyChange}
          currencies={currencies}
          showDecimals={showDecimals}
        />
      </div>
    
      <Separator className="bg-blue-200" />
      
      <div className="flex items-center space-x-2">
        <Switch
          id="decimal-toggle"
          checked={showDecimals}
          onCheckedChange={onDecimalToggle}
        />
        <Label htmlFor="decimal-toggle" className="text-sm text-gray-600 font-inter">
          Show decimal places
        </Label>
      </div>
    </div>
  );
};

export default BaseCurrencySection;
