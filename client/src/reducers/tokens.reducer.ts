import { GET_TOKENS_SUCCESS } from '../constants/tokens.types';

export interface TokensState {
  offset: number;
}

const initialState: TokensState = {
  offset: 0,
};

export function tokensReducer(
  state: TokensState = initialState,
  action: any
): TokensState {
  switch (action.type) {
    case GET_TOKENS_SUCCESS: {
      return {
        ...state,
        offset: action.payload.offset,
      };
    }

    default:
      return { ...state };
  }
}
