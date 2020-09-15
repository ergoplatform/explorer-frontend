import { getStruct } from 'redux-struct';
import { GET_ADDRESSES_BALANCES_STRUCT } from './../constants/struct.types';

export const addressesBalancesStructSelector = (state: any) =>
  getStruct(GET_ADDRESSES_BALANCES_STRUCT)(state);
