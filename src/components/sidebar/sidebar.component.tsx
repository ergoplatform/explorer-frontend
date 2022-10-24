import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { NavHashLink } from 'react-router-hash-link';
import { bindActionCreators } from 'redux';

import { AppState } from '../../store/app.store';

import { SettingsActions } from '../../actions/settings.actions';
import { SettingsState } from '../../reducers/settings.reducer';

import { EnvironmentSwitcherComponent } from '../common/environment-switcher/environment-switcher.component';
import { LanguageSwitcherComponent } from '../common/language-switcher/language-switcher.component';
import {
  ISidebarMenuItem,
  SidebarMenuComponent,
} from '../sidebar-menu/sidebar-menu.component';

import {
  ArrowIcon,
  LogoIcon,
  LogoVerticalIcon,
  WalletIcon,
  TokenIcon,
  UnconfirmedIcon,
  DistributedIcon,
  RichIcon,
  ErgoWatchIcon,
  MonitorIcon,
} from '../common/icons/common.icons';

import './sidebar.scss';

import {
  ApiIcon,
  ChartIcon,
  DataIcon,
  StatsIcon,
  // DiagramIcon,
} from '../common/icons/common.icons';
import environment from 'src/config/environment';

const SIDEBAR_MENU_ITEMS: ISidebarMenuItem[] = [
  {
    icon: (
      <DataIcon className="bi-sidebar-menu__item-icon g-flex__item-fixed" />
    ),
    props: {
      isActive: (match: any, path: any) => {
        return (
          match ||
          path.pathname.match(/^(\/blocks\/|\/addresses\/|\/transactions\/)/)
        );
      },
    },
    title: 'components.sidebar-menu.items.data',
    url: '/latest-blocks',
  },
  {
    icon: (
      <UnconfirmedIcon className="bi-sidebar-menu__item-icon g-flex__item-fixed" />
    ),
    props: {
      exact: false,
    },
    title: 'components.sidebar-menu.items.unconfirmed',
    url: '/mempool',
  },
  {
    icon: (
      <TokenIcon className="bi-sidebar-menu__item-icon g-flex__item-fixed" />
    ),
    props: {
      exact: false,
    },
    title: 'components.sidebar-menu.items.issued-tokens',
    url: '/issued-tokens',
  },
  {
    icon: (
      <RichIcon className="bi-sidebar-menu__item-icon g-flex__item-fixed" />
    ),
    props: {
      exact: false,
    },
    title: 'Rich List',
    url: '/rich-list',
  },
  {
    icon: (
      <DistributedIcon className="bi-sidebar-menu__item-icon g-flex__item-fixed" />
    ),
    props: {
      exact: false,
    },
    title: 'components.sidebar-menu.items.oraclePools',
    url: '/oracle-pools-list',
  },
  {
    icon: (
      <ChartIcon className="bi-sidebar-menu__item-icon g-flex__item-fixed" />
    ),
    props: {
      exact: false,
    },
    title: 'components.sidebar-menu.items.charts',
    url: '/charts',
  },
  {
    icon: (
      <StatsIcon className="bi-sidebar-menu__item-icon g-flex__item-fixed" />
    ),
    title: 'components.sidebar-menu.items.stats',
    url: '/stats',
  },
];

const EXTERNAL_MENU_ITEMS: ISidebarMenuItem[] = [
  {
    external: true,
    icon: <ApiIcon className="bi-sidebar-menu__item-icon g-flex__item-fixed" />,
    title: 'components.sidebar-menu.items.api',
    url: `${environment.apiUrlV1}/docs/`,
  },
  {
    external: true,
    icon: (
      <ErgoWatchIcon className="bi-sidebar-menu__item-icon g-flex__item-fixed" />
    ),
    title: 'components.sidebar-menu.items.watch',
    url: 'https://ergo.watch/',
  },
  {
    external: true,
    icon: (
      <MonitorIcon className="bi-sidebar-menu__item-icon g-flex__item-fixed" />
    ),
    title: 'components.sidebar-menu.items.diff',
    url: 'http://cds.oette.info/ergo_diff.htm',
  },
  {
    external: true,
    icon: (
      <WalletIcon className="bi-sidebar-menu__item-icon g-flex__item-fixed" />
    ),
    title: 'components.sidebar-menu.items.wallet',
    url: 'https://ergoplatform.org/en/wallets/',
  },
];

interface SidebarState {
  isClient: boolean;
}

type ISidebarProps = SettingsActions & { settings: SettingsState };

class Sidebar extends React.Component<ISidebarProps, SidebarState> {
  state: SidebarState = {
    isClient: false,
  };

  constructor(props: ISidebarProps) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
  }

  componentDidMount(): void {
    this.setState({
      isClient: true,
    });
  }

  toggleCollapse(): void {
    if (this.props.settings.isSidebarDisplayed) {
      return this.hideSidebar();
    }

    this.props.setSidebarCollapsedStatus(
      !this.props.settings.isSidebarCollapsed
    );
  }

  hideSidebar(): void {
    this.props.setSidebarDisplayStatus(false);
  }

  render(): JSX.Element | null {
    const sidebarClassNames = classNames({
      'bi-sidebar': true,
      'bi-sidebar--collapsed':
        this.props.settings.isSidebarCollapsed && this.state.isClient,
      'bi-sidebar--open': this.props.settings.isSidebarDisplayed,
      'g-flex-column': true,
      'g-flex__item-fixed': true,
    });

    return (
      <div className={sidebarClassNames}>
        <div className="bi-sidebar__header g-flex g-flex-column__item-fixed">
          <Link
            className="bi-sidebar__logo g-flex__item-fixed"
            onClick={this.hideSidebar}
            to="/"
            tabIndex={this.props.isSidebarCollapsed ? -1 : 0}
          >
            <LogoIcon className="bi-sidebar__logo-icon" />
          </Link>

          <button
            className="bi-sidebar__btn-toggle bi-btn bi-btn--flat g-flex__item-fixed g-flex"
            onClick={this.toggleCollapse}
          >
            <ArrowIcon className="bi-sidebar__btn-toggle-icon" />
          </button>
        </div>

        <div className="bi-sidebar__body g-flex-column__item-fixed">
          <SidebarMenuComponent
            onClick={this.hideSidebar}
            items={SIDEBAR_MENU_ITEMS}
          />

          <div className="bi-sidebar__divider" />

          <SidebarMenuComponent
            onClick={this.hideSidebar}
            items={EXTERNAL_MENU_ITEMS}
          />

          <LogoVerticalIcon className="bi-sidebar__side-logo" />
        </div>

        <div className="bi-sidebar__footer g-flex-column__item-fixed g-flex">
          <div className="bi-sidebar__footer-line g-flex__item-fixed g-flex">
            <EnvironmentSwitcherComponent />

            <LanguageSwitcherComponent />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState): { settings: SettingsState } {
  return { settings: state.settings };
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...SettingsActions } as any, dispatch);
}

export const SidebarComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Sidebar);
