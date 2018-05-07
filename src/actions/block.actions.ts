import { Action, ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_BLOCKS, GET_BLOCKS_SUCCESS } from '../constants/block.types';

const getBlocks = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: GET_BLOCKS
    });
    
    fetch(environment.apiUrl + '/blocks')
      .then((response: Response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          payload: {
            data
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
