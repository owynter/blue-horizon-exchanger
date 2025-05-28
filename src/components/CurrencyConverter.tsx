
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CurrencyInput from './CurrencyInput';
import { toast } from '@/hooks/use-toast';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

interface ExchangeRates {
  [key: string]: number;
}

interface TargetCurrency {
  id: string;
  code: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
];

// Mock exchange rates (in a real app, you'd fetch these from an API)
const mockExchangeRates: { [key: string]: ExchangeRates } = {
  USD: { EUR: 0.8855, GBP: 0.7825, JPY: 149.50, CAD: 1.3650, AUD: 1.5280, CHF: 0.8920, CNY: 7.2450, INR: 83.25, KRW: 1325.50 },
  EUR: { USD: 1.1293, GBP: 0.8835, JPY: 168.95, CAD: 1.5425, AUD: 1.7265, CHF: 1.0075, CNY: 8.1835, INR: 94.05, KRW: 1496.75 },
  GBP: { USD: 1.2780, EUR: 1.1318, JPY: 191.15, CAD: 1.7455, AUD: 1.9535, CHF: 1.1405, CNY: 9.2615, INR: 106.45, KRW: 1694.25 },
  JPY: { USD: 0.0067, EUR: 0.0059, GBP: 0.0052, CAD: 0.0091, AUD: 0.0102, CHF: 0.0060, CNY: 0.0485, INR: 0.5570, KRW: 8.8650 },
  CAD: { USD: 0.7326, EUR: 0.6484, GBP: 0.5729, JPY: 109.56, AUD: 1.1195, CHF: 0.6535, CNY: 5.3065, INR: 60.95, KRW: 971.25 },
  AUD: { USD: 0.6544, EUR: 0.5792, GBP: 0.5119, JPY: 97.85, CAD: 0.8933, CHF: 0.5840, CNY: 4.7405, INR: 54.45, KRW: 867.55 },
  CHF: { USD: 1.1210, EUR: 0.9925, GBP: 0.8769, JPY: 167.65, CAD: 1.5295, AUD: 1.7125, CNY: 8.1215, INR: 93.25, KRW: 1485.75 },
  CNY: { USD: 0.1381, EUR: 0.1222, GBP: 0.1080, JPY: 20.65, CAD: 0.1885, AUD: 0.2109, CHF: 0.1231, INR: 11.49, KRW: 182.95 },
  INR: { USD: 0.0120, EUR: 0.0106, GBP: 0.0094, JPY: 1.7955, CAD: 0.0164, AUD: 0.0184, CHF: 0.0107, CNY: 0.0870, KRW: 15.92 },
  KRW: { USD: 0.0008, EUR: 0.0007, GBP: 0.0006, JPY: 0.1128, CAD: 0.0010, AUD: 0.0012, CHF: 0.0007, CNY: 0.0055, INR: 0.0628 },
};

const CurrencyConverter: React.FC = () => {
  const [baseAmount, setBaseAmount] = useState('1000');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrencies, setTargetCurrencies] = useState<TargetCurrency[]>([
    { id: '1', code: 'EUR' },
    { id: '2', code: 'GBP' },
  ]);
  const [newCurrency, setNewCurrency] = useState('');

  const calculateConversion = (amount: string, fromCurrency: string, toCurrency: string): string => {
    if (!amount || fromCurrency === toCurrency) return amount;
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return '0';
    
    const rate = mockExchangeRates[fromCurrency]?.[toCurrency] || 1;
    return (numAmount * rate).toFixed(2);
  };

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

  const reorderCurrencies = (startIndex: number, endIndex: number) => {
    const result = Array.from(targetCurrencies);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTargetCurrencies(result);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">CURRENCY CONVERTER</h1>
        <p className="text-blue-600">Convert between multiple currencies in real-time</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg">
        <div className="space-y-6">
          {/* Base Currency Input */}
          <CurrencyInput
            amount={baseAmount}
            currency={baseCurrency}
            isBase={true}
            onAmountChange={setBaseAmount}
            onCurrencyChange={setBaseCurrency}
            currencies={currencies}
          />

          {/* Exchange Rate Display */}
          {targetCurrencies.length > 0 && (
            <div className="text-center py-2">
              <div className="text-lg font-semibold text-blue-900">
                {baseCurrency} {baseAmount} = {' '}
                {targetCurrencies.map((tc, index) => {
                  const convertedAmount = calculateConversion(baseAmount, baseCurrency, tc.code);
                  const currency = currencies.find(c => c.code === tc.code);
                  return (
                    <span key={tc.id}>
                      {currency?.flag} {convertedAmount} {tc.code}
                      {index < targetCurrencies.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
              </div>
              <p className="text-sm text-blue-600 mt-1">Mid-market exchange rate</p>
            </div>
          )}

          {/* Target Currency Inputs */}
          <div className="space-y-4">
            {targetCurrencies.map((targetCurrency, index) => (
              <CurrencyInput
                key={targetCurrency.id}
                amount={calculateConversion(baseAmount, baseCurrency, targetCurrency.code)}
                currency={targetCurrency.code}
                onCurrencyChange={(newCode) => updateTargetCurrency(targetCurrency.id, newCode)}
                onRemove={() => removeCurrency(targetCurrency.id)}
                currencies={currencies}
              />
            ))}
          </div>

          {/* Add Currency Section */}
          {availableCurrencies.length > 0 && (
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Add Currency
                </label>
                <Select value={newCurrency} onValueChange={setNewCurrency}>
                  <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500">
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
                onClick={addCurrency}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                <Plus size={16} className="mr-2" />
                Add
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50">
              Track exchange rate
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Send money
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
