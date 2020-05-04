import environment from '../config/environment';
import { fetchStruct } from '../utils/fetchStruct';
import {
  GET_ALL_ISSUED_TOKENS_STRUCT,
  GET_TOTAL_ISSUED_TOKENS_STRUCT,
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
      `${IssuedTokensService.apiUrl}/assets/issuingBoxes`,
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
      `${IssuedTokensService.apiUrl}/assets/issuingBoxes`,
      {
        params: {
          limit,
        },
      }
    );
  }
}
