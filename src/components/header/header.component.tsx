import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { SettingsActions } from '../../actions/settings.actions';

import { HeaderStatsComponent } from '../header-stats/header-stats.component';
import { SearchComponent } from '../search/search.component';

import './header.scss';

import { BurgerIcon } from '../common/icons/common.icons';

class Header extends React.Component<SettingsActions> {
  constructor (props: any) {
    super(props);
    
    this.showSidebar = this.showSidebar.bind(this);
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-header g-flex g-flex-column__item-fixed'>
        <button className='bi-header__toggle bi-btn bi-btn--flat'
                onClick={ this.showSidebar }>
          <BurgerIcon className='bi-header__toggle-icon'/>
        </button>
        
        <Link className='bi-header__logo'
              to={ '/' }>
          <span className='bi-header__logo-highlight'>ERGO</span>
          EXPLORER
        </Link>
        
        <div className='bi-header__stats g-flex__item'>
          <HeaderStatsComponent/>
        </div>
        
        <SearchComponent/>
      </div>
    );
  }
  
  private showSidebar (): void {
    this.props.setSidebarDisplayStatus(true);
  }
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(SettingsActions, dispatch);
}

export const HeaderComponent = connect(null, mapDispatchToProps)(Header);
