import axios, { AxiosResponse } from 'axios';
import environment from '../config/environment';

export class StatsApiService {
  static getStatsInfo (): any {
    return axios.get(`${environment.apiUrl}/info`)
      .then((response: AxiosResponse) => {
        if (!response) {
          console.error(response);
        }

        return response.data;
      });
  }

  static getStats (): any {
    return axios.get(`${environment.apiUrl}/stats`)
      .then((response: AxiosResponse) => {
        if (!response) {
          console.error(response);
        }

        return response.data;
      });
  }
}
