import formatNumber from 'format-number';

import environment from '../config/environment';

import { formatNumberMetricPrefix } from './formatNumberMetricPrefix';

export const convertInfoItemValue = (key: string, value: any): any => {
  switch (key) {
    case 'supply': {
      return formatNumber({
        integerSeparator: ' ',
        suffix: ` ${environment.blockchain.coinName}`,
      })(value / 1e9);
    }

    case 'chart': {
      return formatNumber({ integerSeparator: ' ' })(value);
    }

    case 'coin': {
      return formatNumber({
        integerSeparator: ' ',
        suffix: ` ${environment.blockchain.coinName.toUpperCase()}`,
      })(value);
    }

    case 'bytes': {
      return formatNumberMetricPrefix(value, { desiredFormat: 'k' }) + 'B';
    }

    case 'marketCap': {
      return formatNumber({
        prefix: `$`,
      })(value);
    }

    case 'transactionAverage': {
      return formatNumber({ integerSeparator: ' ' })(value);
    }

    case 'hashRate': {
      return formatNumberMetricPrefix(value) + 'H/s';
    }

    case 'hashRateDay': {
      return formatNumberMetricPrefix(value) + 'H/d';
    }

    case 'max-supply': {
      return '97 739 924 ERG';
    }

    default: {
      return value;
    }
  }
};
