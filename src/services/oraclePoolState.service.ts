import { fetchStruct } from '../utils/fetchStruct';
import { GET_ORACLE_POOL_DATA_STRUCT } from '../constants/struct.types';

export const pools = {
  ergusd: 'https://erg-oracle-ergusd.spirepools.com/frontendData',
  adausd: 'https://ada-usd-ergo-oracle.emurgo.io/frontendData',
  ethusd: 'https://ergolui.com/eth-usd-oracle/frontendData',
};
export class OraclePoolStateService {
  static getPoolData(dispatch: any, poolType: any): any {
    return fetchStruct(
      GET_ORACLE_POOL_DATA_STRUCT,
      {
        method: 'get',
        url: pools[poolType],
      },
      {
        dispatch,
        transformResponse: JSON.parse,
      }
    );
  }
}
