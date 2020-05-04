import { ShallowWrapper } from 'enzyme';
import React from 'react';

import { shallowWithIntl } from '../../utils/test-utils';

import { AppComponent } from './app.component';

describe('App', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallowWithIntl(<AppComponent />);
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
