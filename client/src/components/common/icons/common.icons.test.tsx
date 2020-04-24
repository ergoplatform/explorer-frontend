import React from 'react';
import { shallowWithIntl } from '../../../utils/test-utils';

import {
  ApiIcon,
  ArrowDownIcon,
  ArrowIcon,
  ArrowThickIcon,
  BurgerIcon,
  ChartIcon,
  CrossIcon,
  DataIcon,
  DoubleArrowIcon,
  makeIcon,
  QRCodeIcon,
  SearchIcon,
  SortDirectionAscIcon,
  SortDirectionDescIcon,
  SortDirectionIcon,
  StatsIcon,
} from './common.icons';

describe('Components | CommonIcons', () => {
  it('should render without crashing', () => {
    const icons = [
      SearchIcon,
      ArrowIcon,
      DataIcon,
      ApiIcon,
      ChartIcon,
      StatsIcon,
      QRCodeIcon,
      CrossIcon,
      DoubleArrowIcon,
      SortDirectionIcon,
      SortDirectionAscIcon,
      SortDirectionDescIcon,
      BurgerIcon,
      ArrowDownIcon,
      ArrowThickIcon,
    ];

    icons.forEach((Icon) => {
      const wrapper = shallowWithIntl(<Icon />);

      expect(wrapper.length).toBe(1);
    });
  });

  it('should return correct svg icon', () => {
    const Icon = makeIcon('foo', 'bar');

    const wrapper = shallowWithIntl(Icon);

    expect(wrapper.find('svg use').prop('xlinkHref')).toEqual('#foo');

    expect(wrapper.find('svg').hasClass('bar')).toBeTruthy();
  });
});
