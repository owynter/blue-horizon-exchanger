import React, { useState, useEffect } from 'react';
import { Search, Star, StarOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  ExtendedCurrency, 
  extendedCurrencies,
  getFavoriteCurrencies,
  getAllCurrenciesSorted,
  searchCurrencies,
  toggleCurrencyFavorite 
} from '@/data/ExtendedCurrencies';
import FlagDisplay from './FlagDisplay';

interface EnhancedCurrencyDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const EnhancedCurrencyDropdown: React.FC<EnhancedCurrencyDropdownProps> = ({
  value,
  onValueChange,
  placeholder = "Select currency...",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currencies, setCurrencies] = useState<ExtendedCurrency[]>(extendedCurrencies);

  const selectedCurrency = currencies.find(c => c.code === value);
  const favoriteCurrencies = getFavoriteCurrencies();
  const filteredCurrencies = searchQuery 
    ? searchCurrencies(searchQuery)
    : getAllCurrenciesSorted();

  // Filter out favorites from the main list to avoid duplication
  const nonFavoriteCurrencies = filteredCurrencies.filter(c => !c.isFavorite);

  const handleToggleFavorite = (currencyCode: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    toggleCurrencyFavorite(currencyCode);
    setCurrencies([...extendedCurrencies]); // Force re-render
  };

  const handleSelect = (currencyCode: string) => {
    onValueChange(currencyCode);
    setOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    setCurrencies([...extendedCurrencies]);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12 px-3 font-mono text-sm"
          disabled={disabled}
        >
          {selectedCurrency ? (
            <div className="flex items-center space-x-2">
              <FlagDisplay currency={selectedCurrency} />
              <span className="font-semibold">{selectedCurrency.code}</span>
              <span className="text-muted-foreground font-normal">
                {selectedCurrency.name}
              </span>
              {selectedCurrency.isFavorite && (
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              placeholder="Search currencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList>
            <ScrollArea className="h-[300px]">
              {favoriteCurrencies.length > 0 && (
                <>
                  <CommandGroup heading="Favorites">
                    {favoriteCurrencies.map((currency) => (
                      <CommandItem
                        key={currency.code}
                        value={currency.code}
                        onSelect={() => handleSelect(currency.code)}
                        className="flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-accent"
                      >
                        <div className="flex items-center space-x-2">
                          <FlagDisplay currency={currency} />
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold font-mono text-sm">
                                {currency.code}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                Favorite
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {currency.name} • {currency.country}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-transparent"
                          onClick={(e) => handleToggleFavorite(currency.code, e)}
                        >
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        </Button>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <Separator />
                </>
              )}
              
              <CommandGroup heading={searchQuery ? "Search Results" : "All Currencies"}>
                {nonFavoriteCurrencies.length === 0 ? (
                  <CommandEmpty>
                    {searchQuery ? "No currencies found." : "No currencies available."}
                  </CommandEmpty>
                ) : (
                  nonFavoriteCurrencies.map((currency) => (
                    <CommandItem
                      key={currency.code}
                      value={currency.code}
                      onSelect={() => handleSelect(currency.code)}
                      className="flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-accent"
                    >
                      <div className="flex items-center space-x-2">
                        <FlagDisplay currency={currency} />
                        <div className="flex flex-col">
                          <span className="font-semibold font-mono text-sm">
                            {currency.code}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {currency.name} • {currency.country}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-transparent"
                        onClick={(e) => handleToggleFavorite(currency.code, e)}
                      >
                        <StarOff className="h-3 w-3 text-muted-foreground hover:text-yellow-500" />
                      </Button>
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default EnhancedCurrencyDropdown; 