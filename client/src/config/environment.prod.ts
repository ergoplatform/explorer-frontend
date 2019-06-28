import { IEnvironment } from './environment';

export const environmentProd: IEnvironment = {
  environments: [
    {
      name: 'Testnet',
      url: 'https://testnet.ergoplatform.com',
    }
  ],
  isLoggerEnabled: false,
};
