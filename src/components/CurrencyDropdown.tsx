
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Check, ChevronDown } from 'lucide-react';
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

interface CurrencyDropdownProps {
  availableCurrencies: Currency[];
  onSelect?: (currencyCode: string) => void; // For single select
  onAddMultiple?: (currencyCodes: string[]) => void; // For multi-select
  multiSelect?: boolean;
  placeholder?: string;
  triggerClassName?: string;
  selectedCurrency?: string; // For single select display
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  availableCurrencies,
  onSelect,
  onAddMultiple,
  multiSelect = false,
  placeholder = "Select currency",
  triggerClassName = "",
  selectedCurrency
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (currencyCode: string) => {
    if (multiSelect) {
      onAddMultiple?.(currencyCode);
    } else {
      onSelect?.(currencyCode);
      setOpen(false);
    }
  };

  if (availableCurrencies.length === 0) return null;

  const selectedCurrencyData = selectedCurrency ? 
    availableCurrencies.find(c => c.code === selectedCurrency) : null;

  return (
    <div className={multiSelect ? "space-y-3" : ""}>
      {multiSelect && (
        <label className="block text-sm font-medium text-blue-900 font-sora">
          Add Currencies
        </label>
      )}
      
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`justify-between ${triggerClassName} ${
                  multiSelect 
                    ? "w-full border-blue-200 hover:border-blue-300 font-sora" 
                    : "border-0 rounded-none bg-transparent border-l border-blue-200"
                }`}
              >
                {multiSelect ? (
                  <>
                    <div className="flex items-center">
                      <Plus size={16} className="mr-2" />
                      {placeholder}
                    </div>
                  </>
                ) : selectedCurrencyData ? (
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: '1.5rem' }}>{selectedCurrencyData.flag}</span>
                    <span className="font-semibold text-stone-950 font-sora" style={{ fontSize: '1.125rem' }}>
                      {selectedCurrencyData.code}
                    </span>
                  </div>
                ) : (
                  placeholder
                )}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{multiSelect ? "Select currencies to add to your converter" : "Change currency"}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent 
          className="p-0 bg-white border-blue-200 shadow-xl z-50" 
          align={multiSelect ? "start" : "end"}
          style={{ width: multiSelect ? 'var(--radix-popover-trigger-width)' : '400px' }}
        >
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
                    className="cursor-pointer hover:bg-blue-50"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-lg">{currency.flag}</span>
                      <span className="font-medium font-sora">{currency.name} ({currency.code})</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CurrencyDropdown;
