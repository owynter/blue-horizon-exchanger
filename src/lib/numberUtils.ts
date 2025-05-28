
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
