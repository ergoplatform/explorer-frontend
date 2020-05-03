import { ShallowWrapper } from 'enzyme';
import React from 'react';

import { shallowWithIntl } from '../../../utils/test-utils';

import environment from '../../../config/environment';

import { CoinValueComponent } from './coin-value.component';

describe('Component | Coin Value', () => {
  let value: number;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    value = 1000000000000;

    wrapper = shallowWithIntl(<CoinValueComponent value={value} />);
  });

  it('should render without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should transform value correctly', () => {
    expect(wrapper.text()).toEqual(
      `${1000} ${environment.blockchain.coinName.toLocaleUpperCase()}`
    );
  });
});
