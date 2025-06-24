export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
  isFavorite?: boolean;
  type?: 'fiat' | 'crypto';
}

export interface ExchangeRates {
  [key: string]: number;
}

export interface TargetCurrency {
  id: string;
  code: string;
}

// Comprehensive list of world currencies + top cryptocurrencies
export const allCurrencies: Currency[] = [
  // Top 6 Cryptocurrencies
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', flag: '🟠', country: 'Digital Currency', type: 'crypto' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', flag: '🔷', country: 'Digital Currency', type: 'crypto' },
  { code: 'BNB', name: 'BNB', symbol: 'BNB', flag: '🟡', country: 'Digital Currency', type: 'crypto' },
  { code: 'XRP', name: 'XRP', symbol: 'XRP', flag: '🔵', country: 'Digital Currency', type: 'crypto' },
  { code: 'ADA', name: 'Cardano', symbol: 'ADA', flag: '🔷', country: 'Digital Currency', type: 'crypto' },
  { code: 'SOL', name: 'Solana', symbol: 'SOL', flag: '🟣', country: 'Digital Currency', type: 'crypto' },

  // Major currencies (default favorites from original list)
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', country: 'United States', isFavorite: true, type: 'fiat' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', country: 'European Union', isFavorite: true, type: 'fiat' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', country: 'United Kingdom', isFavorite: true, type: 'fiat' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', country: 'Japan', isFavorite: true, type: 'fiat' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', country: 'Canada', isFavorite: true, type: 'fiat' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', country: 'Australia', isFavorite: true, type: 'fiat' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', country: 'Switzerland', isFavorite: true, type: 'fiat' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', country: 'China', isFavorite: true, type: 'fiat' },
  
  // Regional favorites from original list
  { code: 'XCD', name: 'Eastern Caribbean Dollar', symbol: 'EC$', flag: '🇦🇬', country: 'Eastern Caribbean', isFavorite: true, type: 'fiat' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴', country: 'Colombia', isFavorite: true, type: 'fiat' },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', flag: '🇩🇴', country: 'Dominican Republic', isFavorite: true, type: 'fiat' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪', country: 'Peru', isFavorite: true, type: 'fiat' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱', country: 'Chile', isFavorite: true, type: 'fiat' },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡', flag: '🇨🇷', country: 'Costa Rica', isFavorite: true, type: 'fiat' },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', flag: '🇯🇲', country: 'Jamaica', isFavorite: true, type: 'fiat' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', country: 'Brazil', isFavorite: true, type: 'fiat' },

  // Additional major currencies
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', country: 'India', type: 'fiat' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', country: 'South Korea', type: 'fiat' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', country: 'Singapore', type: 'fiat' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', country: 'Hong Kong', type: 'fiat' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', country: 'New Zealand', type: 'fiat' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', country: 'Mexico', type: 'fiat' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', country: 'Russia', type: 'fiat' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', country: 'South Africa', type: 'fiat' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', country: 'Turkey', type: 'fiat' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', country: 'Sweden', type: 'fiat' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', country: 'Norway', type: 'fiat' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', country: 'Denmark', type: 'fiat' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł', flag: '🇵🇱', country: 'Poland', type: 'fiat' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', country: 'Czech Republic', type: 'fiat' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', country: 'Hungary', type: 'fiat' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴', country: 'Romania', type: 'fiat' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬', country: 'Bulgaria', type: 'fiat' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷', country: 'Croatia', type: 'fiat' },
  { code: 'ISK', name: 'Icelandic Króna', symbol: 'kr', flag: '🇮🇸', country: 'Iceland', type: 'fiat' },

  // Middle East & Africa
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', country: 'United Arab Emirates', type: 'fiat' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦', country: 'Saudi Arabia', type: 'fiat' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', flag: '🇶🇦', country: 'Qatar', type: 'fiat' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼', country: 'Kuwait', type: 'fiat' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭', country: 'Bahrain', type: 'fiat' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼', flag: '🇴🇲', country: 'Oman', type: 'fiat' },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '🇯🇴', country: 'Jordan', type: 'fiat' },
  { code: 'LBP', name: 'Lebanese Pound', symbol: '£', flag: '🇱🇧', country: 'Lebanon', type: 'fiat' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', flag: '🇪🇬', country: 'Egypt', type: 'fiat' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱', country: 'Israel', type: 'fiat' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬', country: 'Nigeria', type: 'fiat' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭', country: 'Ghana', type: 'fiat' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪', country: 'Kenya', type: 'fiat' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬', country: 'Uganda', type: 'fiat' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿', country: 'Tanzania', type: 'fiat' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹', country: 'Ethiopia', type: 'fiat' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦', country: 'Morocco', type: 'fiat' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳', country: 'Tunisia', type: 'fiat' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '🇩🇿', country: 'Algeria', type: 'fiat' },
  { code: 'LYD', name: 'Libyan Dinar', symbol: 'ل.د', flag: '🇱🇾', country: 'Libya', type: 'fiat' },
  { code: 'SDG', name: 'Sudanese Pound', symbol: 'ج.س.', flag: '🇸🇩', country: 'Sudan', type: 'fiat' },
  { code: 'BWP', name: 'Botswana Pula', symbol: 'P', flag: '🇧🇼', country: 'Botswana', type: 'fiat' },
  { code: 'NAD', name: 'Namibian Dollar', symbol: '$', flag: '🇳🇦', country: 'Namibia', type: 'fiat' },
  { code: 'SZL', name: 'Swazi Lilangeni', symbol: 'L', flag: '🇸🇿', country: 'Eswatini', type: 'fiat' },
  { code: 'LSL', name: 'Lesotho Loti', symbol: 'L', flag: '🇱🇸', country: 'Lesotho', type: 'fiat' },
  { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', flag: '🇲🇼', country: 'Malawi', type: 'fiat' },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', flag: '🇿🇲', country: 'Zambia', type: 'fiat' },
  { code: 'ZWL', name: 'Zimbabwean Dollar', symbol: '$', flag: '🇿🇼', country: 'Zimbabwe', type: 'fiat' },
  { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT', flag: '🇲🇿', country: 'Mozambique', type: 'fiat' },
  { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz', flag: '🇦🇴', country: 'Angola', type: 'fiat' },

  // Asia Pacific
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', country: 'Thailand', type: 'fiat' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', country: 'Indonesia', type: 'fiat' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', country: 'Malaysia', type: 'fiat' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', country: 'Philippines', type: 'fiat' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', country: 'Vietnam', type: 'fiat' },
  { code: 'LAK', name: 'Lao Kip', symbol: '₭', flag: '🇱🇦', country: 'Laos', type: 'fiat' },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛', flag: '🇰🇭', country: 'Cambodia', type: 'fiat' },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K', flag: '🇲🇲', country: 'Myanmar', type: 'fiat' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', country: 'Bangladesh', type: 'fiat' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰', country: 'Pakistan', type: 'fiat' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: '₨', flag: '🇱🇰', country: 'Sri Lanka', type: 'fiat' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨', flag: '🇳🇵', country: 'Nepal', type: 'fiat' },
  { code: 'BTN', name: 'Bhutanese Ngultrum', symbol: 'Nu.', flag: '🇧🇹', country: 'Bhutan', type: 'fiat' },
  { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'Rf', flag: '🇲🇻', country: 'Maldives', type: 'fiat' },
  { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', flag: '🇦🇫', country: 'Afghanistan', type: 'fiat' },
  { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', flag: '🇰🇿', country: 'Kazakhstan', type: 'fiat' },
  { code: 'UZS', name: 'Uzbekistani Som', symbol: 'лв', flag: '🇺🇿', country: 'Uzbekistan', type: 'fiat' },
  { code: 'KGS', name: 'Kyrgyzstani Som', symbol: 'лв', flag: '🇰🇬', country: 'Kyrgyzstan', type: 'fiat' },
  { code: 'TJS', name: 'Tajikistani Somoni', symbol: 'SM', flag: '🇹🇯', country: 'Tajikistan', type: 'fiat' },
  { code: 'TMT', name: 'Turkmenistani Manat', symbol: 'T', flag: '🇹🇲', country: 'Turkmenistan', type: 'fiat' },
  { code: 'MNT', name: 'Mongolian Tugrik', symbol: '₮', flag: '🇲🇳', country: 'Mongolia', type: 'fiat' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼', country: 'Taiwan', type: 'fiat' },
  { code: 'KPW', name: 'North Korean Won', symbol: '₩', flag: '🇰🇵', country: 'North Korea', type: 'fiat' },
  { code: 'BND', name: 'Brunei Dollar', symbol: '$', flag: '🇧🇳', country: 'Brunei', type: 'fiat' },
  { code: 'FJD', name: 'Fijian Dollar', symbol: '$', flag: '🇫🇯', country: 'Fiji', type: 'fiat' },

  // Latin America
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷', country: 'Argentina', type: 'fiat' },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', flag: '🇺🇾', country: 'Uruguay', type: 'fiat' },
  { code: 'PYG', name: 'Paraguayan Guarani', symbol: 'Gs', flag: '🇵🇾', country: 'Paraguay', type: 'fiat' },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: '$b', flag: '🇧🇴', country: 'Bolivia', type: 'fiat' },
  { code: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs', flag: '🇻🇪', country: 'Venezuela', type: 'fiat' },
  { code: 'GYD', name: 'Guyanese Dollar', symbol: '$', flag: '🇬🇾', country: 'Guyana', type: 'fiat' },
  { code: 'SRD', name: 'Surinamese Dollar', symbol: '$', flag: '🇸🇷', country: 'Suriname', type: 'fiat' },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', flag: '🇬🇹', country: 'Guatemala', type: 'fiat' },
  { code: 'HNL', name: 'Honduran Lempira', symbol: 'L', flag: '🇭🇳', country: 'Honduras', type: 'fiat' },
  { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$', flag: '🇳🇮', country: 'Nicaragua', type: 'fiat' },
  { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.', flag: '🇵🇦', country: 'Panama', type: 'fiat' },
  { code: 'BZD', name: 'Belize Dollar', symbol: 'BZ$', flag: '🇧🇿', country: 'Belize', type: 'fiat' },
  { code: 'SVC', name: 'Salvadoran Colón', symbol: '$', flag: '🇸🇻', country: 'El Salvador', type: 'fiat' },

  // Caribbean
  { code: 'TTD', name: 'Trinidad and Tobago Dollar', symbol: 'TT$', flag: '🇹🇹', country: 'Trinidad and Tobago', type: 'fiat' },
  { code: 'BBD', name: 'Barbadian Dollar', symbol: '$', flag: '🇧🇧', country: 'Barbados', type: 'fiat' },
  { code: 'BMD', name: 'Bermudian Dollar', symbol: '$', flag: '🇧🇲', country: 'Bermuda', type: 'fiat' },
  { code: 'BSD', name: 'Bahamian Dollar', symbol: '$', flag: '🇧🇸', country: 'Bahamas', type: 'fiat' },
  { code: 'KYD', name: 'Cayman Islands Dollar', symbol: '$', flag: '🇰🇾', country: 'Cayman Islands', type: 'fiat' },
  { code: 'AWG', name: 'Aruban Florin', symbol: 'ƒ', flag: '🇦🇼', country: 'Aruba', type: 'fiat' },
  { code: 'ANG', name: 'Netherlands Antillean Guilder', symbol: 'ƒ', flag: '🇨🇼', country: 'Curaçao', type: 'fiat' },
  { code: 'HTG', name: 'Haitian Gourde', symbol: 'G', flag: '🇭🇹', country: 'Haiti', type: 'fiat' },
  { code: 'CUP', name: 'Cuban Peso', symbol: '₱', flag: '🇨🇺', country: 'Cuba', type: 'fiat' },

  // Pacific
  { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$', flag: '🇹🇴', country: 'Tonga', type: 'fiat' },
  { code: 'WST', name: 'Samoan Tala', symbol: 'T', flag: '🇼🇸', country: 'Samoa', type: 'fiat' },
  { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'Vt', flag: '🇻🇺', country: 'Vanuatu', type: 'fiat' },
  { code: 'SBD', name: 'Solomon Islands Dollar', symbol: '$', flag: '🇸🇧', country: 'Solomon Islands', type: 'fiat' },
  { code: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K', flag: '🇵🇬', country: 'Papua New Guinea', type: 'fiat' },
  { code: 'XPF', name: 'CFP Franc', symbol: '₣', flag: '🇵🇫', country: 'French Polynesia', type: 'fiat' },
  { code: 'NCX', name: 'New Caledonian Franc', symbol: '₣', flag: '🇳🇨', country: 'New Caledonia', type: 'fiat' },

  // Additional European currencies
  { code: 'ALL', name: 'Albanian Lek', symbol: 'L', flag: '🇦🇱', country: 'Albania', type: 'fiat' },
  { code: 'MKD', name: 'Macedonian Denar', symbol: 'ден', flag: '🇲🇰', country: 'North Macedonia', type: 'fiat' },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'Дин.', flag: '🇷🇸', country: 'Serbia', type: 'fiat' },
  { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM', flag: '🇧🇦', country: 'Bosnia and Herzegovina', type: 'fiat' },
  { code: 'MDL', name: 'Moldovan Leu', symbol: 'L', flag: '🇲🇩', country: 'Moldova', type: 'fiat' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦', country: 'Ukraine', type: 'fiat' },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', flag: '🇧🇾', country: 'Belarus', type: 'fiat' },
  { code: 'GEL', name: 'Georgian Lari', symbol: '₾', flag: '🇬🇪', country: 'Georgia', type: 'fiat' },
  { code: 'AMD', name: 'Armenian Dram', symbol: '֏', flag: '🇦🇲', country: 'Armenia', type: 'fiat' },
  { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼', flag: '🇦🇿', country: 'Azerbaijan', type: 'fiat' },

  // Additional currencies
  { code: 'IQD', name: 'Iraqi Dinar', symbol: 'ع.د', flag: '🇮🇶', country: 'Iraq', type: 'fiat' },
  { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', flag: '🇮🇷', country: 'Iran', type: 'fiat' },
  { code: 'SYP', name: 'Syrian Pound', symbol: '£', flag: '🇸🇾', country: 'Syria', type: 'fiat' },
  { code: 'YER', name: 'Yemeni Rial', symbol: '﷼', flag: '🇾🇪', country: 'Yemen', type: 'fiat' },
];

// Cookie-based favorites management
const FAVORITES_COOKIE_NAME = 'currency_favorites';

// Get favorite currencies
export const getFavoriteCurrencies = (): Currency[] => {
  const favorites = getFavoritesFromCookie();
  return allCurrencies.filter(currency => 
    currency.isFavorite || favorites.includes(currency.code)
  );
};

// Get non-favorite currencies
export const getNonFavoriteCurrencies = (): Currency[] => {
  const favorites = getFavoritesFromCookie();
  return allCurrencies.filter(currency => 
    !currency.isFavorite && !favorites.includes(currency.code)
  );
};

// Get all currencies with favorites sorted first
export const getAllCurrenciesSorted = (): Currency[] => {
  const favorites = getFavoriteCurrencies();
  const nonFavorites = getNonFavoriteCurrencies().sort((a, b) => a.name.localeCompare(b.name));
  return [...favorites, ...nonFavorites];  
};

// Get currencies by type
export const getCurrenciesByType = (type: 'fiat' | 'crypto'): Currency[] => {
  return allCurrencies.filter(currency => currency.type === type);
};

// Get cryptocurrencies
export const getCryptoCurrencies = (): Currency[] => {
  return getCurrenciesByType('crypto');
};

// Get fiat currencies
export const getFiatCurrencies = (): Currency[] => {
  return getCurrenciesByType('fiat');
};

// Search currencies by name, code, or country
export const searchCurrencies = (query: string): Currency[] => {
  const searchTerm = query.toLowerCase();
  const results = allCurrencies.filter(currency => 
    currency.name.toLowerCase().includes(searchTerm) ||
    currency.code.toLowerCase().includes(searchTerm) ||
    currency.country.toLowerCase().includes(searchTerm)
  );
  
  // Sort results with favorites first
  const favorites = getFavoritesFromCookie();
  const favoriteResults = results.filter(c => c.isFavorite || favorites.includes(c.code));
  const nonFavoriteResults = results.filter(c => !c.isFavorite && !favorites.includes(c.code));
  
  return [...favoriteResults, ...nonFavoriteResults];
};

// Cookie management functions
export const getFavoritesFromCookie = (): string[] => {
  if (typeof document === 'undefined') return [];
  
  try {
    const cookies = document.cookie.split(';');
    const favoriteCookie = cookies.find(cookie => 
      cookie.trim().startsWith(FAVORITES_COOKIE_NAME + '=')
    );
    
    if (favoriteCookie) {
      const value = favoriteCookie.split('=')[1];
      return JSON.parse(decodeURIComponent(value));
    }
  } catch (error) {
    console.error('Error reading favorites from cookie:', error);
  }
  
  return [];
};

export const saveFavoritesToCookie = (favorites: string[]): void => {
  if (typeof document === 'undefined') return;
  
  try {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // 1 year expiration
    
    document.cookie = `${FAVORITES_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(favorites))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  } catch (error) {
    console.error('Error saving favorites to cookie:', error);
  }
};

// Toggle favorite status
export const toggleCurrencyFavorite = (currencyCode: string): void => {
  const currentFavorites = getFavoritesFromCookie();
  const isCurrentlyFavorite = currentFavorites.includes(currencyCode);
  
  let newFavorites: string[];
  
  if (isCurrentlyFavorite) {
    // Remove from favorites
    newFavorites = currentFavorites.filter(code => code !== currencyCode);
  } else {
    // Add to favorites
    newFavorites = [...currentFavorites, currencyCode];
  }
  
  saveFavoritesToCookie(newFavorites);
};

// Check if currency is favorite
export const isCurrencyFavorite = (currencyCode: string): boolean => {
  const currency = allCurrencies.find(c => c.code === currencyCode);
  const favorites = getFavoritesFromCookie();
  return currency?.isFavorite || favorites.includes(currencyCode);
};

// Get currency by code
export const getCurrencyByCode = (code: string): Currency | undefined => {
  return allCurrencies.find(currency => currency.code === code);
};

// Get currencies for dropdown (favorites first, then others)
export const getCurrenciesForDropdown = (): Currency[] => {
  return getAllCurrenciesSorted();
};

// Initialize favorites from cookie (called on app start)
export const initializeFavorites = (): void => {
  // This function can be called to sync with cookies if needed
  // Currently handled by the getter functions
}; 