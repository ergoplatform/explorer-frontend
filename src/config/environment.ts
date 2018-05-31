import { environmentDefault } from './environment.default';
import { environmentProd } from './environment.prod';

export interface IEnvironment {
  apiUrl?: string;
  blockchain?: any;
  defaultLocale?: string;
  isLoggerEnabled: boolean;
}

let environment: IEnvironment;

if (process.env.NODE_ENV === 'production') {
  environment = {
    ...environmentDefault,
    ...environmentProd
  };
  
  if (process.env.ERGO_EXPLORER_MOCK) {
    environment.apiUrl = environmentDefault.apiUrl;
  }
} else {
  environment = {
    ...environmentDefault,
    apiUrl: '/api',
  };
}

export default environment;
