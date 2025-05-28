import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CurrencyInput from './CurrencyInput';
import { toast } from '@/hooks/use-toast';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  { code: 'XCD', name: 'Eastern Caribbean Dollar', symbol: 'EC$', flag: '🇦🇬' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴' },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', flag: '🇩🇴' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱' },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡', flag: '🇨🇷' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', flag: '🇯🇲' },
];

// Mock exchange rates (in a real app, you'd fetch these from an API)
const mockExchangeRates: { [key: string]: ExchangeRates } = {
  USD: { XCD: 2.70, COP: 4100.50, DOP: 59.85, PEN: 3.72, CLP: 950.25, CRC: 520.15, EUR: 0.8855, GBP: 0.7825, JMD: 156.50 },
  XCD: { USD: 0.37, COP: 1518.70, DOP: 22.17, PEN: 1.38, CLP: 352.31, CRC: 192.65, EUR: 0.33, GBP: 0.29, JMD: 57.96 },
  COP: { USD: 0.00024, XCD: 0.00066, DOP: 0.0146, PEN: 0.00091, CLP: 0.232, CRC: 0.127, EUR: 0.00022, GBP: 0.00019, JMD: 0.038 },
  DOP: { USD: 0.0167, XCD: 0.045, COP: 68.52, PEN: 0.062, CLP: 15.89, CRC: 8.69, EUR: 0.0148, GBP: 0.013, JMD: 2.61 },
  PEN: { USD: 0.269, XCD: 0.725, COP: 1102.28, DOP: 16.09, CLP: 255.51, CRC: 139.89, EUR: 0.238, GBP: 0.210, JMD: 42.07 },
  CLP: { USD: 0.00105, XCD: 0.00284, COP: 4.31, DOP: 0.063, PEN: 0.00391, CRC: 0.547, EUR: 0.00093, GBP: 0.00082, JMD: 0.165 },
  CRC: { USD: 0.00192, XCD: 0.00519, COP: 7.87, DOP: 0.115, PEN: 0.00715, CLP: 1.828, EUR: 0.0017, GBP: 0.0015, JMD: 0.301 },
  EUR: { USD: 1.1293, XCD: 3.049, COP: 4630.71, DOP: 67.62, PEN: 4.20, CLP: 1073.45, CRC: 587.45, GBP: 0.8835, JMD: 176.80 },
  GBP: { USD: 1.2780, XCD: 3.451, COP: 5240.64, DOP: 76.52, PEN: 4.75, CLP: 1214.82, CRC: 664.79, EUR: 1.1318, JMD: 200.12 },
  JMD: { USD: 0.00639, XCD: 0.01725, COP: 26.18, DOP: 0.383, PEN: 0.0238, CLP: 6.07, CRC: 3.32, EUR: 0.00565, GBP: 0.005 },
};

// Sortable wrapper component
const SortableCurrencyInput: React.FC<{
  targetCurrency: TargetCurrency;
  baseAmount: string;
  baseCurrency: string;
  onCurrencyChange: (id: string, newCode: string) => void;
  onRemove: (id: string) => void;
  currencies: Currency[];
  calculateConversion: (amount: string, from: string, to: string) => string;
}> = ({ targetCurrency, baseAmount, baseCurrency, onCurrencyChange, onRemove, currencies, calculateConversion }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: targetCurrency.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <CurrencyInput
        amount={calculateConversion(baseAmount, baseCurrency, targetCurrency.code)}
        currency={targetCurrency.code}
        onCurrencyChange={(newCode) => onCurrencyChange(targetCurrency.id, newCode)}
        onRemove={() => onRemove(targetCurrency.id)}
        currencies={currencies}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};

const CurrencyConverter: React.FC = () => {
  const [baseAmount, setBaseAmount] = useState('1000');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrencies, setTargetCurrencies] = useState<TargetCurrency[]>([
    { id: '1', code: 'EUR' },
    { id: '2', code: 'GBP' },
  ]);
  const [newCurrency, setNewCurrency] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTargetCurrencies((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">CURRENCY CONVERTER</h1>
        <p className="text-blue-600">Convert between multiple currencies in real-time</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Base Currency */}
          <div className="space-y-6">
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
              <div className="text-center py-4 border-t border-blue-200">
                <div className="text-lg font-semibold text-blue-900 mb-1">
                  {baseCurrency} {baseAmount} = {' '}
                  {targetCurrencies.slice(0, 1).map((tc) => {
                    const convertedAmount = calculateConversion(baseAmount, baseCurrency, tc.code);
                    const currency = currencies.find(c => c.code === tc.code);
                    return (
                      <span key={tc.id} className="text-blue-700">
                        {currency?.flag} {convertedAmount} {tc.code}
                      </span>
                    );
                  })}
                </div>
                <p className="text-sm text-blue-600">Mid-market exchange rate</p>
              </div>
            )}
          </div>

          {/* Right Column - Target Currencies */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Convert to</h3>
              
              {/* Target Currencies List with Drag and Drop */}
              {targetCurrencies.length > 0 && (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={targetCurrencies.map(tc => tc.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {targetCurrencies.map((targetCurrency) => (
                        <SortableCurrencyInput
                          key={targetCurrency.id}
                          targetCurrency={targetCurrency}
                          baseAmount={baseAmount}
                          baseCurrency={baseCurrency}
                          onCurrencyChange={updateTargetCurrency}
                          onRemove={removeCurrency}
                          currencies={currencies}
                          calculateConversion={calculateConversion}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}

              {/* Add Currency Section */}
              {availableCurrencies.length > 0 && (
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
                    onClick={addCurrency}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                  >
                    <Plus size={16} className="mr-2" />
                    Add
                  </Button>
                </div>
              )}

              {/* Empty state when no currencies */}
              {targetCurrencies.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-blue-200 rounded-xl">
                  <p className="text-blue-400 mb-4">No currencies added yet</p>
                  <p className="text-sm text-blue-300">Add currencies below to start converting</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
