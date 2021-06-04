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
      dispatch,
      GET_ALL_ISSUED_TOKENS_STRUCT,
      'get',
      `https://api.ergoplatform.com/api/v1/tokens`,
      {
        params: {
          limit,
          offset,
        },
      }
    );
  }

  static getTotalIssuedTokens(dispatch: any, { limit }: any): any {
    return fetchStruct(
      dispatch,
      GET_TOTAL_ISSUED_TOKENS_STRUCT,
      'get',
      `https://api.ergoplatform.com/api/v1/tokens`,
      {
        params: {
          limit,
        },
      }
    );
  }

  static getIssuedTokensById(dispatch: any, tokenId: string): any {
    return fetchStruct(
      dispatch,
      GET_ISSUED_TOKENS_BY_ID_STRUCT,
      'get',
      `${IssuedTokensService.apiUrl}/tokens/${tokenId}/issuingBox`
    );
  }
}
