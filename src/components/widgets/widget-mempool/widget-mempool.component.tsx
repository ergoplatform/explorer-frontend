import { Widget } from '../widget/widget.components';
import React, { useMemo } from 'react';
import { WidgetButtonMore } from '../widget-button-more/widget-button-more.component';
import { WidgetTitle } from '../widget-title/widget-title.component';
import { MempoolIcon } from '../../common/icons/common.icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { WidgetTable } from '../widget-table/widget-table.component';

import './widget-mempool.scss';
import { TimestampComponent } from 'src/components/common/timestamp/timestamp.component';
import { UnconfirmedTransactionsActions } from 'src/actions/unconfirmedTransactions.actions';
import { getUnconfirmedTransactionsStructSelector } from 'src/selectors/unconfirmedTransactions';
import { formatNumberMetricPrefix } from 'src/utils/formatNumberMetricPrefix';
import { WidgetBody } from '../widget-body/widget-body.components';
import useInterval from "../../../hooks/useInterval";
import {WIDGET_REFRESH_INTERVAL} from "../../../constants/global.constants";

export const WidgetMempool = ({
  getMempool,
  unconfirmedTransactions,
}: any): JSX.Element => {
  useInterval(() => {
    getMempool({ limit: 8 });
  }, WIDGET_REFRESH_INTERVAL);

  const tableData = useMemo(() => {
    return unconfirmedTransactions.data?.items?.reduce(
      (acc: any, { creationTimestamp, inputs, id, outputs, size }: any) => {
        return [
          ...acc,
          {
            id: {
              value: id.slice(0, 10),
              link: true,
              linkValue: `/transactions/${id}`,
            },
            creationTimestamp: {
              value: (
                <TimestampComponent vertical timestamp={creationTimestamp} />
              ),
            },
            inputs: {
              value: inputs.length,
            },
            outputs: {
              value: outputs.length,
            },
            size: {
              value: (
                <span className="u-word-wrap u-word-wrap--ellipsis">
                  {formatNumberMetricPrefix(size, {
                    desiredFormat: 'k',
                  })}
                  B
                </span>
              ),
            },
          },
        ];
      },
      []
    );
  }, [unconfirmedTransactions]);

  return (
    <Widget className="bi-widget-charts">
      <div className="g-flex  bi-widget-charts__header">
        <WidgetTitle
          title={'common.navigation.mempool'}
          icon={<MempoolIcon />}
        />
      </div>

      <WidgetBody>
        <WidgetTable
          headerTiles={[
            'common.token.id',
            'components.unconfirmed-transactions.creation-timestamp',
            'components.unconfirmed-transactions.inputs-quantity',
            'components.unconfirmed-transactions.outputs-quantity',
            'common.block.size',
          ]}
          data={tableData}
          isFetching={!tableData}
        />
      </WidgetBody>

      <div className="bi-widget-charts__button">
        <WidgetButtonMore
          title={'components.widget.view-all'}
          to={'/mempool'}
        />
      </div>
    </Widget>
  );
};

const mapStateToProps = (state: any): any => ({
  unconfirmedTransactions: getUnconfirmedTransactionsStructSelector(state),
  offset: state.unconfirmedTransactions.offset,
});

const mapDispatchToProps = (dispatch: any): any => {
  return bindActionCreators({ ...UnconfirmedTransactionsActions }, dispatch);
};

export const WidgetMempoolComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetMempool);
