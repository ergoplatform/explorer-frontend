import React, { useCallback, useEffect, useMemo } from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

// import { Transaction as TransactionModel } from '../../models/generated/transaction';

import { SettingsActions } from '../../actions/settings.actions';
import { TransactionActions } from '../../actions/transaction.actions';
// import { SettingsState } from '../../reducers/settings.reducer';
// import { TransactionState } from '../../reducers/transaction.reducer';
import { AppState } from '../../store/app.store';

import { TransactionIoSummaryComponent } from '../../components/transaction/transaction-io-summary/transaction-io-summary.component';
import { TransactionRawScriptsComponent } from '../../components/transaction/transaction-raw-scripts/transaction-raw-scripts.component';
import { TransactionSummaryComponent } from '../../components/transaction/transaction-summary/transaction-summary.component';
import { TransactionsItemComponent } from '../../components/transactions/transactions-item/transactions-item.component';

import './confirmed-transaction.scss';
import ProgressBar from '../../components/progress-bar/progress-bar';
import LoaderLogo from '../../components/loader/loader';
import { miningFeeAddress } from 'src/constants/config';

const renderLoader = () => {
  return (
    <ProgressBar className="bi-app__loading-text">
      <LoaderLogo />
    </ProgressBar>
  );
};

const ConfirmedTransaction = (props: any) => {
  const {
    getTransaction,
    match,
    fetching,
    transaction,
    setTransactionScripts,
    isScriptsDisplayed,
    setFailed,
    isFailedRequest,
  } = props;

  useEffect(() => {
    getTransaction(match.params.id);
  }, [match.params.id]);

  const onScriptToggle = useCallback(() => {
    setTransactionScripts(!isScriptsDisplayed);
  }, [setTransactionScripts, isScriptsDisplayed]);

  const totalCoinsTransferred = useMemo(() => {
    if (!transaction) {
      return 0;
    }
    return transaction.inputs.reduce(
      (acc: number, { value }: { value: number }) => acc + value,
      0
    );
  }, [transaction]);

  const fee = useMemo(() => {
    if (!transaction) {
      return 0;
    }

    return transaction.outputs
      .filter(({ address }: any) => address === miningFeeAddress)
      .reduce((acc: number, { value }: { value: number }) => acc + value, 0);
  }, [transaction]);

  const feePerByte = useMemo(() => {
    if (!transaction || !fee) {
      return 0;
    }

    return (fee / transaction.size).toFixed(9);
  }, [fee, transaction]);

  const renderBody = useMemo(() => {
    if (isFailedRequest) {
      setFailed();
      return null;
    }

    if (!transaction) {
      return null;
    }

    return (
      <div className="bi-transaction__body">
        <FormattedMessage
          id="common.pages.transaction.title"
          values={{ id: transaction.id }}
        >
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <TransactionsItemComponent
          transaction={transaction}
          confirmations={transaction.numConfirmations}
        />

        <div className="bi-transaction__tables g-flex">
          <div className="bi-transaction__table g-flex__item">
            <TransactionSummaryComponent
              summary={{
                size: transaction.size,
                timestamp: transaction.timestamp,
                blockId: transaction.blockId,
                inclusionHeight: transaction.inclusionHeight,
                numConfirmations: transaction.numConfirmations,
              }}
            />
          </div>

          <div className="bi-transaction__table g-flex__item">
            <TransactionIoSummaryComponent
              summary={{
                totalFee: fee,
                feePerByte: feePerByte as number,
                totalCoinsTransferred,
              }}
              isScriptShown={isScriptsDisplayed}
              onScriptToggle={onScriptToggle}
            />
          </div>
        </div>

        {isScriptsDisplayed && (
          <div className="bi-transaction__scripts">
            <div className="bi-transaction__title">
              <FormattedMessage id="components.transaction.scripts.input" />
            </div>

            <TransactionRawScriptsComponent items={transaction.inputs} />
          </div>
        )}

        {isScriptsDisplayed && (
          <div className="bi-transaction__scripts">
            <div className="bi-transaction__title">
              <FormattedMessage id="components.transaction.scripts.output" />
            </div>

            <TransactionRawScriptsComponent items={transaction.outputs} />
          </div>
        )}
      </div>
    );
  }, [
    transaction,
    isScriptsDisplayed,
    isFailedRequest,
    setFailed,
    onScriptToggle,
    feePerByte,
    fee,
    totalCoinsTransferred,
  ]);

  if (fetching) {
    return <div className="bi-transaction">{renderLoader()}</div>;
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
      {renderBody}
    </div>
  );
};

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
