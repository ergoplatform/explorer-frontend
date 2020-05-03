import { CLEAR_APP_PRELOADED_STATE } from '../actions/app.actions';
import { GET_BLOCKS, GET_BLOCKS_SUCCESS } from '../constants/block.types';

export interface BlocksState {
  fetching: boolean;
  total: number;
  blocks: any[];
  offset: number;
  preloaded: boolean;
}

const initialState: BlocksState = {
  blocks: [],
  fetching: false,
  offset: 0,
  preloaded: false,
  total: 0,
};

export function blocksReducer(
  state: BlocksState = initialState,
  action: any
): BlocksState {
  switch (action.type) {
    case GET_BLOCKS: {
      return {
        ...state,
        fetching: true,
      };
    }

    case GET_BLOCKS_SUCCESS: {
      return {
        ...state,
        blocks: action.payload.data.items,
        fetching: false,
        offset: action.payload.offset,
        total: action.payload.data.total,
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
