import { IEnvironment } from './environment';

export const environmentDefault: IEnvironment = {
  alternativeLogo: true,
  // TODO: apiUrl is deprecated. Use apiBaseUrl instead.
  apiUrl: 'https://api.ergoplatform.com/api/v0',
  apiBaseUrl: 'https://api.ergoplatform.com',
  blockchain: {
    coinName: 'Erg',
  },
  defaultLocale: 'en',
  environments: [
    {
      name: 'Testnet',
      url: 'http://localhost:3000',
    },
    {
      name: 'Mainnet',
      url: 'http://localhost:3000',
    },
  ],
  isLoggerEnabled: true,
};
