import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { FullAddressTransactions } from '../../../models/generated/fullAddressTransactions';

import './address-transactions.scss';

import { CoinValueComponent } from '../../common/coin-value/coin-value.component';
import { AddressIssuedTokensModalComponent } from 'src/components/modals/address-issued-tokens-modal/address-issued-tokens-modal.component';

interface AddressTransactionsProps {
  summary: FullAddressTransactions;
  total: number;
}

export const AddressTransactionsComponent = ({
  summary,
  total,
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
            {total}
          </div>
        </div>

        <div className="bi-address-transactions__row bi-table__row">
          <div className="bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell">
            <FormattedMessage id="components.address-transactions.confirmedBalance" />
          </div>

          <div className="bi-address-transactions__cell bi-table__cell">
            <CoinValueComponent value={summary.confirmed.nanoErgs} />
          </div>
        </div>

        <div className="bi-address-transactions__row bi-table__row">
          <div className="bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell">
            <FormattedMessage id="components.address-transactions.tokens" />
          </div>

          <div className="bi-address-transactions__cell bi-table__cell">
            {!summary.confirmed.tokens?.length ? (
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

      {summary.confirmed.tokens?.length !== 0 && (
        <div className="bi-address-issued-tokens__btn-container g-flex">
          <div className="bi-address-issued-tokens__item g-flex__item-fixed"></div>

          <AddressIssuedTokensModalComponent
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            issuedTokens={summary.confirmed.tokens}
          />
        </div>
      )}
    </div>
  );
};
