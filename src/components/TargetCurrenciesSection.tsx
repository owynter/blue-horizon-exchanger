
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
import MultiSelectCurrencyDropdown from './MultiSelectCurrencyDropdown';
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
  availableCurrencies: Currency[];
  onAddMultipleCurrencies: (currencyCode: string) => void; // Changed from string[] to string
  getDisplayAmount: (currencyCode: string) => string;
  onTargetAmountChange: (targetId: string, amount: string) => void;
}

const TargetCurrenciesSection: React.FC<TargetCurrenciesSectionProps> = ({
  targetCurrencies,
  setTargetCurrencies,
  onCurrencyChange,
  onRemove,
  currencies,
  availableCurrencies,
  onAddMultipleCurrencies,
  getDisplayAmount,
  onTargetAmountChange
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
      const oldIndex = targetCurrencies.findIndex(item => item.id === active.id);
      const newIndex = targetCurrencies.findIndex(item => item.id === over.id);
      const reorderedCurrencies = arrayMove(targetCurrencies, oldIndex, newIndex);
      setTargetCurrencies(reorderedCurrencies);
    }
  };

  return (
    <div className="space-y-6">
      {/* Converted To Heading - only show when there are target currencies */}
      {targetCurrencies.length > 0 && (
        <h3 className="text-lg font-semibold text-blue-900 mb-4 font-sora">Converted To</h3>
      )}

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
                  displayAmount={getDisplayAmount(targetCurrency.code)}
                  onAmountChange={onTargetAmountChange}
                  onCurrencyChange={onCurrencyChange}
                  onRemove={onRemove}
                  currencies={currencies}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Multi-Select Currency Dropdown */}
      <MultiSelectCurrencyDropdown
        availableCurrencies={availableCurrencies}
        onAddCurrencies={onAddMultipleCurrencies}
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
