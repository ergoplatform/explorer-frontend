import axios, { AxiosResponse } from 'axios';

import environment from '../config/environment';

import { IChartParams } from '../actions/chart.actions';

import { TIMESPAN } from '../constants/timespan.constant';

export class ChartApiService {
  static getChart(chartType: string, options: IChartParams = {}): any {
    // TODO: all doesnt work properly
    // const timespan =
    //   options.timespan === TIMESPAN.ALLTIME ? 'all' : options.timespan;

    const timespan = options.timespan;

    return axios
      .get(`${environment.apiUrl}/charts/${chartType}`, {
        params: {
          timespan: timespan || TIMESPAN.DAYS_30,
        },
      })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Block api service. Request: ${environment.apiUrl}/charts/${chartType}.`
          );
        }

        return response.data;
      });
  }
}
