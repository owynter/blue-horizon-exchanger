
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
      {/* Title - using Sora font for headings */}
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
      
      {/* Decimal Toggle */}
      <div className="flex items-center gap-3 py-2">
        {/* Label - using Sora font for interface labels */}
        <span className="text-sm font-semibold text-blue-900 font-sora">Show decimals</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Switch
              checked={showDecimals}
              onCheckedChange={onDecimalToggle}
            />
          </TooltipTrigger>
          <TooltipContent>
            {/* Tooltip text - using Inter font for body text */}
            <p className="font-inter">Toggle to show whole numbers only</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default BaseCurrencySection;
