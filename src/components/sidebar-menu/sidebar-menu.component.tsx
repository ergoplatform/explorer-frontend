import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink, NavLinkProps } from 'react-router-dom';
import './sidebar-menu.scss';

export interface ISidebarMenuItem {
  props?: NavLinkProps | any;
  icon?: JSX.Element;
  children?: ISidebarMenuItem[];
  title: string;
  url: string;
  component?: any;
  external?: boolean;
}

export interface ISidebarMenuProps {
  onClick: any;
  items: ISidebarMenuItem[];
}

export class SidebarMenuComponent extends React.Component<ISidebarMenuProps> {
  render(): JSX.Element {
    return (
      <div className="bi-sidebar-menu g-flex-column">
        {this.mapLinks(this.props.items)}
      </div>
    );
  }

  private mapLinks(items: ISidebarMenuItem[]): any {
    return items.map((item, index) => {
      const isExternalLink = item.external || false;
      const Component = item.component || NavLink;

      if (isExternalLink) {
        return (
          <div
            className="bi-sidebar-menu__item g-flex-column__item"
            key={index}
          >
            <a
              className="bi-sidebar-menu__item-wrapper g-flex"
              href={item.url}
              onClick={this.props.onClick}
              {...item.props}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}

              <span className="bi-sidebar-menu__item-title g-flex__item">
                <span>
                  <FormattedMessage id={item.title} />
                </span>
              </span>
            </a>

            {item.children && (
              <div className="bi-sidebar-menu__item-children g-flex-column">
                {this.mapLinks(item.children)}
              </div>
            )}
          </div>
        );
      }

      return (
        <div className="bi-sidebar-menu__item g-flex-column__item" key={index}>
          <Component
            className="bi-sidebar-menu__item-wrapper g-flex"
            activeClassName="bi-sidebar-menu__item-wrapper--active"
            to={item.url}
            exact={true}
            onClick={this.props.onClick}
            {...item.props}
          >
            {item.icon}

            <span className="bi-sidebar-menu__item-title g-flex__item">
              <FormattedMessage id={item.title} />
            </span>
          </Component>

          {item.children && (
            <div className="bi-sidebar-menu__item-children g-flex-column">
              {this.mapLinks(item.children)}
            </div>
          )}
        </div>
      );
    });
  }
}
