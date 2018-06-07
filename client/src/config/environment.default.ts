import { IEnvironment } from './environment';

export const environmentDefault: IEnvironment = {
  apiUrl: 'https://api.testnet.ergoplatform.com',
  blockchain: {
    coinName: 'Ergo'
  },
  defaultLocale: 'en',
  isLoggerEnabled: true,
};
