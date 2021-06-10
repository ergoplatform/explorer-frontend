import { GET_API, GET_API_SUCCESS } from '../constants/api.types';

export interface ApiDocsState {
  fetching: boolean;
  data?: any;
}

export const initialState: ApiDocsState = {
  data: null,
  fetching: false,
};

export function apiDocsReducer(
  state: ApiDocsState = initialState,
  action: any
): ApiDocsState {
  switch (action.type) {
    case GET_API: {
      return {
        ...state,
        fetching: true,
      };
    }

    case GET_API_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        fetching: false,
      };
    }

    default: {
      return state;
    }
  }
}
