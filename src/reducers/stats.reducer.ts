import { GET_STATS_INFO, GET_STATS_INFO_SUCCESS, GET_STATS_SUCCESS } from '../constants/stats.types';
import { convertInfoItemValue } from '../utils/convertInfoItemvalue';

export interface IInfoItem {
  title: string;
  value: any;
}

export interface StatsState {
  fetching: boolean;
  info: IInfoItem[];
  stats?: any;
}

const initialState: StatsState = {
  fetching: false,
  info: []
};

export function statsReducer (state: StatsState = initialState, action: any): StatsState {
  switch (action.type) {
    case GET_STATS_INFO: {
      
      return {
        ...state,
        fetching: true
      };
    }
    
    case GET_STATS_INFO_SUCCESS: {
      const info = Object.keys(action.payload.data)
        .map((key: string) => {
          return {
            title: key,
            value: convertInfoItemValue(key, action.payload.data[key])
          };
        });
      
      return {
        ...state,
        fetching: false,
        info
      };
    }
    
    case GET_STATS_SUCCESS: {
      return {
        ...state,
        stats: action.payload.data
      };
    }
    
    default:
      return { ...state };
  }
}
