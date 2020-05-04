import dayjs from 'dayjs';
import { ShallowWrapper } from 'enzyme';
import React from 'react';

import { shallowWithIntl } from '../../../utils/test-utils';

import { TimestampComponent } from './timestamp.component';

describe('Components | Timestamp', () => {
  let date: Date;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    date = new Date();
    wrapper = shallowWithIntl(
      <TimestampComponent timestamp={date.getTime()} />
    );
  });

  it('should render without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render correct format', () => {
    expect(wrapper.find('span').first().text()).toEqual(
      dayjs(date).format('HH:mm:ss')
    );

    expect(wrapper.find('span').last().text()).toEqual(
      dayjs(date).format('DD.MM.YYYY')
    );
  });
});
