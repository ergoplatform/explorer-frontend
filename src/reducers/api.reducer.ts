import { GET_API, GET_API_SUCCESS } from '../constants/api.types';

export interface ApiState {
  fetching: boolean;
  data?: any;
}

export const initialState: ApiState = {
  data: null,
  fetching: false,
};

export function apiReducer(
  state: ApiState = initialState,
  action: any
): ApiState {
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
