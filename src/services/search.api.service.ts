import axios, { AxiosResponse } from 'axios';

import environment from '../config/environment';

export class SearchApiService {
  static search(query: string): any {
    return axios
      .get(`${environment.apiUrl}/search`, {
        params: {
          query,
        },
      })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Block api service. Request: ${environment.apiUrl}/search.`
          );
        }

        return response.data;
      });
  }
}
