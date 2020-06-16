import axios, { AxiosResponse } from 'axios';

import environment from '../config/environment';

export class AddressApiService {
  static get apiUrl(): string {
    return `${environment.apiUrl}/addresses`;
  }

  static getAddress(id: string): any {
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

  static getConfirmed(id: string, params: any) {
    return axios
      .get(`${environment.apiUrl}/addresses/${id}/transactions`, {
        params,
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

  static getUnconfirmed(id: string, params: any) {
    return axios
      .get(`${environment.apiUrl}/transactions/unconfirmed/byAddress/${id}`, {
        params,
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

  static async getAddressTransactions(id: string, params: any): Promise<any> {
    const { offset, limit } = params;
    const unconfirmed = await this.getUnconfirmed(id, { offset, limit });

    if (unconfirmed.total === 0 || unconfirmed.total < offset) {
      const confirmed = await this.getConfirmed(id, {
        offset: offset - unconfirmed.total,
        limit,
      });

      return {
        items: confirmed.items,
        total: unconfirmed.total + confirmed.total,
      };
    }

    const newLimit = limit - unconfirmed.items.length;

    const confirmed = await this.getConfirmed(id, {
      offset: 0,
      limit: newLimit,
    });

    if (unconfirmed.items.length < limit) {
      return {
        items: [...unconfirmed.items, ...confirmed.items],
        total: unconfirmed.total + confirmed.total,
      };
    }

    return {
      items: [...unconfirmed.items],
      total: unconfirmed.total + confirmed.total,
    };
  }
}
