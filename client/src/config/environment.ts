import * as fs from 'fs';

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
    ...environmentDefault
  };
}

environment = {
  ...environment,
  get apiUrl (): string | undefined {
    let appConfig = process.env.IS_BROWSER ? window.__APP_CONFIG__ : global.__APP_CONFIG__;
    
    if (!process.env.IS_BROWSER) {
      const appPath = fs.realpathSync(process.cwd());
  
      if (process.env.NODE_ENV === 'production') {
        eval(fs.readFileSync(appPath + '/build/client/app.config.js', 'utf-8'));
        
        appConfig = global.__APP_CONFIG__;
      }
    }
    
    return appConfig.apiUrl || environment.apiUrl;
  }
};

export default environment;
