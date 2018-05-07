import { GET_BLOCKS, GET_BLOCKS_SUCCESS } from '../constants/block.types';

export interface BlocksState {
  fetching: boolean;
  blocks: any[];
}

const initialState: BlocksState = {
  blocks: [],
  fetching: false
};

export function blocksReducer (state: BlocksState = initialState, action: any): BlocksState {
  switch (action.type) {
    case GET_BLOCKS: {
      
      return {
        ...state,
        fetching: true
      };
    }
    
    case GET_BLOCKS_SUCCESS: {
      return {
        ...state,
        blocks: action.payload.data,
        fetching: false
      };
    }
    
    default:
      return { ...state };
  }
}
