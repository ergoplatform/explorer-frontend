import * as express from 'express';

import { BlockApiService } from '../../services/block.api.service';

export const DataPage = express.Router();

DataPage.get('/', (req: any, res, next) => {
  let { offset, sortBy, sortDirection, startDate, endDate } = req.query;
  
  offset = parseInt(offset, 10) || 0;
  
  BlockApiService.getBlocks({ limit: 30, offset, sortBy, sortDirection, startDate, endDate })
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
    });
});
