
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Currency } from '@/data/CurrencyData';

interface MultiSelectCurrencyDropdownProps {
  availableCurrencies: Currency[];
  onAddCurrencies: (currencyCodes: string[]) => void;
}

const MultiSelectCurrencyDropdown: React.FC<MultiSelectCurrencyDropdownProps> = ({
  availableCurrencies,
  onAddCurrencies
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);

  const handleSelect = (currencyCode: string) => {
    setSelectedCurrencies(prev => 
      prev.includes(currencyCode) 
        ? prev.filter(code => code !== currencyCode)
        : [...prev, currencyCode]
    );
  };

  const handleAddSelected = () => {
    if (selectedCurrencies.length > 0) {
      onAddCurrencies(selectedCurrencies);
      setSelectedCurrencies([]);
      setOpen(false);
    }
  };

  if (availableCurrencies.length === 0) return null;

  return (
    <div className="space-y-3 pt-6 border-t border-blue-200">
      <label className="block text-sm font-medium text-blue-900 font-sora">
        Add Currencies
      </label>
      
      <div className="flex gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 justify-start border-blue-200 hover:border-blue-300 font-sora"
            >
              <Plus size={16} className="mr-2" />
              {selectedCurrencies.length > 0 
                ? `${selectedCurrencies.length} selected` 
                : "Select currencies to add"
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search currencies..." className="font-sora" />
              <CommandList>
                <CommandEmpty className="font-sora">No currencies found.</CommandEmpty>
                <CommandGroup>
                  {availableCurrencies.map((currency) => (
                    <CommandItem
                      key={currency.code}
                      value={`${currency.code} ${currency.name}`}
                      onSelect={() => handleSelect(currency.code)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-lg">{currency.flag}</span>
                        <span className="font-medium font-sora">{currency.code}</span>
                        <span className="text-sm text-gray-500 font-sora">- {currency.name}</span>
                      </div>
                      {selectedCurrencies.includes(currency.code) && (
                        <Check size={16} className="text-blue-600" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedCurrencies.length > 0 && (
          <Button 
            onClick={handleAddSelected}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-sora"
          >
            Add ({selectedCurrencies.length})
          </Button>
        )}
      </div>

      {selectedCurrencies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCurrencies.map(code => {
            const currency = availableCurrencies.find(c => c.code === code);
            return currency ? (
              <div key={code} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1 font-sora">
                <span>{currency.flag}</span>
                <span>{currency.code}</span>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelectCurrencyDropdown;
