export interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  rates: { [key: string]: number };
}

export interface CurrencyApiError {
  result: string;
  'error-type': string;
  'error-info'?: string;
}

const BASE_URL = 'https://open.er-api.com/v6/latest';

// Cache for API responses to avoid excessive requests
const cache = new Map<string, { data: ExchangeRateResponse; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<ExchangeRateResponse> => {
  const cacheKey = baseCurrency;
  const cached = cache.get(cacheKey);
  
  // Return cached data if it's still fresh
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  try {
    const response = await fetch(`${BASE_URL}/${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ExchangeRateResponse | CurrencyApiError = await response.json();
    
    if ('error-type' in data) {
      throw new Error(`API Error: ${data['error-type']} - ${data['error-info'] || 'Unknown error'}`);
    }
    
    // Cache the successful response
    cache.set(cacheKey, { data: data as ExchangeRateResponse, timestamp: Date.now() });
    
    return data as ExchangeRateResponse;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    
    // Return cached data if available, even if stale
    if (cached) {
      console.warn('Using stale cached data due to API error');
      return cached.data;
    }
    
    throw error;
  }
};

export const convertCurrency = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  try {
    // Get rates with fromCurrency as base
    const rates = await fetchExchangeRates(fromCurrency);
    
    if (!rates.rates[toCurrency]) {
      throw new Error(`Currency ${toCurrency} not found in exchange rates`);
    }
    
    return amount * rates.rates[toCurrency];
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
};

// Get the last update time for display
export const getLastUpdateTime = async (baseCurrency: string = 'USD'): Promise<Date> => {
  try {
    const rates = await fetchExchangeRates(baseCurrency);
    return new Date(rates.time_last_update_utc);
  } catch (error) {
    console.error('Error getting last update time:', error);
    return new Date(); // Return current time as fallback
  }
};
