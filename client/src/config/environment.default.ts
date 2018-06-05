import { IEnvironment } from './environment';

export const environmentDefault: IEnvironment = {
  apiUrl: 'https://virtserver.swaggerhub.com/BlockchainInstitute/blockchain-explorer/1.0.0',
  blockchain: {
    coinName: 'Ergo'
  },
  defaultLocale: 'en',
  isLoggerEnabled: true,
};
