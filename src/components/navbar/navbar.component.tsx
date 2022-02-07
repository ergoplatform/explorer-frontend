import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { AppState } from '../../store/app.store';

import { SettingsActions } from '../../actions/settings.actions';
import { SettingsState } from '../../reducers/settings.reducer';

import { LanguageSwitcherComponent } from '../common/language-switcher/language-switcher.component';
import { NavbarMenuComponent } from '../navbar-menu/navbar-menu.component';

import './navbar.scss';

import { BurgerIcon, LogoIcon } from '../common/icons/common.icons';

interface NavbarState {
  isClient: boolean;
}

type INavbarProps = SettingsActions & { settings: SettingsState };

class Navbar extends React.Component<INavbarProps, NavbarState> {
  state: NavbarState = {
    isClient: false,
  };

  constructor(props: INavbarProps) {
    super(props);
    this.showSidebar = this.showSidebar.bind(this);
  }
  componentDidMount(): void {
    this.setState({
      isClient: true,
    });
  }

  hideSidebar(): void {
    this.props.setSidebarDisplayStatus(false);
  }

  render(): JSX.Element | null {
    return (
      <div className="bi-navbar g-flex__item-fixed">
        <div className="bi-navbar__body g-flex g-space-between g-flex-column__item-fixed">
          <button
            className="bi-navbar__toggle bi-btn bi-btn--flat"
            onClick={this.showSidebar}
          >
            <BurgerIcon className="bi-navbar__toggle-icon" />
          </button>

          <Link className="bi-navbar__logo" to={'/'}>
            <LogoIcon className="bi-navbar__logo-icon" />
          </Link>
          <NavbarMenuComponent />

          <div className="bi-navbar__switchers g-flex">
            <LanguageSwitcherComponent />
          </div>
        </div>
      </div>
    );
  }

  private showSidebar(): void {
    this.props.setSidebarDisplayStatus(true);
  }
}

function mapStateToProps(state: AppState): { settings: SettingsState } {
  return { settings: state.settings };
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...SettingsActions } as any, dispatch);
}

export const NavbarComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Navbar);
