import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_BLOCKS, GET_BLOCKS_SUCCESS } from '../constants/block.types';

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
      headers: {
        Accept: 'application/json'
      },
      params: {
        limit,
        offset,
      }
    })
      .then((response: AxiosResponse) => {
        dispatch({
          payload: {
            data: response.data,
            limit,
            offset,
          },
          type: GET_BLOCKS_SUCCESS
        });
      });
  };
};

export interface BlockActions extends ActionCreatorsMapObject {
  getBlocks: ActionCreator<any>;
}

export const BlockActions: BlockActions = {
  getBlocks
};
