
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import BaseCurrencySection from './BaseCurrencySection';
import TargetCurrenciesSection from './TargetCurrenciesSection';
import { currencies, calculateConversion, TargetCurrency } from '@/data/CurrencyData';

const CurrencyConverter: React.FC = () => {
  const [baseAmount, setBaseAmount] = useState('1000');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrencies, setTargetCurrencies] = useState<TargetCurrency[]>([
    { id: '1', code: 'EUR' },
    { id: '2', code: 'GBP' },
  ]);
  const [newCurrency, setNewCurrency] = useState('');

  const addCurrency = () => {
    if (!newCurrency) {
      toast({
        title: "Please select a currency",
        description: "Choose a currency from the dropdown to add it.",
        variant: "destructive",
      });
      return;
    }
    
    if (newCurrency === baseCurrency) {
      toast({
        title: "Cannot add base currency",
        description: "The selected currency is already your base currency.",
        variant: "destructive",
      });
      return;
    }
    
    if (targetCurrencies.some(tc => tc.code === newCurrency)) {
      toast({
        title: "Currency already added",
        description: "This currency is already in your conversion list.",
        variant: "destructive",
      });
      return;
    }
    
    const newId = Date.now().toString();
    setTargetCurrencies([...targetCurrencies, { id: newId, code: newCurrency }]);
    setNewCurrency('');
    
    toast({
      title: "Currency added",
      description: `${newCurrency} has been added to your conversion list.`,
    });
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

  const availableCurrencies = currencies.filter(c => 
    c.code !== baseCurrency && !targetCurrencies.some(tc => tc.code === c.code)
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">CURRENCY CONVERTER</h1>
        <p className="text-blue-600">Convert between multiple currencies in real-time</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Base Currency */}
          <BaseCurrencySection
            baseAmount={baseAmount}
            baseCurrency={baseCurrency}
            onAmountChange={setBaseAmount}
            onCurrencyChange={setBaseCurrency}
            currencies={currencies}
          />

          {/* Right Column - Target Currencies */}
          <TargetCurrenciesSection
            targetCurrencies={targetCurrencies}
            setTargetCurrencies={setTargetCurrencies}
            baseAmount={baseAmount}
            baseCurrency={baseCurrency}
            onCurrencyChange={updateTargetCurrency}
            onRemove={removeCurrency}
            currencies={currencies}
            calculateConversion={calculateConversion}
            newCurrency={newCurrency}
            setNewCurrency={setNewCurrency}
            onAddCurrency={addCurrency}
            availableCurrencies={availableCurrencies}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
