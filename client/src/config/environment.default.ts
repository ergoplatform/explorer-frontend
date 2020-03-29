import { IEnvironment } from './environment';

export const environmentDefault: IEnvironment = {
  alternativeLogo: true,
  apiUrl: 'https://api-testnet.ergoplatform.com',
  api2Url: 'http://88.198.50.217:8081/api/v0',
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
