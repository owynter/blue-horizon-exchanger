
export const formatNumberWithCommas = (value: string | number): string => {
  if (!value) return '0';
  
  const stringValue = typeof value === 'string' ? value : value.toString();
  const cleanValue = removeCommas(stringValue);
  
  console.log('formatNumberWithCommas input:', value, 'cleaned:', cleanValue);
  
  // Handle decimal numbers specially to preserve structure
  if (cleanValue.includes('.')) {
    const parts = cleanValue.split('.');
    const wholePart = parts[0];
    const decimalPart = parts[1];
    
    const numValue = parseFloat(wholePart);
    if (isNaN(numValue)) return '0';
    
    const formattedWhole = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(numValue);
    
    const result = `${formattedWhole}.${decimalPart}`;
    console.log('formatNumberWithCommas (decimal) output:', result);
    return result;
  } else {
    const numValue = parseFloat(cleanValue);
    if (isNaN(numValue)) return '0';
    
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(numValue);
    
    console.log('formatNumberWithCommas (whole) output:', formatted);
    return formatted;
  }
};

export const removeCommas = (value: string): string => {
  const cleaned = value.replace(/,/g, '');
  console.log('removeCommas input:', value, 'output:', cleaned);
  return cleaned;
};

// Function to format numbers with or without decimals
export const formatNumberWithDecimals = (value: string | number, showDecimals: boolean = true): string => {
  if (!value) return showDecimals ? '0.00' : '0';
  
  const cleanValue = typeof value === 'string' ? removeCommas(value) : value.toString();
  const numValue = parseFloat(cleanValue);
  if (isNaN(numValue)) return showDecimals ? '0.00' : '0';
  
  console.log('formatNumberWithDecimals input:', value, 'cleaned:', cleanValue, 'parsed:', numValue, 'showDecimals:', showDecimals);
  
  if (showDecimals) {
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(numValue);
    console.log('formatNumberWithDecimals (with decimals) output:', formatted);
    return formatted;
  } else {
    const roundedValue = Math.ceil(numValue);
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(roundedValue);
    console.log('formatNumberWithDecimals (no decimals) output:', formatted);
    return formatted;
  }
};
