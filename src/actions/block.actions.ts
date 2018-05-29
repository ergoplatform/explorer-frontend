import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_BLOCK, GET_BLOCK_SUCCESS, GET_BLOCKS, GET_BLOCKS_SUCCESS } from '../constants/block.types';
import { SET_BLOCKS_LIMIT } from '../constants/settings.types';

interface IGetBlocksParams {
  limit?: number;
  offset?: number;
}

export interface BlockActions extends ActionCreatorsMapObject {
  getBlocks: (args: IGetBlocksParams) => any;
  getBlock: (args: { id: string }) => any;
}

export const BlockActions: BlockActions = {
  getBlocks ({ limit, offset }: IGetBlocksParams = {}): any {
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
      
      axios.get(`${environment.apiUrl}/blocks`, {
        params: {
          limit,
          offset,
          sortBy: 'height',
          sortDirection: 'desc'
        }
      })
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

