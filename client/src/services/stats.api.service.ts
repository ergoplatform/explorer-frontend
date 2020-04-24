import axios, { AxiosResponse } from 'axios';
import environment from '../config/environment';

export class StatsApiService {
  static getStatsInfo(): any {
    return axios
      .get(`${environment.apiUrl}/info`)
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(`SERVICE UNAVAILABLE`);
        }

        return response.data;
      });
  }

  static getStats(): any {
    return axios
      .get(`${environment.apiUrl}/stats`)
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Stats api service. Request: ${environment.apiUrl}/stats.`
          );
        }

        return response.data;
      });
  }
}
