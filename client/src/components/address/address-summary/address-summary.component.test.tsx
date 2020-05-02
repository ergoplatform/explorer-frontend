import React from 'react';

import { shallowWithIntl } from '../../../utils/test-utils';
import { AddressSummaryComponent } from './address-summary.component';

import { FullAddressSummary } from '../../../models/generated/fullAddressSummary';

describe('Component | Address Summary', () => {
  let summary: FullAddressSummary;

  beforeEach(() => {
    summary = {
      id: 'foo',
    };
  });

  it('should render without crashing', () => {
    const wrapper = shallowWithIntl(
      <AddressSummaryComponent summary={summary} />
    );

    expect(wrapper.length).toBe(1);
  });
});
