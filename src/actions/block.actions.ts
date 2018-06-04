import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_BLOCK, GET_BLOCK_SUCCESS, GET_BLOCKS, GET_BLOCKS_SUCCESS } from '../constants/block.types';
import { SET_BLOCKS_LIMIT } from '../constants/settings.types';
import { BlockApiService } from '../services/block.api.service';

export interface IGetBlocksParams {
  limit?: number;
  offset?: number;
  startDate?: number;
  endDate?: number;
  sortBy?: string;
  sortDirection?: string;
}

export interface BlockActions extends ActionCreatorsMapObject {
  getBlocks: (args: IGetBlocksParams) => any;
  getBlock: (args: { id: string }) => any;
}

export const BlockActions: BlockActions = {
  getBlocks ({ limit, offset, sortBy, sortDirection, startDate, endDate }: IGetBlocksParams = {}): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_BLOCKS
      });
      
      dispatch({
        payload: {
          blocksLimit: limit
        },
        type: SET_BLOCKS_LIMIT
      });
      
      return BlockApiService.getBlocks({ limit, offset, sortBy, sortDirection, startDate, endDate })
        .then((response: AxiosResponse) => {
          dispatch({
            payload: {
              data: response.data,
              limit,
              offset
            },
            type: GET_BLOCKS_SUCCESS
          });
        });
    };
  },
  
  getBlock ({ id }: { id: string }): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_BLOCK
      });
      
      axios.get(`${environment.apiUrl}/blocks/${id}`)
        .then((response: AxiosResponse) => {
          dispatch({
            payload: {
              data: response.data
            },
            type: GET_BLOCK_SUCCESS
          });
        });
    };
  }
};

