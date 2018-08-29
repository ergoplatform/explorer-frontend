import * as express from 'express';
import { StatsApiService } from '../../client/src/services/stats.api.service';

import { GET_STATS_SUCCESS } from '../../client/src/constants/stats.types';
import { initialState, statsReducer } from '../../client/src/reducers/stats.reducer';

export const StatsPage = express.Router();

StatsPage.get('/', (req: any, res, next) => {
  StatsApiService.getStats()
    .then((data: any) => {
      const preloadedState = statsReducer(initialState, {
        payload: {
          data
        },
        type: GET_STATS_SUCCESS
      });
      
      req.explorer.preloadedState = {
        ...req.explorer.preloadedState,
        stats: {
          ...preloadedState,
          info: (req.explorer.preloadedState.stats.info || {}),
          preloaded: true
        }
      };
  
      next();
    })
    .catch(() => {
      req.explorer.hasError = true;
    
      next();
    });
});
