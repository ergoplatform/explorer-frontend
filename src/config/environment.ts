import { environmentDefault } from './environment.default';
import { environmentProd } from './environment.prod';

export interface IEnvironment {
  apiUrl?: string;
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
    apiUrl: 'http://localhost:8080'
  };
}

export default environment;
