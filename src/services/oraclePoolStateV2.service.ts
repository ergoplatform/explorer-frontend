import { fetchStruct } from '../utils/fetchStruct';
import {
  GET_ORACLE_INFO_V2_STRUCT,
  GET_ORACLE_STATUS_V2_STRUCT,
  GET_ORACLE_POOL_INFO_V2_STRUCT,
  GET_ORACLE_POOL_STATUS_V2_STRUCT,
} from '../constants/struct.types';

export const pools = {
  xauerg: 'https://erg-xau-oracle-api.ergohost.io',
};

export class OraclePoolStateV2Service {
  static getPoolInfo(dispatch: any, poolType: any): any {
    return fetchStruct(
      GET_ORACLE_POOL_INFO_V2_STRUCT,
      {
        method: 'get',
        url: `${pools[poolType]}/poolInfo`,
      },
      {
        dispatch,
      }
    );
  }

  static getPoolStatus(dispatch: any, poolType: any): any {
    return fetchStruct(
      GET_ORACLE_POOL_STATUS_V2_STRUCT,
      {
        method: 'get',
        url: `${pools[poolType]}/poolStatus`,
      },
      {
        dispatch,
      }
    );
  }

  static getOracleInfo(dispatch: any, poolType: any): any {
    return fetchStruct(
      GET_ORACLE_INFO_V2_STRUCT,
      {
        method: 'get',
        url: `${pools[poolType]}/oracleInfo`,
      },
      {
        dispatch,
      }
    );
  }

  static getOracleStatus(dispatch: any, poolType: any): any {
    return fetchStruct(
      GET_ORACLE_STATUS_V2_STRUCT,
      {
        method: 'get',
        url: `${pools[poolType]}/oracleStatus`,
      },
      {
        dispatch,
      }
    );
  }
}
