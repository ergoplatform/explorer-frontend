import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import environment from '../../config/environment';

import { StatsState } from '../../reducers/stats.reducer';
import { AppState } from '../../store/app.store';

import { AppActions } from '../../actions/app.actions';
import { StatsActions } from '../../actions/stats.actions';

import './stats.scss';

import { BlockSummaryComponent } from '../../components/stats/block-summary/block-summary.component';
import { MiningCostComponent } from '../../components/stats/mining-cost/mining-cost.component';
import { TransactionsSummaryComponent } from '../../components/stats/transactions-summary/transactions-summary.component';

class Stats extends React.PureComponent<
  StatsActions & AppActions & StatsState
> {
  componentDidMount(): void {
    if (this.props.preloaded) {
      this.props.clearPreloadedState();

      return;
    }

    this.props.getStats();
  }

  render(): JSX.Element {
    return (
      <div className="bi-stats">
        <FormattedMessage id="common.pages.stats.title">
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <div className="bi-stats__header">
          <div className="bi-stats__title">
            <FormattedMessage
              id="components.stats.title"
              values={{
                coinName: environment.blockchain.coinName.toUpperCase(),
              }}
            />
          </div>

          <div className="bi-stats__subtitle">
            <FormattedMessage id="components.stats.subtitle" />
          </div>
        </div>

        {this.props.stats ? this.renderBody() : null}
      </div>
    );
  }

  private renderBody(): JSX.Element {
    return (
      <div className="bi-stats__body">
        <div className="bi-stats__line">
          <div className="bi-stats__block-summary">
            <BlockSummaryComponent summary={this.props.stats.blockSummary} />
          </div>
        </div>

        <div className="bi-stats__line">
          <div className="bi-stats__block-summary">
            <TransactionsSummaryComponent
              summary={this.props.stats.transactionsSummary}
            />
          </div>
        </div>

        <div className="bi-stats__line">
          <div className="bi-stats__block-summary">
            <MiningCostComponent summary={this.props.stats.miningCost} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState): StatsState {
  return state.stats;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...StatsActions, ...AppActions }, dispatch);
}

const StatsComponent = connect(mapStateToProps, mapDispatchToProps)(Stats);

export default StatsComponent;
