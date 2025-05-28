
export const formatNumberWithCommas = (value: string | number): string => {
  if (!value) return '0';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '0';
  
  return numValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const removeCommas = (value: string): string => {
  return value.replace(/,/g, '');
};

// Function to format numbers with or without decimals
export const formatNumberWithDecimals = (value: string | number, showDecimals: boolean = true): string => {
  if (!value) return '0';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '0';
  
  if (showDecimals) {
    return numValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } else {
    // Round up to nearest whole number
    const roundedValue = Math.ceil(numValue);
    return roundedValue.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
};

// New function to handle cursor-friendly number input
export const formatInputNumber = (value: string, isAtEnd: boolean = false): string => {
  // Remove all commas first
  const cleanValue = removeCommas(value);
  
  // If cursor is at the end and user is typing, don't force decimal places
  if (isAtEnd && !cleanValue.includes('.')) {
    const numValue = parseFloat(cleanValue);
    if (isNaN(numValue)) return '0';
    return numValue.toLocaleString('en-US');
  }
  
  // For other cases, use standard formatting
  return formatNumberWithCommas(cleanValue);
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
