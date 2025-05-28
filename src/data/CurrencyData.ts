
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
];

// Mock exchange rates (in a real app, you'd fetch these from an API)
export const mockExchangeRates: { [key: string]: ExchangeRates } = {
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

export const calculateConversion = (amount: string, fromCurrency: string, toCurrency: string): string => {
  if (!amount || fromCurrency === toCurrency) return amount;
  
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return '0';
  
  const rate = mockExchangeRates[fromCurrency]?.[toCurrency] || 1;
  return (numAmount * rate).toFixed(2);
};
