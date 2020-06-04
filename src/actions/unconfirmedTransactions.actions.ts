import { ActionCreatorsMapObject } from 'redux';
import { GET_UNCONFIRMED_TRANSACTIONS_SUCCESS } from './../constants/unconfirmed.types';
import { UnconfirmedTransactionsService } from '../services/unconfirmed.api.service';

export interface UnconfirmedTransactionsActions
  extends ActionCreatorsMapObject {
  getMempool: (params: any) => any;
}

export const UnconfirmedTransactionsActions: UnconfirmedTransactionsActions = {
  getMempool(params: any) {
    return (dispatch: any) =>
      UnconfirmedTransactionsService.getUnconfirmedTokensList(
        dispatch,
        params
      ).then((data: any) => {
        dispatch({
          payload: {
            offset: params.offset || 0,
          },
          type: GET_UNCONFIRMED_TRANSACTIONS_SUCCESS,
        });
      });
  },
};
