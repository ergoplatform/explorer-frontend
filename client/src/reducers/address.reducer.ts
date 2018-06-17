import {
  GET_ADDRESS,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_TRANSACTIONS,
  GET_ADDRESS_TRANSACTIONS_SUCCESS
} from '../constants/address.types';

import { FullAddress } from '../models/generated/fullAddress';
import { Transaction } from '../models/generated/transaction';

export interface AddressState {
  fetching: boolean;
  address?: FullAddress;
  transactions?: {
    items: Transaction[],
    total: number,
  };
  transactionFetching: boolean;
}

const initialState: AddressState = {
  fetching: false,
  transactionFetching: false
};

export function addressReducer (state: AddressState = initialState, action: any): AddressState {
  switch (action.type) {
    case GET_ADDRESS: {
      
      return {
        ...state,
        fetching: true
      };
    }
    
    case GET_ADDRESS_SUCCESS: {
      return {
        ...state,
        address: action.payload.data,
        fetching: false
      };
    }
    
    case GET_ADDRESS_TRANSACTIONS: {
      return {
        ...state,
        transactionFetching: true
      };
    }
    
    case GET_ADDRESS_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        transactionFetching: false,
        transactions: action.payload.data
      };
    }
    
    default:
      return { ...state };
  }
}
