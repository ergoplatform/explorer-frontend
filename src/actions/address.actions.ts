import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import {
  GET_ADDRESS,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_TRANSACTIONS,
  GET_ADDRESS_TRANSACTIONS_SUCCESS
} from '../constants/address.types';

export interface AddressActions extends ActionCreatorsMapObject {
  getAddress: (id: string) => any;
  getAddressTransactions: (id: string) => any;
}

export const AddressActions: AddressActions = {
  getAddress (id: string): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_ADDRESS
      });
      
      axios.get(`${environment.apiUrl}/addresses/${id}`)
        .then((response: AxiosResponse) => {
          dispatch({
            payload: {
              data: response.data
            },
            type: GET_ADDRESS_SUCCESS
          });
        });
    };
  },
  
  getAddressTransactions (id: string): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_ADDRESS_TRANSACTIONS,
      });
  
      axios.get(`${environment.apiUrl}/addresses/${id}/transactions`)
        .then((response: AxiosResponse) => {
          dispatch({
            payload: {
              data: response.data
            },
            type: GET_ADDRESS_TRANSACTIONS_SUCCESS
          });
        });
    };
  }
};
