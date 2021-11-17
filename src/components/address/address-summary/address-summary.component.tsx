import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CopyTextComponent } from '../../../components/common/copy-text/copy-text.component';
import { useAlert } from 'react-alert';

import './address-summary.scss';

interface IAddressSummaryProps {
  addressId: string;
}

export const AddressSummaryComponent = (props: IAddressSummaryProps) => {
  const alert = useAlert();
  return (
    <div className="bi-address-summary">
      <div className="bi-address-summary__header">
        <FormattedMessage id="components.address-summary.title" />
      </div>

      <div className="bi-address-summary__body bi-table">
        <div className="bi-address-summary__row bi-table__row">
          <div className="bi-address-summary__cell bi-address-summary__cell--header bi-table__cell">
            <FormattedMessage id="components.address-summary.hash" />
          </div>

          <div className="bi-address-summary__cell bi-address-summary__cell--value bi-table__cell">
            <CopyTextComponent
              onClick={() =>
                alert.show(
                  <span style={{ textTransform: 'initial' }}>Copied</span>
                )
              }
              className="u-word-wrap u-word-wrap--ellipsis"
            >
              {props.addressId}
            </CopyTextComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
