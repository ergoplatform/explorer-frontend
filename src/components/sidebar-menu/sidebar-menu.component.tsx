import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

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

class SidebarMenuComponent extends React.PureComponent {
  props: InjectedIntlProps;
  
  render (): JSX.Element {
    return <div className='bi-sidebar-menu g-flex-column'>
      { SIDEBAR_MENU_ITEMS.map((item, index) => {
        return (
          <Link className='bi-sidebar-menu__item g-flex-column__item' to={ item.url } key={ index }>
            { this.props.intl.formatMessage({ id: item.title }) }
          </Link>
        );
      }) }
    </div>;
  }
}

export default injectIntl(SidebarMenuComponent);
