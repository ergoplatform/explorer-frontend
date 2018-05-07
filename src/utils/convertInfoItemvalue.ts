import formatNumber from 'format-number';
import environment from '../config/environment';
import { formatNumberMetricPrefix } from './formatNumberMetricPrefix';

export const convertInfoItemValue = (key: string, value: any): any => {
  switch (key) {
    case 'supply': {
      return formatNumber({
        suffix: ` ${environment.blockchain.coinName}`
      })(value);
    }
    
    case 'marketCap': {
      return formatNumber({
        prefix: `$`
      })(value);
    }
    
    case 'transactionAverage': {
      return formatNumber({ integerSeparator: ' ' })(value);
    }
    
    case 'hashRate': {
      return formatNumberMetricPrefix(value) + 'H/s';
    }
    
    default: {
      return value;
    }
  }
};
