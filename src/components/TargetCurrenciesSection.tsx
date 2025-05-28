
import React from 'react';
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
import SortableCurrencyInput from './SortableCurrencyInput';
import AddCurrencySection from './AddCurrencySection';
import { TargetCurrency, Currency } from '@/data/CurrencyData';

interface TargetCurrenciesSectionProps {
  targetCurrencies: TargetCurrency[];
  setTargetCurrencies: (currencies: TargetCurrency[]) => void;
  baseAmount: string;
  baseCurrency: string;
  onCurrencyChange: (id: string, newCode: string) => void;
  onRemove: (id: string) => void;
  currencies: Currency[];
  calculateConversion: (amount: string, from: string, to: string) => string;
  newCurrency: string;
  setNewCurrency: (currency: string) => void;
  onAddCurrency: () => void;
  availableCurrencies: Currency[];
}

const TargetCurrenciesSection: React.FC<TargetCurrenciesSectionProps> = ({
  targetCurrencies,
  setTargetCurrencies,
  baseAmount,
  baseCurrency,
  onCurrencyChange,
  onRemove,
  currencies,
  calculateConversion,
  newCurrency,
  setNewCurrency,
  onAddCurrency,
  availableCurrencies
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
    <div className="space-y-6">
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
                  onCurrencyChange={onCurrencyChange}
                  onRemove={onRemove}
                  currencies={currencies}
                  calculateConversion={calculateConversion}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Add Currency Section */}
      <AddCurrencySection
        newCurrency={newCurrency}
        setNewCurrency={setNewCurrency}
        onAddCurrency={onAddCurrency}
        availableCurrencies={availableCurrencies}
      />

      {/* Empty state when no currencies */}
      {targetCurrencies.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-blue-200 rounded-xl">
          <p className="text-blue-400 mb-4">No currencies added yet</p>
          <p className="text-sm text-blue-300">Add currencies below to start converting</p>
        </div>
      )}
    </div>
  );
};

export default TargetCurrenciesSection;
