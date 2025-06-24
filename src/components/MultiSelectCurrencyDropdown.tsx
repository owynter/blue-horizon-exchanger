import React from 'react';
import EnhancedCurrencyDropdown from './EnhancedCurrencyDropdown';
import { Currency } from '@/data/AllCurrencies';

interface MultiSelectCurrencyDropdownProps {
  availableCurrencies: Currency[];
  onAddCurrencies: (currencyCode: string) => void;
}

const MultiSelectCurrencyDropdown: React.FC<MultiSelectCurrencyDropdownProps> = ({
  availableCurrencies,
  onAddCurrencies
}) => {
  if (availableCurrencies.length === 0) return null;

  return (
    <div className="pt-6 border-t border-blue-200">
      <EnhancedCurrencyDropdown
        availableCurrencies={availableCurrencies}
        onAddMultiple={onAddCurrencies}
        multiSelect={true}
        placeholder="Select currencies to add"
      />
    </div>
  );
};

export default MultiSelectCurrencyDropdown;
