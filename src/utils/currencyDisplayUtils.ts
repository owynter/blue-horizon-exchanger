
import { formatNumberWithDecimals } from '@/lib/numberUtils';

export const getCurrencyDisplayValue = (
  amount: string,
  showDecimals: boolean,
  isFocused: boolean
): string => {
  console.log('getCurrencyDisplayValue called with amount:', amount, 'showDecimals:', showDecimals, 'isFocused:', isFocused);
  
  if (!amount) return '';
  
  if (isFocused) {
    // While focused, show raw value but cleaned of commas
    const cleanValue = amount.replace(/,/g, '');
    console.log('Focused: returning clean value:', cleanValue);
    return cleanValue;
  } else {
    // When not focused, use full formatting
    const formatted = formatNumberWithDecimals(amount, showDecimals);
    console.log('Not focused: returning formatted value:', formatted);
    return formatted;
  }
};
