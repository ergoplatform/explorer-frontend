import { ActionCreatorsMapObject } from 'redux';
import { IssuedTokensService } from '../services/issuedToken.api.service';
import { GET_TOKENS_SUCCESS } from '../constants/tokens.types';

export interface IssuedTokensActions extends ActionCreatorsMapObject {
  getTokens: (params: any) => any;
}

export const IssuedTokensActions: IssuedTokensActions = {
  getTokens(params: any) {
    return (dispatch: any) => {
      if (!params.searchQuery || params.searchQuery?.trim()?.length < 3) {
        return IssuedTokensService.getAllIssuedTokens(dispatch, params).then(
          (data: any) => {
            dispatch({
              payload: {
                offset: params.offset || 0,
              },
              type: GET_TOKENS_SUCCESS,
            });
          }
        );
      }

      return IssuedTokensService.getSearchIssuedTokensByQuery(
        dispatch,
        params
      ).then((data: any) => {
        dispatch({
          payload: {
            offset: params.offset || 0,
          },
          type: GET_TOKENS_SUCCESS,
        });
      });
    };
  },
};
