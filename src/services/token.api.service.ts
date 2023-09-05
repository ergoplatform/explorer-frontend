import environment from '../config/environment';
import { fetchStruct } from '../utils/fetchStruct';
import { GET_TOKEN_STRUCT } from '../constants/struct.types';

export class TokenService {
  static get apiUrl(): string {
    return `${environment.apiUrlV1}`;
  }

  static getTokenById(dispatch: any, { id }: any): any {
    return fetchStruct(
      GET_TOKEN_STRUCT,
      {
        method: 'get',
        url: `${TokenService.apiUrl}/tokens/${id}`,
      },
      {
        dispatch,
      }
    ).catch(() => {});
  }
}
