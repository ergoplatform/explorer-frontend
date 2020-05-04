import { CLEAR_APP_PRELOADED_STATE } from '../actions/app.actions';
import { GET_SEARCH, GET_SEARCH_SUCCESS } from '../constants/search.types';

export interface SearchState {
  fetching: boolean;
  data?: any;
  stats?: any;
  preloaded: boolean;
}

export const initialState: SearchState = {
  fetching: false,
  preloaded: false,
};

export function searchReducer(
  state: SearchState = initialState,
  action: any
): SearchState {
  switch (action.type) {
    case GET_SEARCH: {
      return {
        ...state,
        fetching: true,
      };
    }

    case GET_SEARCH_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        fetching: false,
      };
    }

    case CLEAR_APP_PRELOADED_STATE: {
      return {
        ...state,
        preloaded: false,
      };
    }

    default:
      return { ...state };
  }
}
