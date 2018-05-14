import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_TRANSACTION, GET_TRANSACTION_SUCCESS } from '../constants/transaction.types';

const getTransaction = (id: string) => {
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
};

export interface TransactionActions extends ActionCreatorsMapObject {
  getTransaction: ActionCreator<any>;
}

export const TransactionActions: TransactionActions = {
  getTransaction,
};
