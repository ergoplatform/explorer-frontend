import { getStruct } from 'redux-struct';
import {
  GET_ORACLE_INFO_V2_STRUCT,
  GET_ORACLE_POOL_INFO_V2_STRUCT,
  GET_ORACLE_POOL_STATUS_V2_STRUCT,
  GET_ORACLE_STATUS_V2_STRUCT,
} from '../constants/struct.types';

export const getOraclePoolInfoStructSelector = (state: any) =>
  getStruct(GET_ORACLE_POOL_INFO_V2_STRUCT)(state);

export const getOraclePoolStatusStructSelector = (state: any) =>
  getStruct(GET_ORACLE_POOL_STATUS_V2_STRUCT)(state);

export const getOracleInfoStructSelector = (state: any) =>
  getStruct(GET_ORACLE_INFO_V2_STRUCT)(state);

export const getOracleStatusStructSelector = (state: any) =>
  getStruct(GET_ORACLE_STATUS_V2_STRUCT)(state);
