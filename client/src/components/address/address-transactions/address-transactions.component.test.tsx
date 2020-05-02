import React from 'react';

import { shallowWithIntl } from '../../../utils/test-utils';

import { AddressTransactionsComponent } from './address-transactions.component';

import { FullAddressTransactions } from '../../../models/generated/fullAddressTransactions';

describe('Component | Address Transactions', () => {
  let summary: FullAddressTransactions;

  beforeEach(() => {
    summary = {
      confirmed: 100,
      confirmedBalance: 100,
      totalReceived: 100,
    };
  });

  it('should render without crashing', () => {
    const wrapper = shallowWithIntl(
      <AddressTransactionsComponent summary={summary} />
    );

    expect(wrapper.length).toBe(1);
  });
});
