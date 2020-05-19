import { getStruct } from 'redux-struct';
import { GET_UNCONFIRMED_TRANSACTIONS_STRUCT } from '../constants/struct.types';

export const getUnconfirmedTransactionsStructSelector = (state: any) =>
  getStruct(GET_UNCONFIRMED_TRANSACTIONS_STRUCT)(state);
