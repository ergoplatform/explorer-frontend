import React, { PureComponent } from 'react';

import { SearchByTokenIdComponent } from '../../components/search-by-token-id/search-by-token-id.component';
import './order-book.scss';
import TableOrdersComponent from '../../components/table-orders/table-orders.component';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';

export class OrderBookComponent extends PureComponent<any> {
  render() {
    return (
      <div className="bi-order-book">
        <FormattedMessage id="common.pages.order-book.title">
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>
        <h1>
          <FormattedMessage id="components.order-book.title" />
        </h1>

        <div className="bi-order-book__search">
          <SearchByTokenIdComponent />
        </div>
        <div className="bi-order-book__orders">
          <TableOrdersComponent />
        </div>
      </div>
    );
  }
}

export default OrderBookComponent;
