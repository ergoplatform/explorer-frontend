import { Widget } from '../widget/widget.components';
import React, { useMemo } from 'react';
import { WidgetButtonMore } from '../widget-button-more/widget-button-more.component';
import { WidgetTitle } from '../widget-title/widget-title.component';
import { IssuedTokensIcon } from '../../common/icons/common.icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import format from 'format-number';
import { WidgetTable } from '../widget-table/widget-table.component';

import './widget-issued-tokens.scss';
import { getAllIssuedTokensStructSelector } from 'src/selectors/issuedTokens';
import { IssuedTokensActions } from 'src/actions/issuedTokens.actions';
import { WidgetBody } from '../widget-body/widget-body.components';
import useInterval from "../../../hooks/useInterval";
import {WIDGET_REFRESH_INTERVAL} from "../../../constants/global.constants";

export const WidgetIssuedTokens = ({ getTokens, tokens }: any): JSX.Element => {
  useInterval(() => {
    getTokens({ limit: 8 });
  }, WIDGET_REFRESH_INTERVAL);

  const tableData = useMemo(() => {
    return tokens.data?.items?.reduce(
      (acc: any, { id, name, emissionAmount, decimals }: any) => {
        return [
          ...acc,
          {
            id: {
              value: id.slice(0, 10),
              link: true,
              linkValue: `/token/${id}`,
            },
            name: {
              value: name,
            },
            amount: {
              value: format({ integerSeparator: ' ' })(emissionAmount),
            },
            decimals: {
              value: decimals,
            },
          },
        ];
      },
      []
    );
  }, [tokens]);

  return (
    <Widget className="bi-widget-charts">
      <div className="g-flex  bi-widget-charts__header">
        <WidgetTitle
          title={'common.navigation.issued-tokens'}
          icon={<IssuedTokensIcon />}
        />
      </div>

      <WidgetBody>
        <WidgetTable
          headerTiles={[
            'common.token.id',
            'common.token.name',
            'common.token.amount',
            'common.token.decimals',
          ]}
          data={tableData}
          isFetching={!tableData}
        />
      </WidgetBody>
      <div className="bi-widget-charts__button">
        <WidgetButtonMore
          title={'components.widget.view-all'}
          to={'/issued-tokens'}
        />
      </div>
    </Widget>
  );
};

const mapStateToProps = (state: any): any => ({
  tokens: getAllIssuedTokensStructSelector(state),
  offset: state.tokens.offset,
});

const mapDispatchToProps = (dispatch: any): any => {
  return bindActionCreators({ ...IssuedTokensActions }, dispatch);
};

export const WidgetIssuedTokensComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetIssuedTokens);
