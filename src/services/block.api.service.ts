import axios, { AxiosResponse } from 'axios';
import environment from '../config/environment';

export interface IGetBlocksParams {
  limit?: number;
  offset?: number;
  startDate?: number | null;
  endDate?: number | null;
  sortBy?: string;
  sortDirection?: string;
  searchQuery?: string;
}

export class BlockApiService {
  static get apiUrl(): string {
    return `${environment.apiUrl}/blocks`;
  }

  static getBlock(id: string): any {
    return axios
      .get(`${BlockApiService.apiUrl}/${id}`)
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Block api service. Request: ${BlockApiService.apiUrl}/${id}.`
          );
        }

        return response.data;
      });
  }

  static getBlocks({
    limit,
    offset,
    sortBy,
    sortDirection,
    startDate,
    endDate,
  }: IGetBlocksParams): any {
    return axios
      .get(`${BlockApiService.apiUrl}`, {
        params: {
          endDate,
          limit,
          offset,
          sortBy: sortBy || 'height',
          sortDirection: sortDirection || 'desc',
          startDate,
        },
      })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Block api service. Request: ${BlockApiService.apiUrl}.`
          );
        }

        return response.data;
      });
  }
}
