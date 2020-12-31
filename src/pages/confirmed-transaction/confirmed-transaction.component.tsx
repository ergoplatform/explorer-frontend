import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import { Transaction as TransactionModel } from '../../models/generated/transaction';

import { SettingsActions } from '../../actions/settings.actions';
import { TransactionActions } from '../../actions/transaction.actions';
import { SettingsState } from '../../reducers/settings.reducer';
import { TransactionState } from '../../reducers/transaction.reducer';
import { AppState } from '../../store/app.store';

import { TransactionIoSummaryComponent } from '../../components/transaction/transaction-io-summary/transaction-io-summary.component';
import { TransactionRawScriptsComponent } from '../../components/transaction/transaction-raw-scripts/transaction-raw-scripts.component';
import { TransactionSummaryComponent } from '../../components/transaction/transaction-summary/transaction-summary.component';
import { TransactionsItemComponent } from '../../components/transactions/transactions-item/transactions-item.component';

import './confirmed-transaction.scss';
import ProgressBar from '../../components/progress-bar/progress-bar';
import LoaderLogo from '../../components/loader/loader';

class ConfirmedTransaction extends React.PureComponent<
  RouteComponentProps<{
    id: string;
  }> &
    TransactionState &
    TransactionActions &
    SettingsActions &
    SettingsState & {
      toggleIsConfirmed: any;
      setFailed: () => void;
    }
> {
  constructor(props: any) {
    super(props);

    this.onScriptToggle = this.onScriptToggle.bind(this);
  }

  componentDidMount(): void {
    this.props.getTransaction(this.props.match.params.id);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any): void {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getTransaction(nextProps.match.params.id);
    }
  }

  render(): JSX.Element {
    const isFetching = this.props.fetching;

    if (isFetching) {
      return <div className="bi-transaction">{this.renderLoader()}</div>;
    }

    return (
      <div className="bi-transaction">
        <div className="bi-transaction__header">
          <div className="bi-transaction__title">
            <FormattedMessage id="components.transaction.title" />
          </div>
          <div className="bi-transaction__subtitle">
            <FormattedMessage id="components.transaction.subtitle" />
          </div>
        </div>
        {this.renderBody()}
      </div>
    );
  }

  renderLoader(): JSX.Element | null {
    return (
      <ProgressBar className="bi-app__loading-text">
        <LoaderLogo />
      </ProgressBar>
    );
  }

  private renderBody(): JSX.Element | null | undefined {
    const { setFailed } = this.props;

    console.log('>> this.props.isFailedRequest', this.props.isFailedRequest);

    if (this.props.isFailedRequest) {
      setFailed();
      return;
    }

    if (!this.props.transaction) {
      return null;
    }

    const transaction: TransactionModel = {
      id: this.props.transaction.summary.id,
      inputs: this.props.transaction.inputs,
      outputs: this.props.transaction.outputs,
      timestamp: this.props.transaction.summary.timestamp,
    };

    return (
      <div className="bi-transaction__body">
        <FormattedMessage
          id="common.pages.transaction.title"
          values={{ id: this.props.transaction.summary.id }}
        >
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <TransactionsItemComponent
          transaction={transaction}
          confirmations={this.props.transaction.summary.confirmationsCount}
        />

        <div className="bi-transaction__tables g-flex">
          <div className="bi-transaction__table g-flex__item">
            <TransactionSummaryComponent
              summary={this.props.transaction.summary}
            />
          </div>

          <div className="bi-transaction__table g-flex__item">
            <TransactionIoSummaryComponent
              summary={this.props.transaction.ioSummary}
              isScriptShown={this.props.isScriptsDisplayed}
              onScriptToggle={this.onScriptToggle}
            />
          </div>
        </div>

        {this.props.isScriptsDisplayed && (
          <div className="bi-transaction__scripts">
            <div className="bi-transaction__title">
              <FormattedMessage id="components.transaction.scripts.input" />
            </div>

            <TransactionRawScriptsComponent
              items={this.props.transaction.inputs}
            />
          </div>
        )}

        {this.props.isScriptsDisplayed && (
          <div className="bi-transaction__scripts">
            <div className="bi-transaction__title">
              <FormattedMessage id="components.transaction.scripts.output" />
            </div>

            <TransactionRawScriptsComponent
              items={this.props.transaction.outputs}
            />
          </div>
        )}
      </div>
    );
  }

  private onScriptToggle(): void {
    this.props.setTransactionScripts(!this.props.isScriptsDisplayed);
  }
}

function mapStateToProps(state: AppState): any {
  return { ...state.transaction, ...state.settings };
}

function mapDispatchToProps(dispatch: any): ActionCreatorsMapObject {
  return bindActionCreators(
    { ...TransactionActions, ...SettingsActions },
    dispatch
  );
}

const ConfirmedTransactionComponent: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConfirmedTransaction));

export default ConfirmedTransactionComponent;
