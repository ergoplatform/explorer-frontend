import { fetchStruct } from '../utils/fetchStruct';
import axios from 'axios';
import { GET_ORACLE_POOL_DATA_STRUCT } from '../constants/struct.types';

export class OraclePoolStateService {
  static get apiUrl(): string {
    // return `https://erg-usd-ergo-oracle.emurgo.io`;
    return `http://oracle1.ergo.dev.infra.emurgo.io:9082`;
  }

  static getPoolData(dispatch: any): any {
    return fetchStruct(
      dispatch,
      GET_ORACLE_POOL_DATA_STRUCT,
      'get',
      `${OraclePoolStateService.apiUrl}/frontendData`,
      {
        transformResponse: [
          ...axios.defaults.transformResponse,
          (data: any) => JSON.parse(data),
        ],
      }
    );
  }
}
