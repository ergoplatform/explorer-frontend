import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import {
  GET_TRANSACTION,
  GET_TRANSACTION_SUCCESS,
} from '../constants/transaction.types';
import { TransactionApiService } from '../services/transaction.api.service';

export interface TransactionActions extends ActionCreatorsMapObject {
  getTransaction: (id: string) => any;
}

export const TransactionActions: TransactionActions = {
  getTransaction(id: string): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_TRANSACTION,
      });

      TransactionApiService.getTransaction(id).then((data: any) => {
        dispatch({
          payload: {
            data,
          },
          type: GET_TRANSACTION_SUCCESS,
        });
      });
    };
  },
};
