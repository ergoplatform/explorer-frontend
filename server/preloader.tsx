import * as express from 'express';
import * as fs from 'fs';
import * as SwaggerParser from 'swagger-parser';

import { apiReducer, initialState as apiInitialState } from '../client/src/reducers/api.reducer';
import { initialState, statsReducer } from '../client/src/reducers/stats.reducer';

import { GET_STATS_INFO_SUCCESS } from '../client/src/constants/stats.types';
import { StatsApiService } from '../client/src/services/stats.api.service';

import { GET_API_SUCCESS } from '../client/src/constants/api.types';

export const Preloader = express.Router();

const appPath         = fs.realpathSync(process.cwd());
const data            = appPath + '/api.yaml';
const apiParsePromise = SwaggerParser.validate(data);

Preloader.get('*', (req: any, res, next) => {
  const promises = [StatsApiService.getStatsInfo(), apiParsePromise];

  Promise.all(promises)
    .then(([statsData, apiData]: any) => {
      const preloadedState = statsReducer(initialState, {
        payload: {
          data: statsData
        },
        type: GET_STATS_INFO_SUCCESS
      });

      const apiPreloadedState = apiReducer(apiInitialState, {
        payload: {
          data: apiData
        },
        type: GET_API_SUCCESS
      });

      req.explorer.preloadedState = {
        ...req.explorer.preloadedState,
        api: {
          ...apiPreloadedState,
          preloaded: true
        },
        settings: {
          isScriptsDisplayed: true,
          locale: 'en'
        },
        stats: {
          ...preloadedState,
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
