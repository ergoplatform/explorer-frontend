import * as React from 'react';

import { shallowWithIntl } from '../../../utils/test-utils';

import { AddressTransactionsComponent } from './address-transactions.component';

import { FullAddressTransactionSummary } from '../../../models/generated/fullAddress';

describe('Component | Address Transactions', () => {
  let summary: FullAddressTransactionSummary;
  
  beforeEach(() => {
    summary = {
      balance: 100,
      total: 100,
      totalReceived: 100
    };
  });
  
  it('should render without crashing', () => {
    const wrapper = shallowWithIntl(<AddressTransactionsComponent summary={ summary }/>);
    
    expect(wrapper.length)
      .toBe(1);
  });
});
