import { IEnvironment } from './environment';

import { environmentDefault } from './environment.default';

export const environmentProd: IEnvironment = {
  apiUrl: process.env.REACT_APP_API_URL || environmentDefault.apiUrl,
  isLoggerEnabled: false
};
