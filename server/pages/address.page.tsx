import * as express from 'express';

import { GET_ADDRESS_SUCCESS } from '../../client/src/constants/address.types';

import { addressReducer, initialState } from '../../client/src/reducers/address.reducer';
import { AddressApiService } from '../../client/src/services/address.api.service';

export const AddressPage = express.Router();

const render = (req: any, res: any, next: any) => {
  AddressApiService.getAddress(req.params.id)
    .then((data: any) => {
      const preloadedState = addressReducer(initialState, {
        payload: {
          data
        },
        type: GET_ADDRESS_SUCCESS
      });
      
      AddressApiService.getAddressTransactions(req.params.id, req.query)
        .then((transactionsData: any) => {
          req.explorer.preloadedState = {
            ...req.explorer.preloadedState,
            address: {
              ...preloadedState,
              preloaded: true,
              transactions: transactionsData
            }
          };
          
          next();
        });
    });
};


AddressPage.get('/:id', render);
