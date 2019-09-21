import * as express from 'express';

import { GET_TRANSACTION_SUCCESS } from '../../client/src/constants/transaction.types';

import { initialState, transactionReducer } from '../../client/src/reducers/transaction.reducer';
import { TransactionApiService } from '../../client/src/services/transaction.api.service';

export const TransactionPage = express.Router();

const render = (req: any, res: any, next: any) => {
  TransactionApiService.getTransaction(req.params.id)
    .then((data: any) => {
      const preloadedState = transactionReducer(initialState, {
        payload: {
          data
        },
        type: GET_TRANSACTION_SUCCESS
      });

      req.explorer.preloadedState = {
        ...req.explorer.preloadedState,
        transaction: {
          ...preloadedState,
          preloaded: true
        }
      };

      next();
    })
    .catch((e: Error) => {
      req.explorer.hasError = true;
      console.error(`Transaction page: ${e}`);

      next();
    });
};


TransactionPage.get('/:id', render);
