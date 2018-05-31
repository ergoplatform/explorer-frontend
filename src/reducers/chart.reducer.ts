import * as dayjs from 'dayjs';

import { GET_CHART, GET_CHART_SUCCESS } from '../constants/chart.types';

export interface ChartState {
  fetching: boolean;
  data?: any;
}

const initialState: ChartState = {
  fetching: false
};

export function chartReducer (state: ChartState = initialState, action: any): ChartState {
  switch (action.type) {
    case GET_CHART: {
      
      return {
        ...state,
        fetching: true
      };
    }
    
    case GET_CHART_SUCCESS: {
      const data = action.payload.data.map((item: any) => {
        item.timestamp = dayjs(item.timestamp)
          .format('DD.MM.YYYY');
        
        return item;
      });
      
      return {
        ...state,
        data,
        fetching: false
      };
    }
    
    default:
      return { ...state };
  }
}
