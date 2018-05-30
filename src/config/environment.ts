import { environmentDefault } from './environment.default';
import { environmentProd } from './environment.prod';

export interface IEnvironment {
  apiUrl?: string;
  blockchain?: any;
  defaultLocale?: string;
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
    apiUrl: '/api',
  };
}

export default environment;
