import { fetchStruct } from '../utils/fetchStruct';
import axios from 'axios';
import {
  GET_ORACLE_POOL_INFO_STRUCT,
  GET_CURRENT_BLOCK_HEIGHT_STRUCT,
  GET_ORACLE_STATUS_STRUCT,
} from '../constants/struct.types';

export class OraclePoolStateService {
  static get apiUrl(): string {
    return `http://oracle1.ergo.dev.infra.emurgo.io:9090`;
  }

  static getPoolInfo(dispatch: any): any {
    return fetchStruct(
      dispatch,
      GET_ORACLE_POOL_INFO_STRUCT,
      'get',
      `${OraclePoolStateService.apiUrl}/poolInfo`,
      {
        transformResponse: [
          ...axios.defaults.transformResponse,
          (data: any) => JSON.parse(data),
        ],
      }
    );
  }

  static getCurrentBlockHeight(dispatch: any): any {
    return fetchStruct(
      dispatch,
      GET_CURRENT_BLOCK_HEIGHT_STRUCT,
      'get',
      `${OraclePoolStateService.apiUrl}/blockHeight`,
      {
        transformResponse: [
          ...axios.defaults.transformResponse,
          (data: any) => JSON.parse(data),
        ],
      }
    );
  }

  static getPoolStatus(dispatch: any): any {
    return fetchStruct(
      dispatch,
      GET_ORACLE_STATUS_STRUCT,
      'get',
      `${OraclePoolStateService.apiUrl}/poolStatus`,
      {
        transformResponse: [
          ...axios.defaults.transformResponse,
          (data: any) => JSON.parse(data),
        ],
      }
    );
  }
}
