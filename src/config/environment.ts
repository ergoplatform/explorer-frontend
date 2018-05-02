import { environmentProd } from './environment.prod';

export interface IEnvironment {
  apiUrl: string;
}

let environment: IEnvironment;

if (process.env.NODE_ENV === 'production') {
  environment = {
    ...environmentProd
  };
} else {
  environment = {
    apiUrl: 'http://localhost:8080'
  };
}

export default environment;
