import {
  GET_TRANSACTION,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAIL,
  CLEAR_TRANSACTIONS_STATE,
} from '../constants/transaction.types';

export interface TransactionState {
  fetching: boolean;
  isFailedRequest: boolean;
  transaction?: any;
}

export const initialState: TransactionState = {
  fetching: false,
  isFailedRequest: false,
};

export function transactionReducer(
  state: TransactionState = initialState,
  action: any
): TransactionState {
  switch (action.type) {
    case GET_TRANSACTION: {
      return {
        ...state,
        fetching: true,
      };
    }

    case GET_TRANSACTION_SUCCESS: {
      return {
        ...state,
        fetching: false,
        transaction: action.payload.data,
      };
    }

    case GET_TRANSACTION_FAIL: {
      return {
        ...state,
        fetching: false,
        isFailedRequest: true,
      };
    }
    case CLEAR_TRANSACTIONS_STATE: {
      return {
        ...state,
        isFailedRequest: false,
      };
    }

    default:
      return { ...state };
  }
}
