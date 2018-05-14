import { GET_TRANSACTION, GET_TRANSACTION_SUCCESS } from '../constants/transaction.types';

import { FullTransaction } from '../models/generated/fullTransaction';

export interface TransactionState {
  fetching: boolean;
  transaction?: FullTransaction;
}

const initialState: TransactionState = {
  fetching: false
};

export function transactionReducer (state: TransactionState = initialState, action: any): TransactionState {
  switch (action.type) {
    case GET_TRANSACTION: {
      
      return {
        ...state,
        fetching: true
      };
    }
    
    case GET_TRANSACTION_SUCCESS: {
      return {
        ...state,
        fetching: false,
        transaction: action.payload.data
      };
    }
    
    default:
      return { ...state };
  }
}
