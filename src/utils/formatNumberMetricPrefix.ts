const ranges = [
  { divider: 1e18, suffix: 'E' },
  { divider: 1e15, suffix: 'P' },
  { divider: 1e12, suffix: 'T' },
  { divider: 1e9, suffix: 'G' },
  { divider: 1e6, suffix: 'M' },
  { divider: 1e3, suffix: 'k' },
];

interface FormatOptions {
  desiredFormat?: string;
  fractionDigits?: number;
}

export function formatNumberMetricPrefix(
  originalNumber: number,
  options?: FormatOptions
): string {
  const desiredFormat = options ? options.desiredFormat || null : null;
  const fractionDigits = options
    ? Number.isInteger(options.fractionDigits as number)
      ? options.fractionDigits
      : 2
    : 2;

  if (desiredFormat) {
    const selectedRange = ranges.find(
      (range) => range.suffix === desiredFormat
    );

    if (!selectedRange) {
      return originalNumber.toString();
    }

    return (
      (originalNumber / selectedRange.divider).toFixed(fractionDigits) +
      ' ' +
      selectedRange.suffix
    );
  }

  for (const range of ranges) {
    if (originalNumber >= range.divider) {
      return (
        (originalNumber / range.divider).toFixed(fractionDigits) +
        ' ' +
        range.suffix
      );
    }
  }

  return originalNumber.toString();
}
