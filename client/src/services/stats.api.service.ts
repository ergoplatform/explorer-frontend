import axios, { AxiosResponse } from "axios";
import environment from "../config/environment";

export class StatsApiService {
  static getStatsInfo (): any {
    return axios
      .get(`${environment.apiUrl}/info`)
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Stats api service. Request: ${environment.apiUrl}/info. Response: ${response}`
          );
        }

        return response.data;
      });
  }

  static getStats (): any {
    return axios
      .get(`${environment.apiUrl}/stats`)
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Stats api service. Request: ${environment.apiUrl}/stats. Response: ${response}`
          );
        }

        return response.data;
      });
  }
}
