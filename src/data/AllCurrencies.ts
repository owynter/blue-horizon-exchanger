export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
  isFavorite?: boolean;
}

export interface ExchangeRates {
  [key: string]: number;
}

export interface TargetCurrency {
  id: string;
  code: string;
}

// Comprehensive list of world currencies (170+ currencies)
export const allCurrencies: Currency[] = [
  // Major currencies (default favorites)
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', country: 'United States', isFavorite: true },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', country: 'European Union', isFavorite: true },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', country: 'United Kingdom', isFavorite: true },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', country: 'Japan', isFavorite: true },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', country: 'Canada', isFavorite: true },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', country: 'Australia', isFavorite: true },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', country: 'Switzerland', isFavorite: true },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', country: 'China', isFavorite: true },
  
  // Regional favorites
  { code: 'XCD', name: 'Eastern Caribbean Dollar', symbol: 'EC$', flag: '🇦🇬', country: 'Eastern Caribbean', isFavorite: true },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴', country: 'Colombia', isFavorite: true },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', flag: '🇩🇴', country: 'Dominican Republic', isFavorite: true },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪', country: 'Peru', isFavorite: true },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱', country: 'Chile', isFavorite: true },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡', flag: '🇨🇷', country: 'Costa Rica', isFavorite: true },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', flag: '🇯🇲', country: 'Jamaica', isFavorite: true },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', country: 'Brazil', isFavorite: true },

  // Additional major currencies
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', country: 'India' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', country: 'South Korea' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', country: 'Singapore' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', country: 'Hong Kong' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', country: 'New Zealand' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', country: 'Mexico' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', country: 'Russia' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', country: 'South Africa' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', country: 'Turkey' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', country: 'Sweden' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', country: 'Norway' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', country: 'Denmark' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł', flag: '🇵🇱', country: 'Poland' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', country: 'Czech Republic' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', country: 'Hungary' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴', country: 'Romania' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬', country: 'Bulgaria' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷', country: 'Croatia' },
  { code: 'ISK', name: 'Icelandic Króna', symbol: 'kr', flag: '🇮🇸', country: 'Iceland' },

  // Middle East & Africa
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', country: 'United Arab Emirates' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦', country: 'Saudi Arabia' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', flag: '🇶🇦', country: 'Qatar' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼', country: 'Kuwait' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭', country: 'Bahrain' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼', flag: '🇴🇲', country: 'Oman' },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '🇯🇴', country: 'Jordan' },
  { code: 'LBP', name: 'Lebanese Pound', symbol: '£', flag: '🇱🇧', country: 'Lebanon' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', flag: '🇪🇬', country: 'Egypt' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱', country: 'Israel' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬', country: 'Nigeria' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭', country: 'Ghana' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪', country: 'Kenya' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬', country: 'Uganda' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿', country: 'Tanzania' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹', country: 'Ethiopia' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦', country: 'Morocco' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳', country: 'Tunisia' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '🇩🇿', country: 'Algeria' },

  // Asia Pacific
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', country: 'Thailand' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', country: 'Indonesia' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', country: 'Malaysia' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', country: 'Philippines' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', country: 'Vietnam' },
  { code: 'LAK', name: 'Lao Kip', symbol: '₭', flag: '🇱🇦', country: 'Laos' },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛', flag: '🇰🇭', country: 'Cambodia' },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K', flag: '🇲🇲', country: 'Myanmar' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', country: 'Bangladesh' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰', country: 'Pakistan' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: '₨', flag: '🇱🇰', country: 'Sri Lanka' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨', flag: '🇳🇵', country: 'Nepal' },
  { code: 'BTN', name: 'Bhutanese Ngultrum', symbol: 'Nu.', flag: '🇧🇹', country: 'Bhutan' },
  { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'Rf', flag: '🇲🇻', country: 'Maldives' },
  { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', flag: '🇦🇫', country: 'Afghanistan' },
  { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', flag: '🇰🇿', country: 'Kazakhstan' },
  { code: 'UZS', name: 'Uzbekistani Som', symbol: 'лв', flag: '🇺🇿', country: 'Uzbekistan' },
  { code: 'KGS', name: 'Kyrgyzstani Som', symbol: 'лв', flag: '🇰🇬', country: 'Kyrgyzstan' },
  { code: 'TJS', name: 'Tajikistani Somoni', symbol: 'SM', flag: '🇹🇯', country: 'Tajikistan' },
  { code: 'TMT', name: 'Turkmenistani Manat', symbol: 'T', flag: '🇹🇲', country: 'Turkmenistan' },
  { code: 'MNT', name: 'Mongolian Tugrik', symbol: '₮', flag: '🇲🇳', country: 'Mongolia' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼', country: 'Taiwan' },
  { code: 'KPW', name: 'North Korean Won', symbol: '₩', flag: '🇰🇵', country: 'North Korea' },

  // Latin America
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷', country: 'Argentina' },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', flag: '🇺🇾', country: 'Uruguay' },
  { code: 'PYG', name: 'Paraguayan Guarani', symbol: 'Gs', flag: '🇵🇾', country: 'Paraguay' },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: '$b', flag: '🇧🇴', country: 'Bolivia' },
  { code: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs', flag: '🇻🇪', country: 'Venezuela' },
  { code: 'GYD', name: 'Guyanese Dollar', symbol: '$', flag: '🇬🇾', country: 'Guyana' },
  { code: 'SRD', name: 'Surinamese Dollar', symbol: '$', flag: '🇸🇷', country: 'Suriname' },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', flag: '🇬🇹', country: 'Guatemala' },
  { code: 'HNL', name: 'Honduran Lempira', symbol: 'L', flag: '🇭🇳', country: 'Honduras' },
  { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$', flag: '🇳🇮', country: 'Nicaragua' },
  { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.', flag: '🇵🇦', country: 'Panama' },
  { code: 'BZD', name: 'Belize Dollar', symbol: 'BZ$', flag: '🇧🇿', country: 'Belize' },
  { code: 'SVC', name: 'Salvadoran Colón', symbol: '$', flag: '🇸🇻', country: 'El Salvador' },

  // Caribbean
  { code: 'TTD', name: 'Trinidad and Tobago Dollar', symbol: 'TT$', flag: '🇹🇹', country: 'Trinidad and Tobago' },
  { code: 'BBD', name: 'Barbadian Dollar', symbol: '$', flag: '🇧🇧', country: 'Barbados' },
  { code: 'BMD', name: 'Bermudian Dollar', symbol: '$', flag: '🇧🇲', country: 'Bermuda' },
  { code: 'BSD', name: 'Bahamian Dollar', symbol: '$', flag: '🇧🇸', country: 'Bahamas' },
  { code: 'KYD', name: 'Cayman Islands Dollar', symbol: '$', flag: '🇰🇾', country: 'Cayman Islands' },
  { code: 'AWG', name: 'Aruban Florin', symbol: 'ƒ', flag: '🇦🇼', country: 'Aruba' },
  { code: 'ANG', name: 'Netherlands Antillean Guilder', symbol: 'ƒ', flag: '🇨🇼', country: 'Curaçao' },
  { code: 'HTG', name: 'Haitian Gourde', symbol: 'G', flag: '🇭🇹', country: 'Haiti' },
  { code: 'CUP', name: 'Cuban Peso', symbol: '₱', flag: '🇨🇺', country: 'Cuba' },

  // Pacific
  { code: 'FJD', name: 'Fijian Dollar', symbol: '$', flag: '🇫🇯', country: 'Fiji' },
  { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$', flag: '🇹🇴', country: 'Tonga' },
  { code: 'WST', name: 'Samoan Tala', symbol: 'T', flag: '🇼🇸', country: 'Samoa' },
  { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'Vt', flag: '🇻🇺', country: 'Vanuatu' },
  { code: 'SBD', name: 'Solomon Islands Dollar', symbol: '$', flag: '🇸🇧', country: 'Solomon Islands' },
  { code: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K', flag: '🇵🇬', country: 'Papua New Guinea' },
  { code: 'XPF', name: 'CFP Franc', symbol: '₣', flag: '🇵🇫', country: 'French Polynesia' },

  // Additional European currencies
  { code: 'ALL', name: 'Albanian Lek', symbol: 'L', flag: '🇦🇱', country: 'Albania' },
  { code: 'MKD', name: 'Macedonian Denar', symbol: 'ден', flag: '🇲🇰', country: 'North Macedonia' },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'Дин.', flag: '🇷🇸', country: 'Serbia' },
  { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM', flag: '🇧🇦', country: 'Bosnia and Herzegovina' },
  { code: 'MDL', name: 'Moldovan Leu', symbol: 'L', flag: '🇲🇩', country: 'Moldova' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦', country: 'Ukraine' },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', flag: '🇧🇾', country: 'Belarus' },
  { code: 'GEL', name: 'Georgian Lari', symbol: '₾', flag: '🇬🇪', country: 'Georgia' },
  { code: 'AMD', name: 'Armenian Dram', symbol: '֏', flag: '🇦🇲', country: 'Armenia' },
  { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼', flag: '🇦🇿', country: 'Azerbaijan' },
];

// Get favorite currencies
export const getFavoriteCurrencies = (): Currency[] => {
  return allCurrencies.filter(currency => currency.isFavorite);
};

// Get all currencies sorted by name
export const getAllCurrenciesSorted = (): Currency[] => {
  return [...allCurrencies].sort((a, b) => a.name.localeCompare(b.name));
};

// Get currencies by region/continent
export const getCurrenciesByRegion = (region: string): Currency[] => {
  const regionMap: { [key: string]: string[] } = {
    'North America': ['USD', 'CAD', 'MXN'],
    'Europe': ['EUR', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'HRK', 'ISK'],
    'Asia': ['JPY', 'CNY', 'INR', 'KRW', 'SGD', 'HKD', 'THB', 'IDR', 'MYR', 'PHP', 'VND'],
    'Oceania': ['AUD', 'NZD', 'FJD', 'TOP', 'WST', 'VUV', 'SBD', 'PGK'],
    'Latin America': ['BRL', 'ARS', 'COP', 'PEN', 'CLP', 'UYU', 'PYG', 'BOB', 'VES'],
    'Caribbean': ['XCD', 'JMD', 'DOP', 'TTD', 'BBD', 'BMD', 'BSD', 'KYD'],
    'Middle East': ['AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR', 'JOD', 'ILS'],
    'Africa': ['ZAR', 'NGN', 'EGP', 'GHS', 'KES', 'UGX', 'TZS', 'ETB', 'MAD']
  };
  
  const codes = regionMap[region] || [];
  return allCurrencies.filter(currency => codes.includes(currency.code));
};

// Search currencies by name or code
export const searchCurrencies = (query: string): Currency[] => {
  const searchTerm = query.toLowerCase();
  return allCurrencies.filter(currency => 
    currency.name.toLowerCase().includes(searchTerm) ||
    currency.code.toLowerCase().includes(searchTerm) ||
    currency.country.toLowerCase().includes(searchTerm)
  );
};

// Toggle favorite status
export const toggleCurrencyFavorite = (currencyCode: string): Currency[] => {
  const updatedCurrencies = allCurrencies.map(currency => 
    currency.code === currencyCode 
      ? { ...currency, isFavorite: !currency.isFavorite }
      : currency
  );
  
  // Save to localStorage
  const favorites = updatedCurrencies
    .filter(c => c.isFavorite)
    .map(c => c.code);
  localStorage.setItem('favoriteCurrencies', JSON.stringify(favorites));
  
  return updatedCurrencies;
};

// Load favorites from localStorage
export const loadFavoritesFromStorage = (): void => {
  try {
    const stored = localStorage.getItem('favoriteCurrencies');
    if (stored) {
      const favoritesCodes = JSON.parse(stored) as string[];
      allCurrencies.forEach(currency => {
        currency.isFavorite = favoritesCodes.includes(currency.code);
      });
    }
  } catch (error) {
    console.error('Error loading favorites from storage:', error);
  }
};

// Initialize favorites on load
loadFavoritesFromStorage(); 