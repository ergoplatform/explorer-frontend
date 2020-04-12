import { IEnvironment } from './environment';

export const environmentDefault: IEnvironment = {
  alternativeLogo: true,
  apiUrl: 'https://new-explorer.ergoplatform.com',
  blockchain: {
    coinName: 'Erg'
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
    }
  ],
  isLoggerEnabled: true
};
