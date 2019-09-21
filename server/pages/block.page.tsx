import * as express from "express";

import { GET_BLOCK_SUCCESS } from "../../client/src/constants/block.types";
import {
  blockReducer,
  initialState
} from "../../client/src/reducers/block.reducer";
import { BlockApiService } from "../../client/src/services/block.api.service";

export const BlockPage = express.Router();

const render = (req: any, res: any, next: any) => {
  BlockApiService.getBlock(req.params.id)
    .then((data: any) => {
      const preloadedState = blockReducer(initialState, {
        payload: {
          data
        },
        type: GET_BLOCK_SUCCESS
      });

      req.explorer.preloadedState = {
        ...req.explorer.preloadedState,
        block: {
          ...preloadedState,
          preloaded: true
        }
      };

      next();
    })
    .catch((e: Error) => {
      req.explorer.hasError = true;

      console.error(`Block page: ${e}`);

      next();
    });
};

BlockPage.get("/:id", render);
BlockPage.get("/:id/transactions", render);
BlockPage.get("/:id/extension", render);
BlockPage.get("/:id/adproofs", render);
