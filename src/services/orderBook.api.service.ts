import environment from '../config/environment';
import { fetchStruct } from '../utils/fetchStruct';
import {
  SEARCH_TOKEN_BY_ID_STRUCT,
  UNSPENT_SELL_ORDERS_BY_TOKEN_ID_STRUCT,
  UNSPENT_BUY_ORDERS_BY_TOKEN_ID_STRUCT,
} from '../constants/struct.types';

export class OrderBookService {
  static get apiUrl(): string {
    return `${environment.apiUrl}`;
  }

  static searchTokenById(dispatch: any, value: string): any {
    return fetchStruct(
      dispatch,
      SEARCH_TOKEN_BY_ID_STRUCT,
      'get',
      `${OrderBookService.apiUrl}/tokens/${value}/issuingBox`
    );
  }

  static unspentSellOrdersByTokenId(dispatch: any, tokenId: string): any {
    return fetchStruct(
      dispatch,
      UNSPENT_SELL_ORDERS_BY_TOKEN_ID_STRUCT,
      'get',
      `${OrderBookService.apiUrl}/dex/tokens/${tokenId}/unspentSellOrders`
    );
  }

  static unspentBuyOrdersByTokenId(dispatch: any, tokenId: string): any {
    return fetchStruct(
      dispatch,
      UNSPENT_BUY_ORDERS_BY_TOKEN_ID_STRUCT,
      'get',
      `${OrderBookService.apiUrl}/dex/tokens/${tokenId}/unspentBuyOrders`
    );
  }
}
