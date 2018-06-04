import axios from 'axios';
import { IGetBlocksParams } from '../actions/block.actions';
import environment from '../config/environment';

export const BlockApiService = {
  getBlocks ({ limit, offset, sortBy, sortDirection, startDate, endDate }: IGetBlocksParams): any {
    console.debug(environment);
    
    return axios.get(`${environment.apiUrl}/blocks`, {
      params: {
        endDate,
        limit,
        offset,
        sortBy: sortBy || 'height',
        sortDirection: sortDirection || 'desc',
        startDate
      }
    });
  }
};
