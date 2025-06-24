import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import BaseCurrencySection from './BaseCurrencySection';
import TargetCurrenciesSection from './TargetCurrenciesSection';
import ConversionArrows from './ConversionArrows';
import { 
  allCurrencies, 
  getCurrenciesForDropdown, 
  initializeFavorites, 
  Currency, 
  TargetCurrency 
} from '@/data/AllCurrencies';
import { calculateConversion, calculateCrossCurrencyConversion } from '@/data/CurrencyData';
import { generateRealisticTimestamp, formatRelativeTime } from '@/utils/timestampUtils';

const MAX_CURRENCIES = 10;

const CurrencyConverter: React.FC = () => {
  const [baseAmount, setBaseAmount] = useState('1000');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrencies, setTargetCurrencies] = useState<TargetCurrency[]>([
    { id: '1', code: 'EUR' },
    { id: '2', code: 'GBP' },
  ]);
  const [lastEditedCurrency, setLastEditedCurrency] = useState('USD');
  const [sourceAmount, setSourceAmount] = useState('1000');
  const [lastUpdated, setLastUpdated] = useState<Date>(generateRealisticTimestamp());
  const [showDecimals, setShowDecimals] = useState(true);

  // Initialize favorites system
  useEffect(() => {
    initializeFavorites();
  }, []);

  // Update timestamp every hour to simulate rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(generateRealisticTimestamp());
    }, 60 * 60 * 1000); // Every hour

    return () => clearInterval(interval);
  }, []);

  const handleBaseAmountChange = (amount: string) => {
    setBaseAmount(amount);
    setSourceAmount(amount);
    setLastEditedCurrency(baseCurrency);
  };

  const handleTargetAmountChange = (targetId: string, amount: string) => {
    const targetCurrency = targetCurrencies.find(tc => tc.id === targetId);
    if (targetCurrency) {
      setSourceAmount(amount);
      setLastEditedCurrency(targetCurrency.code);
      
      // Calculate and update base amount
      const newBaseAmount = calculateConversion(amount, targetCurrency.code, baseCurrency);
      setBaseAmount(newBaseAmount.replace(/,/g, ''));
    }
  };

  const getDisplayAmount = (currencyCode: string) => {
    if (currencyCode === lastEditedCurrency) {
      return sourceAmount;
    }
    
    // Use the more accurate cross-currency conversion
    return calculateCrossCurrencyConversion(sourceAmount, lastEditedCurrency, currencyCode, baseCurrency);
  };

  const handleCurrencyToggle = (currencyCode: string) => {
    // Check if currency already exists in target currencies
    const existingCurrency = targetCurrencies.find(tc => tc.code === currencyCode);
    
    if (existingCurrency) {
      // Remove the currency
      setTargetCurrencies(targetCurrencies.filter(tc => tc.code !== currencyCode));
      toast({
        title: "Currency removed",
        description: `${currencyCode} has been removed from your conversion list.`,
      });
    } else {
      // Add the currency
      if (currencyCode === baseCurrency) {
        toast({
          title: "Cannot add base currency",
          description: `${currencyCode} is already your base currency.`,
          variant: "destructive",
        });
        return;
      }
      
      // Check target currency limit (10 target currencies allowed)
      if (targetCurrencies.length >= MAX_CURRENCIES) {
        toast({
          title: "Currency limit reached",
          description: `Maximum ${MAX_CURRENCIES} target currencies allowed.`,
          variant: "destructive",
        });
        return;
      }

      const newCurrency = {
        id: Date.now().toString() + Math.random().toString(),
        code: currencyCode
      };
      
      setTargetCurrencies([...targetCurrencies, newCurrency]);
      
      // Get currency info for better toast message
      const currency = allCurrencies.find(c => c.code === currencyCode);
      const currencyType = currency?.type === 'crypto' ? 'cryptocurrency' : 'currency';
      
      toast({
        title: `${currencyType.charAt(0).toUpperCase() + currencyType.slice(1)} added`,
        description: `${currencyCode} has been added to your conversion list.`,
      });
    }
  };

  const removeCurrency = (id: string) => {
    setTargetCurrencies(targetCurrencies.filter(tc => tc.id !== id));
  };

  const updateTargetCurrency = (id: string, newCode: string) => {
    if (newCode === baseCurrency) {
      toast({
        title: "Cannot select base currency",
        description: "This currency is already your base currency.",
        variant: "destructive",
      });
      return;
    }
    
    if (targetCurrencies.some(tc => tc.code === newCode && tc.id !== id)) {
      toast({
        title: "Currency already exists",
        description: "This currency is already in your conversion list.",
        variant: "destructive",
      });
      return;
    }
    
    setTargetCurrencies(targetCurrencies.map(tc => 
      tc.id === id ? { ...tc, code: newCode } : tc
    ));
  };

  const availableCurrencies = allCurrencies.filter(c => 
    c.code !== baseCurrency && !targetCurrencies.some(tc => tc.code === c.code)
  );

  return (
    <TooltipProvider>
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          {/* Main title - using Sora font for primary headings */}
          <h1 className="text-4xl font-bold text-sky-400 mb-4 font-sora">Currency converter</h1>
          {/* Subtitle - using Sora font for secondary headings */}
          <p className="text-blue-200 font-sora">Convert between multiple currencies & cryptocurrencies in real-time</p>
          {/* Last updated info - using Inter font for body text */}
          <p className="text-xs text-blue-300/80 mt-2 font-inter">
            Rates last updated: {formatRelativeTime(lastUpdated)}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Base Currency */}
            <div>
              <BaseCurrencySection
                baseAmount={lastEditedCurrency === baseCurrency ? sourceAmount : getDisplayAmount(baseCurrency)}
                baseCurrency={baseCurrency}
                onAmountChange={handleBaseAmountChange}
                onCurrencyChange={setBaseCurrency}
                currencies={allCurrencies}
                showDecimals={showDecimals}
                onDecimalToggle={setShowDecimals}
              />
            </div>

            {/* Right Column - Target Currencies */}
            <TargetCurrenciesSection
              targetCurrencies={targetCurrencies}
              setTargetCurrencies={setTargetCurrencies}
              baseAmount={baseAmount}
              baseCurrency={baseCurrency}
              onCurrencyChange={updateTargetCurrency}
              onRemove={removeCurrency}
              currencies={allCurrencies}
              calculateConversion={calculateConversion}
              availableCurrencies={availableCurrencies}
              onAddMultipleCurrencies={handleCurrencyToggle}
              getDisplayAmount={getDisplayAmount}
              onTargetAmountChange={handleTargetAmountChange}
              showDecimals={showDecimals}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CurrencyConverter;
