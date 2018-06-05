import * as React from 'react';

import { shallowWithIntl } from '../../utils/test-utils';

import { SearchComponent } from './search.component';

describe('Components | Search', () => {
  it('renders without crashing', () => {
    const wrapper = shallowWithIntl(<SearchComponent/>);
    
    expect(wrapper.length)
      .toBe(1);
  });
});
