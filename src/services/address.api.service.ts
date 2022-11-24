import { GET_ADDRESSES_BALANCES_STRUCT } from './../constants/struct.types';
import axios, { AxiosResponse } from 'axios';

import environment from '../config/environment';
import { fetchStruct } from 'src/utils/fetchStruct';

export class AddressApiService {
  static get apiUrl(): string {
    return `${environment.apiUrl}/addresses`;
  }

  static getAddress(id: string): any {
    return axios
      .get(`${environment.apiUrlV1}/addresses/${id}/balance/total`)
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Address api service. Request: ${environment.apiUrlV1}/addresses/${id}/balance/total.`
          );
        }

        return response.data;
      });
  }

  static getConfirmed(id: string, params: any) {
    return axios
      .get(`${environment.apiUrlV1}/addresses/${id}/transactions`, {
        params,
      })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Address api service. Request: ${environment.apiUrlV1}/addresses/${id}/transactions.`
          );
        }

        return response.data;
      });
  }

  static getUnconfirmed(id: string, params: any) {
    return axios
      .get(`${environment.apiUrlV1}/mempool/transactions/byAddress/${id}`, {
        params,
      })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Address api service. Request: ${environment.apiUrlV1}/mempool/transactions/byAddress/${id}`
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

    if (unconfirmed.items.length < limit) {
      const newLimit = limit - unconfirmed.items.length;

      const confirmed = await this.getConfirmed(id, {
        offset: 0,
        limit: newLimit,
      });

      return {
        items: [...unconfirmed.items, ...confirmed.items],
        total: unconfirmed.total + confirmed.total,
      };
    }

    const confirmed = await this.getConfirmed(id, {
      offset: 0,
      limit: 1,
    });

    return {
      items: [...unconfirmed.items],
      total: unconfirmed.total + confirmed.total,
    };
  }

  static getAddressesBalances(dispatch: any): any {
    return fetchStruct(
      GET_ADDRESSES_BALANCES_STRUCT,
      {
        method: 'get',
        url: `https://api.ergo.watch/lists/addresses/by/balance?limit=100`,
      },
      {
        dispatch,
      }
    );
  }
}
