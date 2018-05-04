import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import './sidebar-menu.scss';

interface ISidebarMenuItem {
  icon?: string;
  title: string;
  url: string;
}

const SIDEBAR_MENU_ITEMS: ISidebarMenuItem[] = [
  {
    title: 'components.sidebar-menu.items.data',
    url: '/'
  },
  {
    title: 'components.sidebar-menu.items.api',
    url: '/api'
  }
];

class SidebarMenuComponent extends React.Component {
  props: InjectedIntlProps;
  
  render (): JSX.Element {
    return <div className='bi-sidebar-menu g-flex-column'>
      {
        SIDEBAR_MENU_ITEMS.map((item, index) => {
          return (
            <NavLink className='bi-sidebar-menu__item g-flex-column__item'
                     activeClassName='bi-sidebar-menu__item--active'
                     to={ item.url }
                     exact={ true }
                     key={ index }>
              { this.props.intl.formatMessage({ id: item.title }) }
            </NavLink>
          );
        })
      }
    </div>;
  }
}

export default injectIntl(SidebarMenuComponent);
