import { ShallowWrapper } from 'enzyme';
import React from 'react';

import { getMessageByKey, mountWithIntl } from '../../utils/test-utils';

import { StatsItemV2Component } from './stats-item-v2.component';

describe('Stats item', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = mountWithIntl(
      <StatsItemV2Component title="marketCap" value="100" />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('translates given title key', () => {
    expect(wrapper.find('.bi-stats-item-v2__title').text()).toEqual(
      getMessageByKey('common.stats.marketCap')
    );
  });

  it('renders value', () => {
    expect(wrapper.find('.bi-stats-item-v2__value').text()).toEqual('100');
  });
});
