import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, ChevronDown, Star, StarOff } from 'lucide-react';
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
import { 
  Currency,
  getCurrenciesForDropdown,
  toggleCurrencyFavorite,
  isCurrencyFavorite,
  getCurrencyByCode,
  getFavoriteCurrencies,
  getNonFavoriteCurrencies,
  getCryptoCurrencies,
  getFiatCurrencies,
  searchCurrencies
} from '@/data/AllCurrencies';
import FlagDisplay from './FlagDisplay';

interface EnhancedCurrencyDropdownProps {
  onSelect?: (currencyCode: string) => void;
  onAddMultiple?: (currencyCode: string) => void;
  multiSelect?: boolean;
  placeholder?: string;
  triggerClassName?: string;
  selectedCurrency?: string;
  availableCurrencies?: Currency[];
  excludedCurrencies?: string[];
}

const EnhancedCurrencyDropdown: React.FC<EnhancedCurrencyDropdownProps> = ({
  onSelect,
  onAddMultiple,
  multiSelect = false,
  placeholder = "Select currency",
  triggerClassName = "",
  selectedCurrency,
  availableCurrencies,
  excludedCurrencies = []
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Update favorites state when favorites change
  useEffect(() => {
    const updateFavorites = () => {
      const favCurrencies = getFavoriteCurrencies();
      setFavorites(favCurrencies.map(c => c.code));
    };
    
    updateFavorites();
    
    // Listen for storage events to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currency_favorites') {
        updateFavorites();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSelect = (currencyCode: string) => {
    if (multiSelect) {
      onAddMultiple?.(currencyCode);
    } else {
      onSelect?.(currencyCode);
      setOpen(false);
    }
  };

  const handleToggleFavorite = (currencyCode: string, event: React.MouseEvent) => {
    event.stopPropagation();
    toggleCurrencyFavorite(currencyCode);
    
    // Update local state
    const favCurrencies = getFavoriteCurrencies();
    setFavorites(favCurrencies.map(c => c.code));
  };

  // Get currencies to display
  const getCurrenciesToShow = (): Currency[] => {
    let currencies = availableCurrencies || getCurrenciesForDropdown();
    
    // Exclude certain currencies if specified
    if (excludedCurrencies.length > 0) {
      currencies = currencies.filter(c => !excludedCurrencies.includes(c.code));
    }

    // Apply search filter
    if (searchQuery.trim()) {
      currencies = searchCurrencies(searchQuery);
      if (excludedCurrencies.length > 0) {
        currencies = currencies.filter(c => !excludedCurrencies.includes(c.code));
      }
    }

    return currencies;
  };

  const currenciesToShow = getCurrenciesToShow();
  const selectedCurrencyData = selectedCurrency ? getCurrencyByCode(selectedCurrency) : null;

  // Group currencies for display
  const favoriteCurrencies = currenciesToShow.filter(c => isCurrencyFavorite(c.code));
  const cryptoCurrencies = currenciesToShow.filter(c => c.type === 'crypto' && !isCurrencyFavorite(c.code));
  const fiatCurrencies = currenciesToShow.filter(c => c.type === 'fiat' && !isCurrencyFavorite(c.code));

  const CurrencyItem = ({ currency }: { currency: Currency }) => (
    <CommandItem
      key={currency.code}
      value={`${currency.code} ${currency.name} ${currency.country}`}
      onSelect={() => handleSelect(currency.code)}
      className="cursor-pointer hover:bg-blue-50 flex items-center justify-between group"
    >
      <div className="flex items-center gap-3 flex-1">
        <FlagDisplay currency={currency} size="md" showFallback={false} />
        <div className="flex flex-col">
          <span className="font-medium font-sora text-sm">
            {currency.name} ({currency.code})
          </span>
          <span className="text-xs text-gray-500 font-inter">
            {currency.country}
            {currency.type === 'crypto' && ' • Cryptocurrency'}
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
        onClick={(e) => handleToggleFavorite(currency.code, e)}
      >
        {isCurrencyFavorite(currency.code) ? (
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
        ) : (
          <StarOff size={14} className="text-gray-400" />
        )}
      </Button>
    </CommandItem>
  );

  if (!multiSelect && currenciesToShow.length === 0) return null;

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
                      <span className="font-sora">{placeholder}</span>
                    </div>
                  </>
                ) : selectedCurrencyData ? (
                  <div className="flex items-center gap-3">
                    <FlagDisplay currency={selectedCurrencyData} size="md" showFallback={false} />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-stone-950 font-sora" style={{ fontSize: '1.125rem' }}>
                        {selectedCurrencyData.code}
                      </span>
                      {selectedCurrencyData.type === 'crypto' && (
                        <span className="text-xs text-gray-500 font-inter">Crypto</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="font-sora">{placeholder}</span>
                )}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-inter">
              {multiSelect ? "Select currencies to add to your converter" : "Change currency"}
              <br />
              <span className="text-xs text-gray-400">Click ⭐ to favorite currencies</span>
            </p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent 
          className="p-0 bg-white border-blue-200 shadow-xl z-50" 
          align={multiSelect ? "start" : "end"}
          style={{ width: multiSelect ? 'var(--radix-popover-trigger-width)' : '450px' }}
        >
          <Command>
            <CommandInput 
              placeholder="Search currencies..." 
              className="font-inter"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList className="max-h-[400px]">
              <CommandEmpty className="font-inter py-6 text-center text-gray-500">
                No currencies found.
              </CommandEmpty>
              
              {/* Favorites Section */}
              {favoriteCurrencies.length > 0 && (
                <CommandGroup heading="⭐ Favorites">
                  {favoriteCurrencies.map((currency) => (
                    <CurrencyItem key={currency.code} currency={currency} />
                  ))}
                </CommandGroup>
              )}

              {/* Cryptocurrencies Section */}
              {cryptoCurrencies.length > 0 && (
                <CommandGroup heading="🪙 Cryptocurrencies">
                  {cryptoCurrencies.map((currency) => (
                    <CurrencyItem key={currency.code} currency={currency} />
                  ))}
                </CommandGroup>
              )}

              {/* Fiat Currencies Section */}
              {fiatCurrencies.length > 0 && (
                <CommandGroup heading="💵 Fiat Currencies">
                  {fiatCurrencies.map((currency) => (
                    <CurrencyItem key={currency.code} currency={currency} />
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EnhancedCurrencyDropdown; 