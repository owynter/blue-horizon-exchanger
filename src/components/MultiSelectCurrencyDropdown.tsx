
import React from 'react';
import CurrencyDropdown from './CurrencyDropdown';
import { Currency } from '@/data/CurrencyData';

interface MultiSelectCurrencyDropdownProps {
  availableCurrencies: Currency[];
  onAddCurrencies: (currencyCode: string) => void; // Changed from string[] to string
}

const MultiSelectCurrencyDropdown: React.FC<MultiSelectCurrencyDropdownProps> = ({
  availableCurrencies,
  onAddCurrencies
}) => {
  if (availableCurrencies.length === 0) return null;

  return (
    <div className="pt-6 border-t border-blue-200">
      <CurrencyDropdown
        availableCurrencies={availableCurrencies}
        onAddMultiple={onAddCurrencies}
        multiSelect={true}
        placeholder="Select currencies to add"
      />
    </div>
  );
};

export default MultiSelectCurrencyDropdown;
