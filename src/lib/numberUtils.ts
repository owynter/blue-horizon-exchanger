export const formatNumberWithCommas = (value: string | number): string => {
  if (!value) return '0';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '0';
  
  console.log('formatNumberWithCommas input:', value, 'parsed:', numValue);
  
  // Force US locale formatting with explicit options
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(numValue);
  
  console.log('formatNumberWithCommas output:', formatted);
  return formatted;
};

export const removeCommas = (value: string): string => {
  const cleaned = value.replace(/,/g, '');
  console.log('removeCommas input:', value, 'output:', cleaned);
  return cleaned;
};

// Function to format numbers with or without decimals
export const formatNumberWithDecimals = (value: string | number, showDecimals: boolean = true): string => {
  if (!value) return showDecimals ? '0.00' : '0';
  
  // Remove commas first before parsing, just like other functions
  const cleanValue = typeof value === 'string' ? removeCommas(value) : value.toString();
  const numValue = typeof value === 'string' ? parseFloat(cleanValue) : value;
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
    // Round up to nearest whole number and format with thousands separators
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

// Simplified input number formatting for better cursor handling
export const formatInputNumber = (value: string, isAtEnd: boolean = false, showDecimals: boolean = true): string => {
  // Remove all commas first
  const cleanValue = removeCommas(value);
  
  console.log('formatInputNumber input:', value, 'cleaned:', cleanValue, 'isAtEnd:', isAtEnd, 'showDecimals:', showDecimals);
  
  if (!cleanValue || cleanValue === '0') return showDecimals ? '0.00' : '0';
  
  const numValue = parseFloat(cleanValue);
  if (isNaN(numValue)) return showDecimals ? '0.00' : '0';
  
  // Simpler formatting to reduce cursor jumping
  const formatted = new Intl.NumberFormat('en-US', {
    useGrouping: true
  }).format(numValue);
  console.log('formatInputNumber output:', formatted);
  return formatted;
};

// Improved cursor position calculation
export const calculateCursorPosition = (
  originalValue: string,
  newValue: string,
  originalCursorPos: number
): number => {
  // If cursor was at the end, keep it at the end
  if (originalCursorPos === originalValue.length) {
    return newValue.length;
  }
  
  // Count non-comma characters before cursor in original value
  const originalPrefix = originalValue.substring(0, originalCursorPos);
  const nonCommasBefore = originalPrefix.replace(/,/g, '').length;
  
  // Find position in new value that corresponds to same number of non-comma characters
  let charCount = 0;
  for (let i = 0; i < newValue.length; i++) {
    if (newValue[i] !== ',') {
      charCount++;
    }
    if (charCount === nonCommasBefore) {
      return i + 1;
    }
  }
  
  return Math.min(newValue.length, originalCursorPos);
};
