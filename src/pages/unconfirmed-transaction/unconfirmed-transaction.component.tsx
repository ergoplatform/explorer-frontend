import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { resetStruct } from 'redux-struct';

import { UnconfirmedTransactionActions } from 'src/actions/unconfirmedTransaction.actions';
import { getUnconfirmedTransactionStructSelector } from 'src/selectors/unconfirmedTransaction';
import { GET_UNCONFIRMED_TRANSACTION_STRUCT } from 'src/constants/struct.types';
import { SettingsActions } from '../../actions/settings.actions';
import { SettingsState } from '../../reducers/settings.reducer';
import { AppState } from '../../store/app.store';

import { UnconfirmedTransactionIoSummaryComponent } from '../../components/unconfirmed-transaction/unconfirmed-transaction-io-summary/unconfirmed-transaction-io-summary.component';
import { UnconfirmedTransactionRawScriptsComponent } from '../../components/unconfirmed-transaction/unconfirmed-transaction-raw-scripts/unconfirmed-transaction-raw-scripts.component';
import { UnconfirmedTransactionSummaryComponent } from '../../components/unconfirmed-transaction/unconfirmed-transaction-summary/unconfirmed-transaction-summary.component';
import { UnconfirmedTransactionsItemComponent } from '../../components/unconfirmed-transaction/unconfirmed-transactions-item/unconfirmed-transactions-item.component';

import './unconfirmed-transaction.scss';
import ProgressBar from '../../components/progress-bar/progress-bar';
import LoaderLogo from '../../components/loader/loader';

class UnconfirmedTransaction extends React.PureComponent<
  RouteComponentProps<{
    id: string;
  }> &
    UnconfirmedTransactionActions &
    SettingsActions &
    SettingsState & {
      unconfirmedTransaction: any;
      timerId: any;
      toggleIsConfirmed: any;
      setFailed: () => void;
    }
> {
  state = {
    timerId: undefined,
  };

  constructor(props: any) {
    super(props);

    this.onScriptToggle = this.onScriptToggle.bind(this);
  }

  componentDidUpdate(prevProps: any): void {
    if (
      this.props.unconfirmedTransaction.error &&
      this.props.unconfirmedTransaction.error.message !== 'Network Error'
    ) {
      this.props.toggleIsConfirmed(true);
    }

    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getUnconfirmedTransaction(this.props.match.params.id);
    }
  }

  componentDidMount(): void {
    this.props.getUnconfirmedTransaction(this.props.match.params.id);

    const timer = setInterval(
      () => this.props.getUnconfirmedTransaction(this.props.match.params.id),
      5000
    );

    this.setState({ timerId: timer });
  }

  componentWillUnmount() {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }

    this.props.resetUnconfirmedTransaction();
  }

  render(): JSX.Element {
    const { data, error }: any = this.props.unconfirmedTransaction;

    if (!data && !error) {
      return <div className="bi-transaction">{this.renderLoader()}</div>;
    }

    return (
      <div className="bi-transaction">
        <div className="bi-transaction__header">
          <div className="bi-transaction__title">
            <FormattedMessage id="components.unconfirmed-transaction.title" />
          </div>
          <div className="bi-transaction__subtitle">
            <FormattedMessage id="components.unconfirmed-transaction.subtitle" />
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
    const { data, error }: any = this.props.unconfirmedTransaction;

    console.log('>> data', data);
    console.log('>> error', error);

    if (error) {
      this.props.setFailed();
      return;
    }

    if (!data) {
      return null;
    }

    const transaction: any = {
      id: data.id,
      inputs: data.inputs,
      outputs: data.outputs,
      creationTimestamp: data.creationTimestamp,
      size: data.size,
      ioSummary: data.ioSummary,
    };

    return (
      <div className="bi-transaction__body">
        <FormattedMessage
          id="common.pages.unconfirmed-transaction.title"
          values={{ id: transaction.id }}
        >
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <UnconfirmedTransactionsItemComponent transaction={transaction} />

        <div className="bi-transaction__tables g-flex">
          <div className="bi-transaction__table g-flex__item">
            <UnconfirmedTransactionSummaryComponent summary={transaction} />
          </div>

          <div className="bi-transaction__table g-flex__item">
            <UnconfirmedTransactionIoSummaryComponent
              summary={transaction.ioSummary}
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

            <UnconfirmedTransactionRawScriptsComponent
              items={transaction.inputs}
            />
          </div>
        )}

        {this.props.isScriptsDisplayed && (
          <div className="bi-transaction__scripts">
            <div className="bi-transaction__title">
              <FormattedMessage id="components.transaction.scripts.output" />
            </div>

            <UnconfirmedTransactionRawScriptsComponent
              items={transaction.outputs}
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
  return {
    unconfirmedTransaction: getUnconfirmedTransactionStructSelector(state),
    ...state.settings,
  };
}

function mapDispatchToProps(dispatch: any): ActionCreatorsMapObject {
  return bindActionCreators(
    {
      ...UnconfirmedTransactionActions,
      ...SettingsActions,
      resetUnconfirmedTransaction: () =>
        dispatch(resetStruct(GET_UNCONFIRMED_TRANSACTION_STRUCT)),
    },
    dispatch
  );
}

const UnconfirmedTransactionComponent: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UnconfirmedTransaction));

export default UnconfirmedTransactionComponent;
