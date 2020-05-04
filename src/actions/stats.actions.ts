import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import {
  GET_STATS,
  GET_STATS_INFO,
  GET_STATS_INFO_SUCCESS,
  GET_STATS_SUCCESS,
} from '../constants/stats.types';
import { StatsApiService } from '../services/stats.api.service';

export interface StatsActions extends ActionCreatorsMapObject {
  getStatsInfo: () => any;
  getStats: () => any;
}

export const StatsActions: StatsActions = {
  getStatsInfo(): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_STATS_INFO,
      });

      StatsApiService.getStatsInfo().then((data: any) => {
        dispatch({
          payload: {
            data,
          },
          type: GET_STATS_INFO_SUCCESS,
        });
      });
    };
  },

  getStats(): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_STATS,
      });

      StatsApiService.getStats().then((data: any) => {
        dispatch({
          payload: {
            data,
          },
          type: GET_STATS_SUCCESS,
        });
      });
    };
  },
};
