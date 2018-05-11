import { formatNumberMetricPrefix } from './formatNumberMetricPrefix';

describe('Utils | formatNumberMetricPrefix', () => {
  it("Doesn't format value less than 1000", () => {
    expect(formatNumberMetricPrefix(999))
      .toEqual('999');
  });
  
  it('Formats number between 1000 and 999 999 as k', () => {
    expect(formatNumberMetricPrefix(999999))
      .toEqual('1000k');
  });
  
  it('Formats number between 1 000 000 and 999 999 999 as M', () => {
    expect(formatNumberMetricPrefix(999999999))
      .toEqual('1000M');
  });
  
  it('Formats number between 1 000 000 000 and 999 999 999 999 as G', () => {
    expect(formatNumberMetricPrefix(999999999999))
      .toEqual('1000G');
  });
  
  it('Formats number between 1 000 000 000 000 and 999 999 999 999 999 as T', () => {
    expect(formatNumberMetricPrefix(999999999999999))
      .toEqual('1000T');
  });
  
  it('Formats number between 1 000 000 000 000 000 and 900 000 000 000 000 000 as P', () => {
    expect(formatNumberMetricPrefix(900000000000000000))
      .toEqual('900P');
  });
  
  it('Formats number between 1 000 000 000 000 000 000 and more as E', () => {
    expect(formatNumberMetricPrefix(999999999999999999999))
      .toEqual('1000E');
  });
});
