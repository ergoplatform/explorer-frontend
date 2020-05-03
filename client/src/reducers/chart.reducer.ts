import { GET_CHART, GET_CHART_SUCCESS } from '../constants/chart.types';

export interface ChartState {
  fetching: boolean;
  data?: any;
}

export const initialState: ChartState = {
  fetching: false,
};

export function chartReducer(
  state: ChartState = initialState,
  action: any
): ChartState {
  switch (action.type) {
    case GET_CHART: {
      return {
        ...state,
        data: null,
        fetching: true,
      };
    }

    case GET_CHART_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        fetching: false,
      };
    }

    default:
      return { ...state };
  }
}
