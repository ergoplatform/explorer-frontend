import { ActionCreatorsMapObject } from 'redux';
import { UnconfirmedTransactionService } from '../services/unconfirmedTransaction.api.service';

export interface UnconfirmedTransactionActions extends ActionCreatorsMapObject {
  getUnconfirmedTransaction: (params: any) => any;
}

export const UnconfirmedTransactionActions: UnconfirmedTransactionActions = {
  getUnconfirmedTransaction(id: string) {
    return (dispatch: any) =>
      UnconfirmedTransactionService.getUnconfirmedTransaction(dispatch, id);
  },
};
