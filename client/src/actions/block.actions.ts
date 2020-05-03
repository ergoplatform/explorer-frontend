import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import {
  GET_BLOCK,
  GET_BLOCK_SUCCESS,
  GET_BLOCKS,
  GET_BLOCKS_SUCCESS,
} from '../constants/block.types';
import {
  BlockApiService,
  IGetBlocksParams,
} from '../services/block.api.service';

export interface BlockActions extends ActionCreatorsMapObject {
  getBlocks: (args: IGetBlocksParams) => any;
  getBlock: (args: { id: string }) => any;
}

export const BlockActions: BlockActions = {
  getBlocks({
    limit,
    offset,
    sortBy,
    sortDirection,
    startDate,
    endDate,
  }: IGetBlocksParams = {}): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_BLOCKS,
      });

      return BlockApiService.getBlocks({
        limit,
        offset,
        sortBy,
        sortDirection,
        startDate,
        endDate,
      }).then((data: any) => {
        dispatch({
          payload: {
            data,
            limit,
            offset,
          },
          type: GET_BLOCKS_SUCCESS,
        });
      });
    };
  },

  getBlock({ id }: { id: string }): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_BLOCK,
      });

      return BlockApiService.getBlock(id).then((data: any) => {
        dispatch({
          payload: {
            data,
          },
          type: GET_BLOCK_SUCCESS,
        });
      });
    };
  },
};
