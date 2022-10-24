import environment from '../config/environment';
import { fetchStruct } from '../utils/fetchStruct';
import {
  GET_ALL_ISSUED_TOKENS_STRUCT,
  GET_TOTAL_ISSUED_TOKENS_STRUCT,
  GET_ISSUED_TOKENS_BY_ID_STRUCT,
} from '../constants/struct.types';

export class IssuedTokensService {
  static get apiUrl(): string {
    return `${environment.apiUrl}`;
  }

  static getAllIssuedTokens(dispatch: any, { limit, offset }: any): any {
    return fetchStruct(
      GET_ALL_ISSUED_TOKENS_STRUCT,
      {
        method: 'get',
        url: `${environment.apiUrlV1}/tokens`,
        params: {
          limit,
          offset,
        },
      },
      {
        dispatch,
      }
    );
  }

  static getSearchIssuedTokensByQuery(
    dispatch: any,
    { searchQuery, limit, offset }: any
  ): any {
    return fetchStruct(
      GET_ALL_ISSUED_TOKENS_STRUCT,
      {
        method: 'get',
        url: `${environment.apiUrlV1}/tokens/search`,
        params: {
          limit,
          offset,
          query: searchQuery,
        },
      },
      {
        dispatch,
      }
    );
  }

  static getTotalIssuedTokens(dispatch: any, { limit }: any): any {
    return fetchStruct(
      GET_TOTAL_ISSUED_TOKENS_STRUCT,
      {
        method: 'get',
        url: `${environment.apiUrlV1}/api/v1/tokens`,
        params: {
          limit,
        },
      },
      {
        dispatch,
      }
    );
  }

  static getIssuedTokensById(dispatch: any, tokenId: string): any {
    return fetchStruct(
      GET_ISSUED_TOKENS_BY_ID_STRUCT,
      {
        method: 'get',
        url: `${IssuedTokensService.apiUrl}/tokens/${tokenId}/issuingBox`,
      },
      {
        dispatch,
      }
    );
  }
}
