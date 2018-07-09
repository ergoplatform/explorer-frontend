import { IEnvironment } from './environment';

export const environmentDefault: IEnvironment = {
  apiUrl: 'https://api.testnet.ergoplatform.com',
  blockchain: {
    coinName: 'Ergo'
  },
  defaultLocale: 'en',
  environments: [
    {
      name: 'Dev',
      url: 'http://localhost:3000',
    }
  ],
  isLoggerEnabled: true,
};
