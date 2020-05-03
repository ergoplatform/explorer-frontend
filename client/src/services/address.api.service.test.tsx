import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import environment from '../config/environment';

import { AddressApiService } from './address.api.service';

describe('Services | AddressApiService', () => {
  let adapter: MockAdapter;
  let addressId: string;

  beforeEach(() => {
    adapter = new MockAdapter(axios);

    addressId = 'foo';
  });

  it('should provider correct apiUrl', () => {
    expect(AddressApiService.apiUrl).toBe(`${environment.apiUrl}/addresses`);
  });

  it('returns data when getAddress called', () => {
    const data = { response: true };

    adapter.onGet(`${AddressApiService.apiUrl}/${addressId}`).reply(200, data);

    AddressApiService.getAddress(addressId).then((responseData: any) => {
      expect(responseData).toEqual(data);
    });
  });

  it('returns data when getAddressTransactions called', () => {
    const data = { response: true };

    adapter
      .onGet(`${AddressApiService.apiUrl}/${addressId}/transactions`)
      .reply(200, data);

    AddressApiService.getAddressTransactions(addressId, {}).then(
      (responseData: any) => {
        expect(responseData).toEqual(data);
      }
    );
  });
});
