import axios, { AxiosResponse } from "axios";

import environment from "../config/environment";

export class AddressApiService {
  static get apiUrl (): string {
    return `${environment.apiUrl}/addresses`;
  }

  static getAddress (id: string): any {
    return axios
      .get(`${environment.apiUrl}/addresses/${id}`)
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Address api service. Request: ${environment.apiUrl}/addresses/${id}.`
          );
        }

        return response.data;
      });
  }

  static getAddressTransactions (id: string, params: any): any {
    return axios
      .get(`${environment.apiUrl}/addresses/${id}/transactions`, {
        params
      })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Address api service. Request: ${environment.apiUrl}/addresses/${id}/transactions.`
          );
        }

        return response.data;
      });
  }
}
