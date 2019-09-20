import axios, { AxiosResponse } from 'axios';

import environment from '../config/environment';

import { IChartParams } from '../actions/chart.actions';

import { TIMESPAN } from '../constants/timespan.constant';

export class ChartApiService {
  static getChart (chartType: string, options: IChartParams = {}): any {
    const timespan = options.timespan === TIMESPAN.ALLTIME ? 'all' : options.timespan;

    return axios.get(`${environment.apiUrl}/charts/${chartType}`, {
      params: {
        timespan: timespan || TIMESPAN.DAYS_30
      }
    })
      .then((response: AxiosResponse) => {
        if (!response) {
          console.error(response);
        }

        return response.data;
      });
  }
}
