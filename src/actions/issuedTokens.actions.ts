import { ActionCreatorsMapObject } from 'redux';
import { IssuedTokensService } from '../services/issuedToken.api.service';
import {
  GET_TOKENS_SUCCESS,
  GET_TOKENS_BY_ID_SUCCESS,
  GET_TOKENS_BY_ID_FAIL,
} from '../constants/tokens.types';

export interface IssuedTokensActions extends ActionCreatorsMapObject {
  getTokens: (params: any) => any;
}

export const IssuedTokensActions: IssuedTokensActions = {
  getTokens(params: any) {
    return (dispatch: any) => {
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
    };
  },
  getTokensById(tokenId: string) {
    return (dispatch: any) => {
      return IssuedTokensService.getIssuedTokensById(dispatch, tokenId)
        .then((data: any) => {
          dispatch({
            payload: {
              tokensById: data,
            },
            type: GET_TOKENS_BY_ID_SUCCESS,
          });
        })
        .catch(() => {
          dispatch({
            type: GET_TOKENS_BY_ID_FAIL,
          });
        });
    };
  },
};
