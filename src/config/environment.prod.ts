import { IEnvironment } from './environment';

export const environmentProd: IEnvironment = {
  environments: [
    {
      name: 'Testnet',
      url: 'https://testnet.ergoplatform.com',
    },
    {
      name: 'Mainnet',
      url: 'https://explorer.ergoplatform.com',
    },
  ],
  isLoggerEnabled: false,
};
