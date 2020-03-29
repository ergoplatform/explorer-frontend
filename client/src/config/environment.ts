import fs from 'fs';

import { environmentDefault } from './environment.default';
import { environmentProd } from './environment.prod';

export interface IEnvironment {
  apiUrl?: string;
  api2Url?: string;
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
  let appConfig = {
    apiUrl: environment.apiUrl,
    api2Url: environment.api2Url,
  };

  if (process.env.IS_BROWSER) {
    appConfig = window.__APP_CONFIG__;
  } else {
    const appPath = fs.realpathSync(process.cwd());

    if (process.env.NODE_ENV === 'production') {
      eval(fs.readFileSync(appPath + '/build/client/app.config.js', 'utf-8'));

      appConfig = global.__APP_CONFIG__;
    }
  }

  return { ...environment, ...appConfig };
}

environment = {
  ...getAppConfig(),
  get environments(): any[] {
    return getAppConfig().environments;
  },

  get apiUrl(): string | undefined {
    return getAppConfig().apiUrl;
  },

  get api2Url(): string | undefined {
    return getAppConfig().api2Url;
  },
};

export default environment;
