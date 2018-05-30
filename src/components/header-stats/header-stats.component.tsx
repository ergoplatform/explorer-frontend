import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IInfoItem, StatsState } from '../../reducers/stats.reducer';
import { AppState } from '../../store/app.store';

import { StatsActions } from '../../actions/stats.actions';

import { StatsItemComponent } from '../stats-item/stats-item.component';

import './header-stats.scss';

class HeaderStats extends React.Component<StatsActions & StatsState> {
  componentDidMount (): void {
    this.props.getStatsInfo();
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-header-stats g-flex'>
        {
          this.props.info.map((item: IInfoItem) => {
            return <StatsItemComponent title={ item.title } value={ item.value } key={ item.title }/>;
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state: AppState): any {
  return state.stats;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators<StatsActions>(StatsActions, dispatch);
}

export const HeaderStatsComponent = connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(HeaderStats);
