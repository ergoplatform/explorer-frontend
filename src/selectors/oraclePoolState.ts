import { getStruct } from 'redux-struct';
import { GET_ORACLE_POOL_DATA_STRUCT } from '../constants/struct.types';

export const getOraclePoolDataStructSelector = (state: any) =>
  getStruct(GET_ORACLE_POOL_DATA_STRUCT)(state);
