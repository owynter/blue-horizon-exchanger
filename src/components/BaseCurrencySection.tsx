
import React from 'react';
import CurrencyInput from './CurrencyInput';
import { Currency } from '@/data/CurrencyData';

interface BaseCurrencySectionProps {
  baseAmount: string;
  baseCurrency: string;
  onAmountChange: (amount: string) => void;
  onCurrencyChange: (currency: string) => void;
  currencies: Currency[];
  showDecimals: boolean;
}

const BaseCurrencySection: React.FC<BaseCurrencySectionProps> = ({
  baseAmount,
  baseCurrency,
  onAmountChange,
  onCurrencyChange,
  currencies,
  showDecimals
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
    </div>
  );
};

export default BaseCurrencySection;
