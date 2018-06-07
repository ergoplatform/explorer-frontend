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
} else {
  environment = {
    ...environmentDefault,
  };
}

const appConfig = process.env.IS_BROWSER ? window.__APP_CONFIG__ : require('../../../build/client/app.config.js');

if (appConfig && appConfig.apiUrl) {
  environment.apiUrl = appConfig.apiUrl;
}

export default environment;
