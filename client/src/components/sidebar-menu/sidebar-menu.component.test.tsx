import React from 'react';
import { NavLink } from 'react-router-dom';

import { shallowWithIntl } from '../../utils/test-utils';
import {
  ISidebarMenuProps,
  SidebarMenuComponent,
} from './sidebar-menu.component';

describe('Components | Sidebar Menu', () => {
  let props: ISidebarMenuProps;

  beforeEach(() => {
    props = {
      items: [
        {
          title: 'navlink',
          url: 'navlink',
        },
        {
          component: 'foo',
          title: 'foo',
          url: 'foo',
        },
        {
          component: 'bar',
          title: 'bar',
          url: 'bar',
        },
      ],
      onClick: jest.fn(),
    };
  });

  const wrapper = () => shallowWithIntl(<SidebarMenuComponent {...props} />);

  it('renders without crashing', () => {
    expect(wrapper().length).toBe(1);
  });

  it('renders NavLink as component for sidebar menu item by default', () => {
    expect(wrapper().find(NavLink).length).toBe(1);
  });

  it('can render different components for sidebar menu item', () => {
    expect(wrapper().find('foo').length).toBe(1);

    expect(wrapper().find('bar').length).toBe(1);
  });
});
