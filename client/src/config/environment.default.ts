import { IEnvironment } from './environment';

export const environmentDefault: IEnvironment = {
  alternativeLogo: true,
  apiUrl: process.env.REACT_APP_API_URL || 'https://api-testnet.ergoplatform.com',
  blockchain: {
    coinName: 'Ergo'
  },
  defaultLocale: 'en',
  environments: [
    {
      name: 'Testnet',
      url: 'http://localhost:3000',
    }
  ],
  isLoggerEnabled: true,
  tokensDecode: {
    "a91167397245bce687182e877107b5d43904c89ba4ec5f0f5557eb0d127945b3": "BTC",
    "fd0e8f2af0fcc567734b75a9665573cd6d336f54a10b4962ba70f220ab167e9a": "ETH",
  }
};
