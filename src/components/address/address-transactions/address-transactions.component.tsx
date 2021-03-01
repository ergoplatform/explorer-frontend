import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { FullAddressTransactions } from '../../../models/generated/fullAddressTransactions';

import './address-transactions.scss';

import { CoinValueComponent } from '../../common/coin-value/coin-value.component';
import { AddressIssuedTokensModalComponent } from 'src/components/modals/address-issued-tokens-modal/address-issued-tokens-modal.component';

interface AddressTransactionsProps {
  summary: FullAddressTransactions;
}

export const AddressTransactionsComponent = ({
  summary,
}: AddressTransactionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bi-address-transactions">
      <div className="bi-address-transactions__header">
        <FormattedMessage id="components.address-transactions.title" />
      </div>

      <div className="bi-address-transactions__body bi-table">
        <div className="bi-address-transactions__row bi-table__row">
          <div className="bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell">
            <FormattedMessage id="components.address-transactions.confirmed" />
          </div>

          <div className="bi-address-transactions__cell bi-table__cell">
            {summary.confirmed}
          </div>
        </div>

        <div className="bi-address-transactions__row bi-table__row">
          <div className="bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell">
            <FormattedMessage id="components.address-transactions.totalReceived" />
          </div>

          <div className="bi-address-transactions__cell bi-table__cell">
            <CoinValueComponent value={summary.totalReceived} />
          </div>
        </div>

        <div className="bi-address-transactions__row bi-table__row">
          <div className="bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell">
            <FormattedMessage id="components.address-transactions.confirmedBalance" />
          </div>

          <div className="bi-address-transactions__cell bi-table__cell">
            <CoinValueComponent value={summary.confirmedBalance} />
          </div>
        </div>

        <div className="bi-address-transactions__row bi-table__row">
          <div className="bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell">
            <FormattedMessage id="components.address-transactions.tokens" />
          </div>

          <div className="bi-address-transactions__cell bi-table__cell">
            {!summary.totalTokensBalance?.length ? (
              'None'
            ) : (
              <button
                className="bi-address-actions__btn bi-btn"
                onClick={() => setIsModalOpen(true)}
              >
                <FormattedMessage id="components.address-transactions.show" />
              </button>
            )}
          </div>
        </div>
      </div>

      {summary.totalTokensBalance?.length !== 0 && (
        <div className="bi-address-issued-tokens__btn-container g-flex">
          <div className="bi-address-issued-tokens__item g-flex__item-fixed"></div>

          <AddressIssuedTokensModalComponent
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            issuedTokens={summary.totalTokensBalance}
          />
        </div>
      )}
    </div>
  );
};
