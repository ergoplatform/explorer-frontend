import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import LanguageSwitcherComponent from '../language-switcher/language-switcher.component';
import SidebarMenuComponent from '../sidebar-menu/sidebar-menu.component';

import './sidebar.scss';

class SidebarComponent extends React.Component {
  props: InjectedIntlProps;
  
  state: {
    isCollapsed: boolean,
  };
  
  constructor (props: any) {
    super(props);
    
    this.toggleCollapse = this.toggleCollapse.bind(this);
    
    this.state = {
      isCollapsed: false
    };
  }
  
  toggleCollapse (): void {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }
  
  render (): JSX.Element {
    const sidebarClassNames = classNames({
      'bi-sidebar': true,
      'bi-sidebar--collapsed': this.state.isCollapsed,
      'g-flex-column': true,
      'g-flex__item-fixed': true
    });
    
    return (
      <div className={ sidebarClassNames }>
        <div className='bi-sidebar__header g-flex g-flex-column__item-fixed'>
          <Link className='bi-sidebar__logo g-flex__item-fixed'
                to='/'>
            <span className='bi-sidebar__logo-highlight'>Ergo</span> Explorer
          </Link>
          
          <button className='bi-sidebar__btn-toggle g-flex__item-fixed'
                  onClick={ this.toggleCollapse }>
            +
          </button>
        </div>
        
        <div className='bi-sidebar__body g-flex-column__item'>
          <SidebarMenuComponent/>
        </div>
        
        <div className='bi-sidebar__footer g-flex-column__item-fixed'>
          <LanguageSwitcherComponent/>
        </div>
      </div>
    );
  }
}

export default injectIntl(SidebarComponent);
