import { CLEAR_APP_PRELOADED_STATE } from '../actions/app.actions';
import {
  GET_STATS_INFO,
  GET_STATS_INFO_SUCCESS,
  GET_STATS_SUCCESS,
} from '../constants/stats.types';

import { convertInfoItemValue } from '../utils/convertInfoItemvalue';

export interface InfoItem {
  title: string;
  value: any;
}

export interface StatsState {
  fetching: boolean;
  info: InfoItem[];
  stats?: any;
  preloaded: boolean;
}

export const initialState: StatsState = {
  fetching: false,
  info: [],
  preloaded: false,
};

export function statsReducer(
  state: StatsState = initialState,
  action: any
): StatsState {
  switch (action.type) {
    case GET_STATS_INFO: {
      return {
        ...state,
        fetching: true,
      };
    }

    case GET_STATS_INFO_SUCCESS: {
      const info = [
        'hashRate',
        'supply',
        'max-supply',
        'transactionAverage',
        'version',
      ].map((key: string) => {
        return {
          title: key,
          value: convertInfoItemValue(key, action.payload.data[key]),
        };
      });

      return {
        ...state,
        fetching: false,
        info,
      };
    }

    case GET_STATS_SUCCESS: {
      return {
        ...state,
        stats: action.payload.data,
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
