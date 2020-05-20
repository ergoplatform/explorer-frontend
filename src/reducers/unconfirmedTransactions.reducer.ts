import { GET_UNCONFIRMED_TRANSACTIONS_SUCCESS } from '../constants/unconfirmed.types';

export interface UnconfirmedTransactions {
  offset: number;
}

const initialState: UnconfirmedTransactions = {
  offset: 0,
};

export function unconfirmedTransactionsReducer(
  state: UnconfirmedTransactions = initialState,
  action: any
): UnconfirmedTransactions {
  switch (action.type) {
    case GET_UNCONFIRMED_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        offset: action.payload.offset,
      };
    }

    default:
      return { ...state };
  }
}
