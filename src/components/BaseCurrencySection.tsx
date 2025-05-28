
import React from 'react';
import CurrencyInput from './CurrencyInput';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Currency } from '@/data/CurrencyData';

interface BaseCurrencySectionProps {
  baseAmount: string;
  baseCurrency: string;
  onAmountChange: (amount: string) => void;
  onCurrencyChange: (currency: string) => void;
  currencies: Currency[];
  showDecimals: boolean;
  onDecimalToggle: (checked: boolean) => void;
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
      <h3 className="text-lg font-semibold text-blue-900 mb-4 font-sora">Amount</h3>
      <CurrencyInput
        amount={baseAmount}
        currency={baseCurrency}
        isBase={true}
        onAmountChange={onAmountChange}
        onCurrencyChange={onCurrencyChange}
        currencies={currencies}
        showDecimals={showDecimals}
      />
      
      {/* Compact Decimal Toggle */}
      <div className="flex items-center gap-3 py-2">
        <span className="text-sm font-semibold text-blue-900 font-sora">Show decimals</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Switch
              checked={showDecimals}
              onCheckedChange={onDecimalToggle}
              className="data-[state=unchecked]:bg-blue-200 data-[state=checked]:bg-blue-600 h-1.5 w-3 [&>span]:h-1 [&>span]:w-1 [&>span]:data-[state=checked]:translate-x-1.5 [&>span]:bg-white [&>span]:border-blue-300 [&>span]:border"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle to show whole numbers only</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default BaseCurrencySection;
