import { IEnvironment } from './environment';

export const environmentDefault: IEnvironment = {
  apiUrl: 'https://api.testnet.ergoplatform.com',
  blockchain: {
    coinName: 'Ergo'
  },
  defaultLocale: 'en',
  environments: [
    {
      name: 'Testnet',
      url: 'https://testnet.ergoplatform.com',
    }
  ],
  isLoggerEnabled: true,
};
