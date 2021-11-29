import { ActionCreatorsMapObject } from 'redux';
import { TokenService } from 'src/services/token.api.service';

export interface TokenActions extends ActionCreatorsMapObject {
  getTokenById: (params: any) => any;
}

export const TokenActions: TokenActions = {
  getTokenById(id: string) {
    return (dispatch: any) => TokenService.getTokenById(dispatch, id);
  },
};
