import environment from '../config/environment';
import { fetchStruct } from '../utils/fetchStruct';
import { GET_ALL_ISSUED_TOKENS_STRUCT } from '../constants/struct.types';

export class IssuedTokensService {
  static get apiUrl(): string {
    return `${environment.api2Url}`;
  }

  static getAllIssuedTokens(
    dispatch: any,
    { limit, offset, sortBy, sortDirection, startDate, endDate }: any
  ): any {
    return fetchStruct(
      dispatch,
      GET_ALL_ISSUED_TOKENS_STRUCT,
      'get',
      `${IssuedTokensService.apiUrl}/assets/issuingBoxes`,
      {
        params: {
          endDate,
          limit,
          offset,
          sortBy: sortBy || 'height',
          sortDirection: sortDirection || 'desc',
          startDate,
        },
      }
    );
  }
}
