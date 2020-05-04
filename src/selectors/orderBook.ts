import { getStruct } from 'redux-struct';
import {
  UNSPENT_BUY_ORDERS_BY_TOKEN_ID_STRUCT,
  UNSPENT_SELL_ORDERS_BY_TOKEN_ID_STRUCT,
} from '../constants/struct.types';

export const unspentSellOrdersByTokenIdStructSelector = (state: any) =>
  getStruct(UNSPENT_SELL_ORDERS_BY_TOKEN_ID_STRUCT)(state);

export const unspentBuyOrdersByTokenIdStructSelector = (state: any) =>
  getStruct(UNSPENT_BUY_ORDERS_BY_TOKEN_ID_STRUCT)(state);
