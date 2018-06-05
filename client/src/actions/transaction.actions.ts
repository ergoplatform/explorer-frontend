import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_TRANSACTION, GET_TRANSACTION_SUCCESS } from '../constants/transaction.types';

export interface TransactionActions extends ActionCreatorsMapObject {
  getTransaction: (id: string) => any;
}

export const TransactionActions: TransactionActions = {
  getTransaction (id: string): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_TRANSACTION
      });
      
      axios.get(`${environment.apiUrl}/transactions/${id}`)
        .then((response: AxiosResponse) => {
          dispatch({
            payload: {
              data: response.data
            },
            type: GET_TRANSACTION_SUCCESS
          });
        });
    };
  }
};
