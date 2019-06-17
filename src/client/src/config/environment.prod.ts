import { IEnvironment } from './environment';

export const environmentProd: IEnvironment = {
  environments: [
    {
      name: 'Testnet',
      url: 'https://testnet.ergoplatform.com',
    }
  ],
  isLoggerEnabled: false,
  tokensDecode: {
    "a91167397245bce687182e877107b5d43904c89ba4ec5f0f5557eb0d127945b3": "BTC",
    "fd0e8f2af0fcc567734b75a9665573cd6d336f54a10b4962ba70f220ab167e9a": "ETH",
  }
};
