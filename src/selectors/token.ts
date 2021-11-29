import { getStruct } from 'redux-struct';
import { GET_TOKEN_STRUCT } from '../constants/struct.types';

export const getTokenStructSelector = (state: any) =>
  getStruct(GET_TOKEN_STRUCT)(state);
