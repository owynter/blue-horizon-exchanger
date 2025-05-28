
import { formatNumberWithCommas, formatNumberWithDecimals } from '@/lib/numberUtils';

export const getCurrencyDisplayValue = (
  amount: string,
  showDecimals: boolean,
  isFocused: boolean
): string => {
  console.log('getCurrencyDisplayValue called with amount:', amount);
  
  if (!amount) return '';
  
  if (isFocused) {
    // While focused, only add commas but preserve decimal structure
    return formatNumberWithCommas(amount);
  } else {
    // When not focused, use full formatting
    return formatNumberWithDecimals(amount, showDecimals);
  }
};
