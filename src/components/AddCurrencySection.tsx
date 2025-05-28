
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Currency } from '@/data/CurrencyData';

interface AddCurrencySectionProps {
  newCurrency: string;
  setNewCurrency: (currency: string) => void;
  onAddCurrency: () => void;
  availableCurrencies: Currency[];
}

const AddCurrencySection: React.FC<AddCurrencySectionProps> = ({
  newCurrency,
  setNewCurrency,
  onAddCurrency,
  availableCurrencies
}) => {
  if (availableCurrencies.length === 0) return null;

  return (
    <div className="flex gap-3 items-end pt-6 border-t border-blue-200 mt-6">
      <div className="flex-1">
        <label className="block text-sm font-medium text-blue-900 mb-2">
          Add Currency
        </label>
        <Select value={newCurrency} onValueChange={setNewCurrency}>
          <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 [&>svg]:hidden">
            <SelectValue placeholder="Select currency to add" />
          </SelectTrigger>
          <SelectContent className="bg-white border-blue-200 shadow-xl">
            {availableCurrencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code} className="hover:bg-blue-50">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{currency.flag}</span>
                  <span className="font-medium">{currency.code}</span>
                  <span className="text-sm text-gray-500">- {currency.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button 
        onClick={onAddCurrency}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
      >
        <Plus size={16} className="mr-2" />
        Add
      </Button>
    </div>
  );
};

export default AddCurrencySection;
