import { Widget } from '../widget/widget.components';
import React, { useMemo } from 'react';
import { WidgetButtonMore } from '../widget-button-more/widget-button-more.component';
import { WidgetTitle } from '../widget-title/widget-title.component';
import { LatestBlocksIcon } from '../../common/icons/common.icons';
import { bindActionCreators } from 'redux';
import { BlockActions } from 'src/actions/block.actions';
import { connect } from 'react-redux';
import { AppState } from 'src/store/app.store';
import { WidgetTable } from '../widget-table/widget-table.component';

import './widget-blocks.scss';
import { TimestampComponent } from 'src/components/common/timestamp/timestamp.component';
import { CoinValueComponent } from 'src/components/common/coin-value/coin-value.component';
import { WidgetBody } from '../widget-body/widget-body.components';
import {WIDGET_REFRESH_INTERVAL} from "../../../constants/global.constants";
import useInterval from "../../../hooks/useInterval";

export const WidgetBlocks = ({ getBlocks, blocks }: any): JSX.Element => {
  useInterval(() => {
    getBlocks({ limit: 8 });
  }, WIDGET_REFRESH_INTERVAL);

  const tableData = useMemo(() => {
    return blocks?.blocks.reduce(
      (
        acc: any,
        {
          height,
          timestamp,
          miner: { address, name },
          minerReward,
          id,
          transactionsCount,
        }: any
      ) => {
        return [
          ...acc,
          {
            height: { value: height, link: true, linkValue: `/blocks/${id}` },
            timestamp: {
              value: <TimestampComponent vertical timestamp={timestamp} />,
            },
            minerAddress: {
              value: name,
              link: true,
              linkValue: `/addresses/${address}`,
            },
            transactionsCount: {
              value: transactionsCount,
            },
            minerReward: {
              value: <CoinValueComponent value={minerReward} />,
            },
          },
        ];
      },
      []
    );
  }, [blocks]);

  return (
    <Widget className="bi-widget-blocks">
      <div className="g-flex  bi-widget-blocks__header">
        <WidgetTitle
          title={'common.navigation.latest-blocks'}
          icon={<LatestBlocksIcon />}
        />
        {/*TODO Add dropdown*/}
      </div>

      <WidgetBody>
        <WidgetTable
          headerTiles={[
            'common.block.height',
            'common.block.age',
            'common.block.minedBy',
            'common.block.transactions',
            'common.block.minerReward',
          ]}
          data={tableData}
          isFetching={!tableData}
        />
      </WidgetBody>

      <div className="bi-widget-blocks__button">
        <WidgetButtonMore
          title={'components.widget.view-all-blocks'}
          to={'/latest-blocks'}
        />
      </div>
    </Widget>
  );
};

function mapStateToProps(state: AppState): AppState {
  return state;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...BlockActions }, dispatch);
}

export const WidgetBlocksComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetBlocks);
