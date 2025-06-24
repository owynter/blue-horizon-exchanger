import React from 'react';
import { Currency } from '@/data/AllCurrencies';

interface FlagDisplayProps {
  currency: Currency;
  size?: 'sm' | 'md' | 'lg';
  showFallback?: boolean;
}

const FlagDisplay: React.FC<FlagDisplayProps> = ({ 
  currency, 
  size = 'md',
  showFallback = true 
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  // Get country code from currency for fallback
  const getCountryCode = (currencyCode: string): string => {
    const countryMap: { [key: string]: string } = {
      USD: 'US', EUR: 'EU', GBP: 'GB', CAD: 'CA', AUD: 'AU', JPY: 'JP', 
      CHF: 'CH', BRL: 'BR', COP: 'CO', DOP: 'DO', PEN: 'PE', CLP: 'CL', 
      CRC: 'CR', XCD: 'XC', JMD: 'JM', CNY: 'CN', INR: 'IN', KRW: 'KR',
      SGD: 'SG', HKD: 'HK', NZD: 'NZ', MXN: 'MX', RUB: 'RU', ZAR: 'ZA',
      TRY: 'TR', SEK: 'SE', NOK: 'NO', DKK: 'DK', PLN: 'PL', CZK: 'CZ',
      HUF: 'HU', RON: 'RO', BGN: 'BG', HRK: 'HR', ISK: 'IS', AED: 'AE',
      SAR: 'SA', QAR: 'QA', KWD: 'KW', BHD: 'BH', OMR: 'OM', JOD: 'JO',
      EGP: 'EG', ILS: 'IL', NGN: 'NG', GHS: 'GH', KES: 'KE', MAD: 'MA',
      TND: 'TN', THB: 'TH', IDR: 'ID', MYR: 'MY', PHP: 'PH', VND: 'VN',
      BDT: 'BD', PKR: 'PK', LKR: 'LK', NPR: 'NP', KZT: 'KZ', MNT: 'MN',
      TWD: 'TW', ARS: 'AR', UYU: 'UY', PYG: 'PY', BOB: 'BO', VES: 'VE',
      // Crypto fallbacks
      BTC: '₿', ETH: 'Ξ', BNB: 'BNB', XRP: 'XRP', ADA: 'ADA', SOL: 'SOL'
    };
    return countryMap[currencyCode] || currencyCode.slice(0, 2);
  };

  // Check if flag emoji is supported (basic check)
  const isFlagSupported = (flag: string): boolean => {
    // For crypto currencies, always show the symbol
    if (currency.type === 'crypto') return false;
    
    // Simple check for flag support - if it's not a flag emoji, show fallback
    return flag.length > 1 && (flag.includes('🇦') || flag.includes('🇧') || flag.includes('🇨') || 
           flag.includes('🇩') || flag.includes('🇪') || flag.includes('🇫') || flag.includes('🇬') ||
           flag.includes('🇭') || flag.includes('🇮') || flag.includes('🇯') || flag.includes('🇰') ||
           flag.includes('🇱') || flag.includes('🇲') || flag.includes('🇳') || flag.includes('🇴') ||
           flag.includes('🇵') || flag.includes('🇶') || flag.includes('🇷') || flag.includes('🇸') ||
           flag.includes('🇹') || flag.includes('🇺') || flag.includes('🇻') || flag.includes('🇼') ||
           flag.includes('🇽') || flag.includes('🇾') || flag.includes('🇿'));
  };

  const shouldShowFallback = !isFlagSupported(currency.flag) || currency.type === 'crypto';

  return (
    <div className="flex items-center">
      {!shouldShowFallback ? (
        <span className={`flag-emoji ${sizeClasses[size]}`} style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}>
          {currency.flag}
        </span>
      ) : (
        <div className={`flag-fallback inline-flex items-center justify-center w-6 h-4 text-xs font-bold text-white bg-blue-500 rounded-sm ${sizeClasses[size]}`}>
          {getCountryCode(currency.code)}
        </div>
      )}
    </div>
  );
};

export default FlagDisplay;