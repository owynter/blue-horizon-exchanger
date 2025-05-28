
import React from 'react';
import { Input } from '@/components/ui/input';
import { useCurrencyInput } from '@/hooks/useCurrencyInput';
import { formatNumberWithDecimals } from '@/lib/numberUtils';
import CurrencyInputControls from './CurrencyInputControls';
import CurrencyRemoveButton from './CurrencyRemoveButton';
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
  showDecimals: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount,
  currency,
  isBase = false,
  onAmountChange,
  onCurrencyChange,
  onRemove,
  currencies,
  dragHandleProps,
  showDecimals
}) => {
  const { 
    inputRef, 
    handleAmountChange, 
    handleFocus, 
    handleBlur, 
    isFocused, 
    hasStartedTyping 
  } = useCurrencyInput({
    amount,
    showDecimals,
    onAmountChange
  });

  // Get display value: raw value when focused, formatted when not focused
  const getDisplayValue = () => {
    if (isFocused) {
      // Show raw value while typing or when empty
      return amount.replace(/,/g, ''); // Remove commas for editing
    } else {
      // Format when not focused
      return formatNumberWithDecimals(amount, showDecimals);
    }
  };

  // Determine if text should be transparent
  const shouldBeTransparent = isFocused && !hasStartedTyping && amount;

  return (
    <div className="text-sm mb-6">
      <div className="flex items-center gap-3 h-16">
        <CurrencyInputControls
          isBase={isBase}
          dragHandleProps={dragHandleProps}
        />
        
        {/* Main Input Container */}
        <div className="flex w-full rounded-xl border border-blue-200 overflow-hidden flex-1 h-full items-center">
          <Input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            onChange={(e) => handleAmountChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={showDecimals ? "0.00" : "0"}
            className={`text-stone-950 font-inter font-semibold py-0 px-4 flex-1 border-0 rounded-none focus:ring-0 focus:border-0 h-full transition-opacity duration-200 ${
              shouldBeTransparent ? 'text-opacity-30' : 'text-opacity-100'
            }`}
            style={{ fontSize: '1.25rem' }}
          />
          
          <div className="relative h-full flex items-center">
            <CurrencyDropdown
              availableCurrencies={currencies}
              onSelect={onCurrencyChange}
              selectedCurrency={currency}
              placeholder={isBase ? 'Select your base currency' : 'Change currency'}
              triggerClassName="h-full border-0 rounded-none bg-transparent border-l border-blue-200 flex items-center gap-2 px-2 text-sm"
            />
          </div>
        </div>
        
        <CurrencyRemoveButton
          isBase={isBase}
          onRemove={onRemove}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
