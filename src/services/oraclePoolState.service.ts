import { fetchStruct } from '../utils/fetchStruct';
import axios from 'axios';
import { GET_ORACLE_POOL_DATA_STRUCT } from '../constants/struct.types';

export const pools = {
  ergusd: 'https://erg-usd-ergo-oracle.emurgo.io/frontendData',
  adausd: 'https://ada-usd-ergo-oracle.emurgo.io/frontendData',
};
export class OraclePoolStateService {
  static getPoolData(dispatch: any, poolType: any): any {
    return fetchStruct(
      dispatch,
      GET_ORACLE_POOL_DATA_STRUCT,
      'get',
      pools[poolType],
      {
        transformResponse: [
          ...axios.defaults.transformResponse,
          (data: any) => JSON.parse(data),
        ],
      }
    );
  }
}
