import axios, { AxiosResponse } from 'axios';

import environment from '../config/environment';

export class SearchApiService {
  static search (query: string | string[]): any {
    return axios.get(`${environment.apiUrl}/search`, {
      params: {
        query
      }
    })
      .then((response: AxiosResponse) => {
        return response.data;
      });
  }
}
