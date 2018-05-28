const ranges = [
  { divider: 1e18, suffix: 'E' },
  { divider: 1e15, suffix: 'P' },
  { divider: 1e12, suffix: 'T' },
  { divider: 1e9, suffix: 'G' },
  { divider: 1e6, suffix: 'M' },
  { divider: 1e3, suffix: 'k' }
];

export function formatNumberMetricPrefix (originalNumber: number, desiredFormat?: string): string {
  if (desiredFormat) {
    const selectedRange = ranges.find((range) => range.suffix === desiredFormat);
    
    if (!selectedRange) {
      return originalNumber.toString();
    }
    
    return (originalNumber / selectedRange.divider).toFixed(2) + ' ' + selectedRange.suffix;
  }
  
  for (const range of ranges) {
    if (originalNumber >= range.divider) {
      return (originalNumber / range.divider).toFixed(2) + ' ' + range.suffix;
    }
  }
  
  return originalNumber.toString();
}
