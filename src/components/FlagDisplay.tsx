
import React from 'react';
import { Currency } from '@/data/CurrencyData';

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

  // Get country code from currency code for fallback
  const getCountryCode = (currencyCode: string): string => {
    const countryMap: { [key: string]: string } = {
      USD: 'US',
      EUR: 'EU',
      GBP: 'GB',
      CAD: 'CA',
      AUD: 'AU',
      JPY: 'JP',
      CHF: 'CH',
      BRL: 'BR',
      COP: 'CO',
      DOP: 'DO',
      PEN: 'PE',
      CLP: 'CL',
      CRC: 'CR',
      XCD: 'XC',
      JMD: 'JM'
    };
    return countryMap[currencyCode] || currencyCode.slice(0, 2);
  };

  return (
    <>
      <span className={`flag-emoji ${sizeClasses[size]}`}>
        {currency.flag}
      </span>
      {showFallback && (
        <span className="flag-fallback ml-1 lg:hidden">
          {getCountryCode(currency.code)}
        </span>
      )}
    </>
  );
};

export default FlagDisplay;
