import * as express from 'express';

import { initialState, statsReducer } from '../client/src/reducers/stats.reducer';

import { GET_STATS_INFO_SUCCESS } from '../client/src/constants/stats.types';
import { StatsApiService } from '../client/src/services/stats.api.service';

export const Preloader = express.Router();

Preloader.get('*', (req: any, res, next) => {
  StatsApiService.getStatsInfo()
    .then((data: any) => {
      const preloadedState = statsReducer(initialState, {
        payload: {
          data
        },
        type: GET_STATS_INFO_SUCCESS
      });
      
      req.explorer.preloadedState = {
        ...req.explorer.preloadedState,
        stats: {
          ...preloadedState,
          preloaded: true
        }
      };
      
      next();
    });
});
