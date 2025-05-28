import { formatNumberWithCommas } from '@/lib/numberUtils';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export interface ExchangeRates {
  [key: string]: number;
}

export interface TargetCurrency {
  id: string;
  code: string;
}

export const currencies: Currency[] = [
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
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
];

// USD-based exchange rates for more accurate conversions
export const usdExchangeRates: { [key: string]: number } = {
  USD: 1.0,
  XCD: 2.70,
  COP: 4100.50,
  DOP: 59.85,
  PEN: 3.72,
  CLP: 950.25,
  CRC: 520.15,
  EUR: 0.8855,
  GBP: 0.7825,
  JMD: 156.50,
  BRL: 5.15,
  CAD: 1.35,
  AUD: 1.52,
  JPY: 149.80,
  CHF: 0.89,
};

// Convert any currency to USD
export const convertToUSD = (amount: string, fromCurrency: string): number => {
  const numAmount = parseFloat(amount.replace(/,/g, ''));
  if (isNaN(numAmount) || !usdExchangeRates[fromCurrency]) return 0;
  
  if (fromCurrency === 'USD') return numAmount;
  return numAmount / usdExchangeRates[fromCurrency];
};

// Convert USD to any currency
export const convertFromUSD = (usdAmount: number, toCurrency: string): string => {
  if (!usdExchangeRates[toCurrency]) return '0.00';
  
  if (toCurrency === 'USD') {
    return formatNumberWithCommas(usdAmount.toFixed(2));
  }
  
  const result = usdAmount * usdExchangeRates[toCurrency];
  return formatNumberWithCommas(result.toFixed(2));
};

// Main conversion function using USD as base
export const calculateConversion = (amount: string, fromCurrency: string, toCurrency: string): string => {
  if (!amount || fromCurrency === toCurrency) return formatNumberWithCommas(amount);
  
  // Convert to USD first, then to target currency
  const usdAmount = convertToUSD(amount, fromCurrency);
  return convertFromUSD(usdAmount, toCurrency);
};

// Simplified cross-currency conversion (now just uses the main function)
export const calculateCrossCurrencyConversion = (amount: string, fromCurrency: string, toCurrency: string, baseCurrency: string): string => {
  return calculateConversion(amount, fromCurrency, toCurrency);
};
