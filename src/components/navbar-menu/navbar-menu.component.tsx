import React from 'react';
import './navbar-menu.scss';
import { Link } from 'react-router-dom';
import { EnvironmentSwitcherComponent } from '../common/environment-switcher/environment-switcher.component';
import { FormattedMessage } from 'react-intl';
import { SettingsActions } from '../../actions/settings.actions';
import { SettingsState } from '../../reducers/settings.reducer';
import { AppState } from '../../store/app.store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
  ChevronDownIcon,
  LatestBlocksIcon,
  MempoolIcon,
  OraclePoolsIcon,
  ChartsIcon,
  StatsIcon,
  IssuedTokensIcon,
  RichListIcon,
  WalletsIcon,
  ApiIcon,
  MonitorIcon,
  WatchIcon,
  ExternalLinkIcon,
  CloseIcon,
} from '../common/icons/common.icons';

type INavbarMenuProps = SettingsActions & { settings: SettingsState };

class NavbarMenu extends React.Component<INavbarMenuProps> {
  private wrapperRef: any;
  constructor(props: INavbarMenuProps) {
    super(props);
    this.wrapperRef = React.createRef();

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
  }
  hideSidebar(): void {
    this.props.setSidebarDisplayStatus(false);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event: MouseEvent) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (this.props.settings.isSidebarDisplayed) {
        this.hideSidebar()
      }
    }
  }

  render(): JSX.Element {
    const navClassNames = classNames({
      'bi-navbar-menu': true,
      'bi-navbar-menu--open': this.props.settings.isSidebarDisplayed,
    });

    return (
      <nav className={navClassNames} ref={this.wrapperRef}>
        <ul className="bi-navbar-menu__wrapper g-flex" onClick={this.hideSidebar}>
          <li className="bi-nav-dropdown">
            <a className="bi-nav-dropdown__link g-flex" href="#">
              <FormattedMessage id={'common.navigation.resources'} />
              <ChevronDownIcon className="bi-nav-dropdown__icon" />
            </a>
            <ul className="bi-nav-dropdown__list">
              <li className="bi-nav-dropdown__item">
                <Link to="/">
                  <LatestBlocksIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--item" />
                  <FormattedMessage id={'common.navigation.latest-blocks'} />
                </Link>
              </li>
              <li className="bi-nav-dropdown__item">
                <Link to="/mempool">
                  <MempoolIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--item" />
                  <FormattedMessage id={'common.navigation.mempool'} />
                </Link>
              </li>
              <li className="bi-nav-dropdown__item">
                <Link to="/oracle-pools-list">
                  <OraclePoolsIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--item" />
                  <FormattedMessage id={'common.navigation.oracle-pools'} />
                </Link>
              </li>
            </ul>
          </li>
          <li className="bi-nav-dropdown">
            <a className="bi-nav-dropdown__link g-flex" href="#">
              <FormattedMessage id={'common.navigation.statistics'} />
              <ChevronDownIcon className="bi-nav-dropdown__icon" />
            </a>
            <ul className="bi-nav-dropdown__list">
              <li className="bi-nav-dropdown__item">
                <Link to="/charts">
                  <ChartsIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--item" />
                  <FormattedMessage id={'common.navigation.charts'} />
                </Link>
              </li>
              <li className="bi-nav-dropdown__item">
                <Link to="/stats">
                  <StatsIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--item" />
                  <FormattedMessage id={'common.navigation.stats'} />
                </Link>
              </li>
            </ul>
          </li>
          <li className="bi-nav-dropdown">
            <a className="bi-nav-dropdown__link g-flex" href="#">
              <FormattedMessage id={'common.navigation.tokens'} />
              <ChevronDownIcon className="bi-nav-dropdown__icon" />
            </a>
            <ul className="bi-nav-dropdown__list">
              <li className="bi-nav-dropdown__item">
                <Link to="/issued-tokens">
                  <IssuedTokensIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--item" />
                  <FormattedMessage id={'common.navigation.issued-tokens'} />
                </Link>
              </li>
              <li className="bi-nav-dropdown__item">
                <Link to="/rich-list">
                  <RichListIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--item" />
                  <FormattedMessage id={'common.navigation.rich-list'} />
                </Link>
              </li>
            </ul>
          </li>
          <li className="bi-nav-dropdown">
            <a className="bi-nav-dropdown__link g-flex" href="#">
              <FormattedMessage id={'common.navigation.more'} />
              <ChevronDownIcon className="bi-nav-dropdown__icon" />
            </a>
            <ul className="bi-nav-dropdown__list">
              <li className="bi-nav-dropdown__item">
                <a
                  href="https://ergoplatform.org/en/wallets/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WalletsIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--item" />
                  <FormattedMessage id={'common.navigation.wallets'} />
                  <ExternalLinkIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--external" />
                </a>
              </li>
              <li className="bi-nav-dropdown__item">
                <a
                  href="https://api.ergoplatform.com/api/v1/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ApiIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--item" />
                  <FormattedMessage id={'common.navigation.api'} />
                  <ExternalLinkIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--external" />
                </a>
              </li>
              <li className="bi-nav-dropdown__item">
                <a
                  href="http://cds.oette.info/ergo_diff.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MonitorIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--item" />
                  <FormattedMessage id={'common.navigation.monitor'} />
                  <ExternalLinkIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--external" />
                </a>
              </li>
              <li className="bi-nav-dropdown__item">
                <a
                  href="https://ergo.watch/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WatchIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--item" />
                  <FormattedMessage id={'common.navigation.ergo-watch'} />
                  <ExternalLinkIcon className="bi-nav-dropdown__icon bi-nav-dropdown__icon--external" />
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <div className="bi-navbar-menu__control">
          <EnvironmentSwitcherComponent />

          <button
            className="bi-navbar-menu__btn-close bi-btn bi-btn--flat"
            onClick={this.hideSidebar}
          >
            <CloseIcon className="bi-navbar-menu__btn-close-icon" />
          </button>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state: AppState): { settings: SettingsState } {
  return { settings: state.settings };
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...SettingsActions } as any, dispatch);
}

export const NavbarMenuComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(NavbarMenu);
