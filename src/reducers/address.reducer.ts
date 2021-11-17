import {
  GET_ADDRESS,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_TRANSACTIONS,
  GET_ADDRESS_TRANSACTIONS_SUCCESS,
} from '../constants/address.types';

import { CLEAR_APP_PRELOADED_STATE } from '../actions/app.actions';

import { Transaction } from '../models/generated/transaction';
import { FullAddressTransactions } from 'src/models/generated/fullAddressTransactions';

export interface AddressState {
  fetching: boolean;
  address?: FullAddressTransactions;
  transactions?: {
    items: Transaction[];
    total: number;
  };
  preloaded: boolean;
  transactionFetching: boolean;
}

export const initialState: AddressState = {
  fetching: false,
  preloaded: false,
  transactionFetching: false,
};

export function addressReducer(
  state: AddressState = initialState,
  action: any
): AddressState {
  switch (action.type) {
    case GET_ADDRESS: {
      return {
        ...state,
        fetching: true,
      };
    }

    case GET_ADDRESS_SUCCESS: {
      return {
        ...state,
        address: action.payload.data,
        fetching: false,
      };
    }

    case GET_ADDRESS_TRANSACTIONS: {
      return {
        ...state,
        transactionFetching: true,
      };
    }

    case GET_ADDRESS_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        transactionFetching: false,
        transactions: action.payload.data,
      };
    }

    case CLEAR_APP_PRELOADED_STATE: {
      return {
        ...state,
        preloaded: false,
      };
    }

    default:
      return { ...state };
  }
}
