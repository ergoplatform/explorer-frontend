import { GET_BLOCK, GET_BLOCK_SUCCESS } from '../constants/block.types';

export interface BlockState {
  fetching: boolean;
  block: any;
}

const initialState: BlockState = {
  block: {},
  fetching: true,
};

export function blockReducer (state: BlockState = initialState, action: any): BlockState {
  switch (action.type) {
    case GET_BLOCK: {
      
      return {
        ...state,
        fetching: true
      };
    }
    
    case GET_BLOCK_SUCCESS: {
      return {
        ...state,
        block: action.payload.data.block,
        fetching: false
      };
    }
    
    default:
      return { ...state };
  }
}
