import environment from '../config/environment';
import { fetchStruct } from '../utils/fetchStruct';
import { GET_UNCONFIRMED_TRANSACTION_STRUCT } from '../constants/struct.types';

export class UnconfirmedTransactionService {
  static get apiUrl(): string {
    return `${environment.apiUrl}`;
  }

  static getUnconfirmedTransaction(dispatch: any, id: string): any {
    return fetchStruct(
      GET_UNCONFIRMED_TRANSACTION_STRUCT,
      {
        method: 'get',
        url: `${UnconfirmedTransactionService.apiUrl}/transactions/unconfirmed/${id}`,
      },
      {
        dispatch,
      }
    ).catch(() => ({}));
  }
}
