import { CLEAR_APP_PRELOADED_STATE } from '../actions/app.actions';
import { GET_BLOCK, GET_BLOCK_SUCCESS } from '../constants/block.types';

import { FullBlock } from '../models/generated/fullBlock';

export interface BlockState {
  fetching: boolean;
  block?: FullBlock;
  references?: any;
  preloaded: boolean;
}

export const initialState: BlockState = {
  fetching: true,
  preloaded: false,
};

export function blockReducer(
  state: BlockState = initialState,
  action: any
): BlockState {
  switch (action.type) {
    case GET_BLOCK: {
      return {
        ...state,
        fetching: true,
      };
    }

    case GET_BLOCK_SUCCESS: {
      return {
        ...state,
        block: action.payload.data.block,
        fetching: false,
        references: action.payload.data.references,
      };
    }

    case CLEAR_APP_PRELOADED_STATE: {
      return {
        ...state,
        preloaded: false,
      };
    }

    default:
      return { ...state };
  }
}
