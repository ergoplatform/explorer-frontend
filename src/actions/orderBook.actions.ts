import { ActionCreatorsMapObject } from 'redux';
import { OrderBookService } from '../services/orderBook.api.service';
import { resetStruct } from 'redux-struct';
import {
  UNSPENT_BUY_ORDERS_BY_TOKEN_ID_STRUCT,
  UNSPENT_SELL_ORDERS_BY_TOKEN_ID_STRUCT,
} from '../constants/struct.types';

export interface OrderBookActions extends ActionCreatorsMapObject {
  searchByTokenId: (query: string) => any;
  unspentSellOrdersByTokenId: (tokenId: string) => any;
  unspentBuyOrdersByTokenId: (tokenId: string) => any;
  resetUnspentSellOrdersByTokenId: () => any;
  resetUnspentBuyOrdersByTokenId: () => any;
}

export const OrderBookActions: OrderBookActions = {
  searchByTokenId(query: string): any {
    return (dispatch: any) => OrderBookService.searchTokenById(dispatch, query);
  },

  unspentSellOrdersByTokenId(tokenId: string): any {
    return (dispatch: any) =>
      OrderBookService.unspentSellOrdersByTokenId(dispatch, tokenId);
  },

  unspentBuyOrdersByTokenId(tokenId: string): any {
    return (dispatch: any) =>
      OrderBookService.unspentBuyOrdersByTokenId(dispatch, tokenId);
  },

  resetUnspentSellOrdersByTokenId(): any {
    return (dispatch: any) =>
      dispatch(resetStruct(UNSPENT_SELL_ORDERS_BY_TOKEN_ID_STRUCT));
  },

  resetUnspentBuyOrdersByTokenId(): any {
    return (dispatch: any) =>
      dispatch(resetStruct(UNSPENT_BUY_ORDERS_BY_TOKEN_ID_STRUCT));
  },
};
