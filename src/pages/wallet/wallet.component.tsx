import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import './wallet.scss';

export default class WalletComponent extends React.Component {
  render(): JSX.Element {
    return (
      <div className="bi-wallet">
        <FormattedMessage id="common.pages.wallet.title">
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <div className="bi-wallet__title">
          <FormattedMessage id="components.wallet.title" />
        </div>
      </div>
    );
  }
}
