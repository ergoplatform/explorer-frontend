import { getStruct } from 'redux-struct';
import { GET_UNCONFIRMED_TRANSACTION_STRUCT } from '../constants/struct.types';

export const getUnconfirmedTransactionStructSelector = (state: any) =>
  getStruct(GET_UNCONFIRMED_TRANSACTION_STRUCT)(state);
