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
  console.log('convertToUSD input:', amount, 'fromCurrency:', fromCurrency, 'parsed amount:', numAmount);
  
  if (isNaN(numAmount) || !usdExchangeRates[fromCurrency]) {
    console.log('convertToUSD: invalid input, returning 0');
    return 0;
  }
  
  if (fromCurrency === 'USD') {
    console.log('convertToUSD: already USD, returning:', numAmount);
    return numAmount;
  }
  
  // To convert TO USD, we divide by the exchange rate
  const result = numAmount / usdExchangeRates[fromCurrency];
  console.log('convertToUSD result:', result, 'rate used:', usdExchangeRates[fromCurrency]);
  return result;
};

// Convert USD to any currency
export const convertFromUSD = (usdAmount: number, toCurrency: string): string => {
  console.log('convertFromUSD input:', usdAmount, 'toCurrency:', toCurrency);
  
  if (!usdExchangeRates[toCurrency]) {
    console.log('convertFromUSD: invalid currency, returning 0.00');
    return '0.00';
  }
  
  if (toCurrency === 'USD') {
    const result = formatNumberWithCommas(usdAmount.toFixed(2));
    console.log('convertFromUSD: already USD, returning:', result);
    return result;
  }
  
  // To convert FROM USD, we multiply by the exchange rate
  const convertedAmount = usdAmount * usdExchangeRates[toCurrency];
  console.log('convertFromUSD: converted amount before formatting:', convertedAmount, 'rate used:', usdExchangeRates[toCurrency]);
  
  const result = formatNumberWithCommas(convertedAmount.toFixed(2));
  console.log('convertFromUSD final result:', result);
  return result;
};

// Main conversion function using USD as base
export const calculateConversion = (amount: string, fromCurrency: string, toCurrency: string): string => {
  console.log('calculateConversion input:', amount, 'from:', fromCurrency, 'to:', toCurrency);
  
  if (!amount || fromCurrency === toCurrency) {
    const result = formatNumberWithCommas(amount);
    console.log('calculateConversion: same currency or empty, returning:', result);
    return result;
  }
  
  // Convert to USD first, then to target currency
  const usdAmount = convertToUSD(amount, fromCurrency);
  console.log('calculateConversion: USD amount:', usdAmount);
  
  const finalResult = convertFromUSD(usdAmount, toCurrency);
  console.log('calculateConversion final result:', finalResult);
  return finalResult;
};

// Simplified cross-currency conversion (now just uses the main function)
export const calculateCrossCurrencyConversion = (amount: string, fromCurrency: string, toCurrency: string, baseCurrency: string): string => {
  return calculateConversion(amount, fromCurrency, toCurrency);
};
