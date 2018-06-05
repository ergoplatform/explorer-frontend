import * as express from 'express';

import { initialState, statsReducer } from '../reducers/stats.reducer';

import { GET_STATS_INFO_SUCCESS } from '../constants/stats.types';
import { StatsApiService } from '../services/stats.api.service';

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
