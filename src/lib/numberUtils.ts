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
  if (!value) return '0';
  
  // FIXED: Remove commas first before parsing, just like other functions
  const cleanValue = typeof value === 'string' ? removeCommas(value) : value.toString();
  const numValue = typeof value === 'string' ? parseFloat(cleanValue) : value;
  if (isNaN(numValue)) return '0';
  
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

// New function to handle cursor-friendly number input
export const formatInputNumber = (value: string, isAtEnd: boolean = false, showDecimals: boolean = true): string => {
  // Remove all commas first
  const cleanValue = removeCommas(value);
  
  console.log('formatInputNumber input:', value, 'cleaned:', cleanValue, 'isAtEnd:', isAtEnd, 'showDecimals:', showDecimals);
  
  if (!cleanValue || cleanValue === '0') return showDecimals ? '0' : '0';
  
  const numValue = parseFloat(cleanValue);
  if (isNaN(numValue)) return showDecimals ? '0' : '0';
  
  // If decimals are disabled, format as whole number with commas
  if (!showDecimals) {
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(Math.floor(numValue));
    console.log('formatInputNumber (no decimals) output:', formatted);
    return formatted;
  }
  
  // If cursor is at the end and user is typing, don't force decimal places
  if (isAtEnd && !cleanValue.includes('.')) {
    const formatted = new Intl.NumberFormat('en-US', {
      useGrouping: true
    }).format(numValue);
    console.log('formatInputNumber (at end, no decimal) output:', formatted);
    return formatted;
  }
  
  // For other cases, use standard formatting with proper comma removal
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(numValue);
  console.log('formatInputNumber (standard) output:', formatted);
  return formatted;
};

// Function to calculate cursor position after formatting
export const calculateCursorPosition = (
  originalValue: string,
  newValue: string,
  originalCursorPos: number
): number => {
  // Count commas before cursor in original value
  const commasBefore = (originalValue.substring(0, originalCursorPos).match(/,/g) || []).length;
  
  // Count commas before cursor in new value
  const newCommasBefore = (newValue.substring(0, originalCursorPos).match(/,/g) || []).length;
  
  // Adjust cursor position based on comma difference
  const adjustment = newCommasBefore - commasBefore;
  return Math.max(0, Math.min(newValue.length, originalCursorPos + adjustment));
};
