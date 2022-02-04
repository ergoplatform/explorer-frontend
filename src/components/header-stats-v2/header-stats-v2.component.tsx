import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { InfoItem, StatsState } from '../../reducers/stats.reducer';
import { AppState } from '../../store/app.store';

import { AppActions } from '../../actions/app.actions';
import { StatsActions } from '../../actions/stats.actions';

import { StatsItemV2Component } from '../stats-item-v2/stats-item-v2.component';

import './header-stats-v2.scss';

class HeaderStats extends React.Component<
  StatsActions & AppActions & StatsState
> {
  componentDidMount(): void {
    if (this.props.preloaded) {
      return this.props.clearPreloadedState();
    }

    this.props.getStatsInfo();
  }

  render(): JSX.Element {
    const statElements = this.props.info.map(({ title, value }: InfoItem) => {
      return <StatsItemV2Component title={title} value={value} key={title} />;
    });

    return <div className="bi-header-stats-v2 g-flex">{statElements}</div>;
  }
}

function mapStateToProps(state: AppState): StatsState {
  return state.stats;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...StatsActions, ...AppActions }, dispatch);
}

export const HeaderStatsV2Component = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(HeaderStats);
