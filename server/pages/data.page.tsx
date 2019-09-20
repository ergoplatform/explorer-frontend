import * as express from 'express';

import { BlockApiService } from '../../client/src/services/block.api.service';

export const DataPage = express.Router();

DataPage.get('/', (req: any, res, next) => {
  let { offset, sortBy, sortDirection, startDate, endDate, limit } = req.query;

  offset = parseInt(offset, 10) || 0;
  limit = parseInt(limit, 10) || 30;

  BlockApiService.getBlocks({ limit, offset, sortBy, sortDirection, startDate, endDate })
    .then((data: any) => {
      const preloadedState = {
        blocks: {
          blocks: data.items,
          offset,
          preloaded: true,
          total: data.total
        }
      };

      req.explorer.preloadedState = { ...req.explorer.preloadedState, ...preloadedState };

      next();
    })
    .catch((e: Error) => {
      req.explorer.hasError = true;

      console.error(e);
      next();
    });
});
