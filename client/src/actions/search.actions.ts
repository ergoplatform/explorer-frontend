import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';
import { GET_SEARCH, GET_SEARCH_SUCCESS } from '../constants/search.types';
import { SearchApiService } from '../services/search.api.service';

export interface SearchActions extends ActionCreatorsMapObject {
  search: (query: string | string[]) => any;
}

export const SearchActions: SearchActions = {
  search (query: string | string[]): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_SEARCH
      });
      
      return SearchApiService.search(query)
        .then((data: any) => {
          dispatch({
            payload: {
              data,
            },
            type: GET_SEARCH_SUCCESS,
          });
        });
    };
  }
};
