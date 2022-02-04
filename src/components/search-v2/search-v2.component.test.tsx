import React from 'react';

import { shallowWithIntl } from '../../utils/test-utils';

import { SearchV2Component } from './search-v2.component';

describe('Components | Search', () => {
  it('renders without crashing', () => {
    const wrapper = shallowWithIntl(<SearchV2Component />);

    expect(wrapper.length).toBe(1);
  });
});
