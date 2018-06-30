import * as classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { bindActionCreators } from 'redux';

import environment from '../../config/environment';

import { AppState } from '../../store/app.store';

import { ApiActions } from '../../actions/api.actions';
import { SettingsActions } from '../../actions/settings.actions';
import { ApiState } from '../../reducers/api.reducer';
import { SettingsState } from '../../reducers/settings.reducer';

import { EnvironmentSwitcherComponent } from '../common/environment-switcher/environment-switcher.component';
import { LanguageSwitcherComponent } from '../common/language-switcher/language-switcher.component';
import { ISidebarMenuItem, SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';

import { ArrowIcon } from '../common/icons/common.icons';

import logoImage from '../../assets/images/logo.svg';

import './sidebar.scss';

import { ApiIcon, ChartIcon, DataIcon, StatsIcon, WalletIcon } from '../common/icons/common.icons';

const SIDEBAR_MENU_ITEMS: ISidebarMenuItem[] = [
  {
    icon: <DataIcon className='bi-sidebar-menu__item-icon g-flex__item-fixed'/>,
    props: {
      isActive: (match: any, path: any) => {
        return (match || path.pathname.match(/^(\/blocks\/|\/addresses\/|\/transactions\/)/)
        );
      }
    },
    title: 'components.sidebar-menu.items.data',
    url: '/'
  },
  {
    icon: <WalletIcon className='bi-sidebar-menu__item-icon g-flex__item-fixed'/>,
    title: 'components.sidebar-menu.items.wallet',
    url: '/wallet'
  },
  {
    icon: <ChartIcon className='bi-sidebar-menu__item-icon g-flex__item-fixed'/>,
    props: {
      exact: false
    },
    title: 'components.sidebar-menu.items.charts',
    url: '/charts'
  },
  {
    icon: <StatsIcon className='bi-sidebar-menu__item-icon g-flex__item-fixed'/>,
    title: 'components.sidebar-menu.items.stats',
    url: '/stats'
  },
  {
    icon: <ApiIcon className='bi-sidebar-menu__item-icon g-flex__item-fixed'/>,
    props: {
      exact: false
    },
    title: 'components.sidebar-menu.items.api',
    url: '/api'
  }
];

class Sidebar extends React.Component<SettingsActions & ApiActions & { settings: SettingsState, api: ApiState }> {
  constructor (props: any) {
    super(props);
    
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.hideSidebar    = this.hideSidebar.bind(this);
  }
  
  componentDidMount (): void {
    if (!this.props.api.data) {
      this.props.getApi();
    }
  }
  
  toggleCollapse (): void {
    if (this.props.isSidebarDisplayed) {
      return this.hideSidebar();
    }
    
    this.props.setSidebarCollapsedStatus(!this.props.settings.isSidebarCollapsed);
  }
  
  hideSidebar (): void {
    this.props.setSidebarDisplayStatus(false);
  }
  
  render (): JSX.Element {
    const sidebarClassNames = classNames({
      'bi-sidebar': true,
      'bi-sidebar--collapsed': this.props.settings.isSidebarCollapsed,
      'bi-sidebar--open': this.props.settings.isSidebarDisplayed,
      'g-flex-column': true,
      'g-flex__item-fixed': true
    });
    
    const items = [...SIDEBAR_MENU_ITEMS];
    
    if (this.props.api.data) {
      const apiIndex = items.findIndex((item: ISidebarMenuItem) => item.url === '/api');
      
      items[apiIndex].children = this.props.api.data.tags.map((tag: any): ISidebarMenuItem => {
        return {
          component: NavHashLink,
          props: {
            isActive: (match: any, location: any): boolean => {
              return location.pathname === '/api' && location.hash === `#${tag.name}`;
            }
          },
          title: `components.sidebar-menu.items.api-${tag.name}`,
          url: `/api#${tag.name}`
        };
      });
    }
    
    return (
      <div className={ sidebarClassNames }>
        <div className='bi-sidebar__header g-flex g-flex-column__item-fixed'>
          <Link className='bi-sidebar__logo g-flex__item-fixed'
                onClick={ this.hideSidebar }
                to='/'
                tabIndex={ this.props.isSidebarCollapsed ? -1 : 0 }>
            <svg className='bi-sidebar__logo-icon'>
              focusable='false'>
              <use xlinkHref={ `#${logoImage.id}` }/>
            </svg>
          </Link>
          
          <button className='bi-sidebar__btn-toggle bi-btn bi-btn--flat g-flex__item-fixed g-flex'
                  onClick={ this.toggleCollapse }>
            <ArrowIcon className='bi-sidebar__btn-toggle-icon'/>
          </button>
        </div>
        
        <div className='bi-sidebar__body g-flex-column__item'>
          <SidebarMenuComponent onClick={ this.hideSidebar } items={ items }/>
        </div>
        
        
        <svg className='bi-sidebar__side-logo'
             focusable='false'>
          <use xlinkHref={ `#${logoImage.id}` }/>
        </svg>
        
        <div className='bi-sidebar__footer g-flex-column__item-fixed g-flex'>
          <div className='bi-sidebar__footer-line g-flex__item-fixed g-flex'>
            <EnvironmentSwitcherComponent/>
            
            <LanguageSwitcherComponent/>
          </div>
          
          <div className='bi-sidebar__footer-line g-flex__item-fixed'>
            <div className='bi-sidebar__copyright'>
              © { environment.blockchain.coinName.toUpperCase() } { (new Date()).getFullYear() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state: AppState): any {
  return { settings: state.settings, api: state.api };
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators({ ...SettingsActions, ...ApiActions } as any, dispatch);
}

export const SidebarComponent = connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Sidebar);
