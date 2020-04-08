import { ActionCreatorsMapObject } from 'redux';
import { IssuedTokensService } from '../services/issuedToken.api.service';

export interface IssuedTokensActions extends ActionCreatorsMapObject {
  getTokens: (params: any) => any;
}

export const IssuedTokensActions: IssuedTokensActions = {
  getTokens(params: any) {
    return (dispatch: any) =>
      IssuedTokensService.getAllIssuedTokens(dispatch, params);
  },
};
