import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { AppState } from '../../store/app.store';

import { SettingsActions } from '../../actions/settings.actions';
import { SettingsState } from '../../reducers/settings.reducer';

import { LanguageSwitcherComponent } from '../common/language-switcher/language-switcher.component';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';

import { ArrowIcon } from '../common/icons/common.icons';

import './sidebar.scss';

class Sidebar extends React.Component {
  props: InjectedIntlProps & SettingsActions & SettingsState;
  
  constructor (props: any) {
    super(props);
    
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  
  toggleCollapse (): void {
    this.props.setSidebarCollapsedStatus(!this.props.isSidebarCollapsed);
  }
  
  render (): JSX.Element {
    const sidebarClassNames = classNames({
      'bi-sidebar': true,
      'bi-sidebar--collapsed': this.props.isSidebarCollapsed,
      'g-flex-column': true,
      'g-flex__item-fixed': true
    });
    
    return (
      <div className={ sidebarClassNames }>
        <div className='bi-sidebar__header g-flex g-flex-column__item-fixed'>
          <Link className='bi-sidebar__logo g-flex__item-fixed'
                to='/'
                tabIndex={ this.props.isSidebarCollapsed ? -1 : 0 }>
            <span className='bi-sidebar__logo-highlight'>Ergo</span> Explorer
          </Link>
          
          <button className='bi-sidebar__btn-toggle bi-btn bi-btn--flat g-flex__item-fixed g-flex'
                  onClick={ this.toggleCollapse }>
            <ArrowIcon className='bi-sidebar__btn-toggle-icon'/>
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

function mapStateToProps (state: AppState): any {
  return state.settings;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(SettingsActions, dispatch);
}

export const SidebarComponent = connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(injectIntl(Sidebar));
