import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import {
  GET_TRANSACTION,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAIL,
  CLEAR_TRANSACTIONS_STATE,
} from '../constants/transaction.types';
import { TransactionApiService } from '../services/transaction.api.service';

export interface TransactionActions extends ActionCreatorsMapObject {
  getTransaction: (id: string) => any;
  clearTransactionsState: () => any;
}

export const TransactionActions: TransactionActions = {
  getTransaction(id: string): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_TRANSACTION,
      });

      TransactionApiService.getTransaction(id)
        .then((data: any) => {
          dispatch({
            payload: {
              data,
            },
            type: GET_TRANSACTION_SUCCESS,
          });
        })
        .catch(() => {
          dispatch({
            type: GET_TRANSACTION_FAIL,
          });
        });
    };
  },
  clearTransactionsState() {
    return {
      type: CLEAR_TRANSACTIONS_STATE,
    };
  },
};
