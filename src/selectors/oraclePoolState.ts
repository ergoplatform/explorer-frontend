import { getStruct } from 'redux-struct';
import {
  GET_ORACLE_POOL_INFO_STRUCT,
  GET_CURRENT_BLOCK_HEIGHT_STRUCT,
  GET_ORACLE_STATUS_STRUCT,
} from '../constants/struct.types';

export const getOraclePoolInfoStructSelector = (state: any) =>
  getStruct(GET_ORACLE_POOL_INFO_STRUCT)(state);

export const getCurrentBlockHeightStructSelector = (state: any) =>
  getStruct(GET_CURRENT_BLOCK_HEIGHT_STRUCT)(state);

export const getOraclePoolStatusStructSelector = (state: any) =>
  getStruct(GET_ORACLE_STATUS_STRUCT)(state);
