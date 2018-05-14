import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_ADDRESS, GET_ADDRESS_SUCCESS } from '../constants/address.types';

const getAddress = (id: string) => {
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
};

export interface AddressActions extends ActionCreatorsMapObject {
  getAddress: ActionCreator<any>;
}

export const AddressActions: AddressActions = {
  getAddress
};
