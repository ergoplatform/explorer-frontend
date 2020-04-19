import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  unspentSellOrdersByTokenIdStructSelector,
  unspentBuyOrdersByTokenIdStructSelector,
} from '../../selectors/orderBook';

import './table-orders.scss';

export class TableOrdersComponent extends PureComponent<any> {
  sumQuantities = (orders: any) => {
    return orders.reduce(
      (total: number, order: any) =>
        parseFloat((total + order.price * order.quantity).toFixed(8)),
      0
    );
  };

  getPercentage = (maxCumulative: any, cumulative: any) => {
    let fillPercentage = (maxCumulative ? cumulative / maxCumulative : 0) * 100;
    fillPercentage = Math.min(fillPercentage, 100); // Percentage can't be greater than 100%
    fillPercentage = Math.max(fillPercentage, 0); // Percentage can't be smaller than 0%
    return fillPercentage;
  };

  renderSellOrders = (orders: any, maxCumulative: any) => {
    let cumulative = 0;
    return orders.map((order: any, index: number) => {
      order.cumulative = cumulative += parseFloat(
        (order.price * order.quantity).toFixed(8)
      );

      return (
        <tr key={index} className="ask">
          <td>{order.price}</td>
          <td>{order.quantity}</td>
          <td className="fill-ask">
            {order.cumulative}
            <span
              style={{
                width:
                  this.getPercentage(maxCumulative, order.cumulative) + '%',
              }}
            ></span>
          </td>
        </tr>
      );
    });
  };

  renderBuyOrders = (orders: any, maxCumulative: any) => {
    let cumulative = 0;
    return orders.map((order: any, index: number) => {
      order.cumulative = cumulative += parseFloat(
        (Number(order.price) * Number(order.quantity)).toFixed(8)
      );

      return (
        <tr key={index} className="bid">
          <td>{order.price}</td>
          <td>{order.quantity}</td>
          <td className="fill-bid">
            {order.cumulative}
            <span
              style={{
                width:
                  this.getPercentage(maxCumulative, order.cumulative) + '%',
              }}
            ></span>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { sellOrders, buyOrders } = this.props;
    const asks = sellOrders.data || [];
    const bids = buyOrders.data || [];

    const preparedAsks = asks.map((ask: any) => ({
      price:
        (Number(ask.amount) + Number(ask.outputInfo.value)) /
        Number(ask.outputInfo.assets[0].amount) /
        1000000,
      quantity: Number(ask.outputInfo.assets[0].amount),
    }));

    const preparedBids = bids.map((bid: any) => ({
      price: Number(bid.outputInfo.value) / Number(bid.tokenAmount) / 1000000,
      quantity: Number(bid.tokenAmount),
    }));

    const totalAsks = this.sumQuantities(preparedAsks);
    const totalBids = this.sumQuantities(preparedBids);
    const maxCumulative = Math.max(totalAsks, totalBids);

    const deepCopyArrayOfObj = (arr: any) =>
      arr.map((order: any) => Object.assign({}, order));

    // Deep copy and sort orders
    const askOrders = deepCopyArrayOfObj(preparedAsks).sort(
      (a: any, b: any) => a.price > b.price
    ); // ascending order
    const bidOrders = deepCopyArrayOfObj(preparedBids).sort(
      (a: any, b: any) => a.price < b.price
    ); // descending order

    if (sellOrders.isFetching || buyOrders.isFetching) {
      return (
        <div className="bi-orders">
          <p>Loading orders...</p>
        </div>
      );
    }

    if (!sellOrders.data && !buyOrders.data) {
      return (
        <div className="bi-orders">
          <p>Need to set token id</p>
        </div>
      );
    }

    if (sellOrders.data?.length === 0 && buyOrders.data?.length === 0) {
      return (
        <div className="bi-orders">
          <p>Order book is empty</p>
        </div>
      );
    }

    return (
      <div className="bi-orders">
        <div className="bi-orders__content">
          <h2>Order book</h2>
          <table className="bi-orders__table orders-table">
            <thead>
              <tr>
                <th className="orders-table__th">Price, ERG</th>
                <th className="orders-table__th">Quantity</th>
                <th className="orders-table__th">ERG Amount</th>
              </tr>
            </thead>
            <tbody>
              {this.renderSellOrders(askOrders, maxCumulative).reverse()}
            </tbody>
            <tbody>{this.renderBuyOrders(bidOrders, maxCumulative)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sellOrders: unspentSellOrdersByTokenIdStructSelector(state),
  buyOrders: unspentBuyOrdersByTokenIdStructSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableOrdersComponent);
