import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_BLOCK, GET_BLOCK_SUCCESS, GET_BLOCKS, GET_BLOCKS_SUCCESS } from '../constants/block.types';

interface IGetBlocksParams {
  limit?: number;
  offset?: number;
}

const getBlocks = ({ limit, offset }: IGetBlocksParams = {}) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: GET_BLOCKS
    });
    
    axios.get(`${environment.apiUrl}/blocks`, {
      params: {
        limit,
        offset
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
};

const getBlock = ({ id }: { id: string }) => {
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
};

export interface BlockActions extends ActionCreatorsMapObject {
  getBlocks: ActionCreator<any>;
  getBlock: ActionCreator<any>;
}

export const BlockActions: BlockActions = {
  getBlock,
  getBlocks
};
