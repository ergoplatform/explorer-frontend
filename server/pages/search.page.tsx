import express from 'express';
import { SearchApiService } from '../../client/src/services/search.api.service';

import { GET_SEARCH_SUCCESS } from '../../client/src/constants/search.types';

import { initialState, searchReducer } from '../../client/src/reducers/search.reducer';

export const SearchPage = express.Router();

SearchPage.get('/', (req: any, res, next) => {
  const { query } = req.query;

  SearchApiService.search(query)
    .then((data: any) => {
      const preloadedState = searchReducer(initialState, {
        payload: {
          data,
        },
        type: GET_SEARCH_SUCCESS
      });

      req.explorer.preloadedState = {
        ...req.explorer.preloadedState,
        search: {
          ...preloadedState,
          preloaded: true,
        }
      };

      next();
    })
    .catch(() => {
      req.explorer.skipError = true;
      next();
    });
});
