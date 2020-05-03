import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { InfoItem, StatsState } from '../../reducers/stats.reducer';
import { AppState } from '../../store/app.store';

import { AppActions } from '../../actions/app.actions';
import { StatsActions } from '../../actions/stats.actions';

import { StatsItemComponent } from '../stats-item/stats-item.component';

import './header-stats.scss';

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
    const statElements = this.props.info
      .map(({ title, value }: InfoItem) => {
        return <StatsItemComponent title={title} value={value} key={title} />;
      })
      .reduce(
        (previous, current, index) =>
          [
            ...previous,
            <div className="bi-header-stats__divider" key={index} />,
            current,
          ] as any,
        []
      );

    statElements.splice(0, 1);

    return <div className="bi-header-stats g-flex">{statElements}</div>;
  }
}

function mapStateToProps(state: AppState): StatsState {
  return state.stats;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...StatsActions, ...AppActions }, dispatch);
}

export const HeaderStatsComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(HeaderStats);
