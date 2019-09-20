import * as express from 'express';

import { GET_CHART_SUCCESS } from '../../client/src/constants/chart.types';
import { chartReducer, initialState} from '../../client/src/reducers/chart.reducer';
import { ChartApiService } from '../../client/src/services/chart.api.service';

export const ChartPage = express.Router();

ChartPage.get('/*', (req: any, res, next) => {
  ChartApiService.getChart('total')
    .then((data: any) => {
      const preloadedState = chartReducer(initialState, {
        payload: {
          data
        },
        type: GET_CHART_SUCCESS
      });

      req.explorer.preloadedState = {
        ...req.explorer.preloadedState,
        chart: preloadedState,
      };

      next();
    })
    .catch((e: Error) => {
      req.explorer.hasError = true;
      console.error(e);

      next();
    });
});
