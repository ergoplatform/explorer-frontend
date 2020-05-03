import { environmentDefault } from './environment.default';
import { environmentProd } from './environment.prod';

export interface IEnvironment {
  apiUrl?: string;
  blockchain?: any;
  alternativeLogo?: boolean;
  environments?: any[];
  defaultLocale?: string;
  isLoggerEnabled: boolean;
}

let environment: IEnvironment;

if (process.env.NODE_ENV === 'production') {
  environment = {
    ...environmentDefault,
    ...environmentProd,
  };
} else {
  environment = {
    ...environmentDefault,
  };
}

function getAppConfig(): any {
  let appConfig: any = {
    apiUrl: environment.apiUrl,
  };

  if (process.env.BLOCKCHAIN_ENVIRONMENT === 'mainnet') {
    appConfig = {
      apiUrl: 'https://new-explorer.ergoplatform.com',
      alternativeLogo: false, // true by default
      environments: [
        {
          name: 'Mainnet',
          url: 'https://explorer.ergoplatform.com',
        },
        {
          name: 'Testnet',
          url: 'https://testnet.ergoplatform.com',
        },
      ],
    };
  } else {
    appConfig = {
      apiUrl: 'https://api-testnet.ergoplatform.com',
      alternativeLogo: true, // true by default
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
    };
  }
  console.log(process.env.BLOCKCHAIN_ENVIRONMENT);
  return { ...environment, ...appConfig };
}

const appConfig = getAppConfig();

environment = {
  ...appConfig,
  get environments(): any[] {
    return appConfig.environments;
  },

  get apiUrl(): string | undefined {
    return appConfig.apiUrl;
  },
};

export default environment;
