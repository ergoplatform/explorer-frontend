import { ShallowWrapper } from 'enzyme';
import React from 'react';

import { getMessageByKey, mountWithIntl } from '../../utils/test-utils';

import { StatsItemComponent } from './stats-item.component';

describe('Stats item', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = mountWithIntl(
      <StatsItemComponent title="marketCap" value="100" />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('translates given title key', () => {
    expect(wrapper.find('.bi-stats-item__title').text()).toEqual(
      getMessageByKey('common.stats.marketCap')
    );
  });

  it('renders value', () => {
    expect(wrapper.find('.bi-stats-item__value').text()).toEqual('100');
  });
});
