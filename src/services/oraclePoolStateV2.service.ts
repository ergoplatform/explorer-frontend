import { fetchStruct } from '../utils/fetchStruct';
import {
  GET_ORACLE_ORACLE_INFO_V2_STRUCT,
  GET_ORACLE_ORACLE_STATUS_V2_STRUCT,
  GET_ORACLE_POOL_INFO_V2_STRUCT,
  GET_ORACLE_POOL_STATUS_V2_STRUCT,
} from '../constants/struct.types';

export const pools = {
  dexyerg: 'https://testnet-oracle-ergxau.sigmaspace.io/',
};

export class OraclePoolStateV2Service {
  static getPoolInfo(dispatch: any, poolType: any): any {
    return fetchStruct(
      GET_ORACLE_POOL_INFO_V2_STRUCT,
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

  static getPoolStatus(dispatch: any, poolType: any): any {
    return fetchStruct(
      GET_ORACLE_POOL_STATUS_V2_STRUCT,
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

  static getOracleInfo(dispatch: any, poolType: any): any {
    return fetchStruct(
      GET_ORACLE_ORACLE_INFO_V2_STRUCT,
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

  static getOracleStatus(dispatch: any, poolType: any): any {
    return fetchStruct(
      GET_ORACLE_ORACLE_STATUS_V2_STRUCT,
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
