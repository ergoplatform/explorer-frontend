import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface ISidebarMenuItem {
  props?: NavLinkProps | any;
  icon?: JSX.Element;
  children?: ISidebarMenuItem[];
  title: string;
  url: string;
  component?: any;
}

import './sidebar-menu.scss';

export class SidebarMenuComponent extends React.Component {
  props: {
    onClick: any;
    items: ISidebarMenuItem[];
  };
  
  render (): JSX.Element {
    return <div className='bi-sidebar-menu g-flex-column'>
      { this.mapLinks(this.props.items) }
    </div>;
  }
  
  private mapLinks (items: ISidebarMenuItem[]): any {
    return items.map((item, index) => {
      const Component = item.component || NavLink;
      
      return (
        <div className='bi-sidebar-menu__item g-flex-column__item' key={ index }>
          <Component className='bi-sidebar-menu__item-wrapper g-flex'
                   activeClassName='bi-sidebar-menu__item-wrapper--active'
                   to={ item.url }
                   exact={ true }
                   onClick={ this.props.onClick }
                   { ...item.props }>
            { item.icon }
            
            <span className='bi-sidebar-menu__item-title g-flex__item'>
              <FormattedMessage id={ item.title }/>
            </span>
          </Component>
          
          { item.children && (
            <div className='bi-sidebar-menu__item-children g-flex-column'>
              { this.mapLinks(item.children) }
            </div>
          ) }
        </div>
      );
    });
  }
}
