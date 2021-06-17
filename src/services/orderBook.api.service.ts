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
      SEARCH_TOKEN_BY_ID_STRUCT,
      {
        method: 'get',
        url: `${OrderBookService.apiUrl}/tokens/${value}/issuingBox`,
      },
      {
        dispatch,
      }
    );
  }

  static unspentSellOrdersByTokenId(dispatch: any, tokenId: string): any {
    return fetchStruct(
      UNSPENT_SELL_ORDERS_BY_TOKEN_ID_STRUCT,
      {
        method: 'get',
        url: `${OrderBookService.apiUrl}/dex/tokens/${tokenId}/unspentSellOrders`,
      },
      {
        dispatch,
      }
    );
  }

  static unspentBuyOrdersByTokenId(dispatch: any, tokenId: string): any {
    return fetchStruct(
      UNSPENT_BUY_ORDERS_BY_TOKEN_ID_STRUCT,
      {
        method: 'get',
        url: `${OrderBookService.apiUrl}/dex/tokens/${tokenId}/unspentBuyOrders`,
      },
      {
        dispatch,
      }
    );
  }
}
