import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import {
  GET_ADDRESS,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_TRANSACTIONS,
  GET_ADDRESS_TRANSACTIONS_SUCCESS,
} from '../constants/address.types';
import { AddressApiService } from '../services/address.api.service';

export interface AddressActions extends ActionCreatorsMapObject {
  getAddress: (id: string) => any;
  getAddressTransactions: (id: string, params: any) => any;
  getAddressesBalances: () => (dispatch: Dispatch<Action>) => any;
}

export const AddressActions: AddressActions = {
  getAddress(id: string): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_ADDRESS,
      });

      AddressApiService.getAddress(id).then((data: any) => {
        dispatch({
          payload: {
            data,
          },
          type: GET_ADDRESS_SUCCESS,
        });
      });
    };
  },

  getAddressTransactions(id: string, params: any): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_ADDRESS_TRANSACTIONS,
      });

      AddressApiService.getAddressTransactions(id, params).then((data: any) => {
        dispatch({
          payload: {
            data,
          },
          type: GET_ADDRESS_TRANSACTIONS_SUCCESS,
        });
      });
    };
  },

  getAddressesBalances() {
    return (dispatch: any) => AddressApiService.getAddressesBalances(dispatch);
  },
};
