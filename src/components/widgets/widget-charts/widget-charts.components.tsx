import { Widget } from '../widget/widget.components';
import ChartCompactComponent from '../../charts/chart-compact/chart-compact.component';
import React from 'react';
import { WidgetButtonMore } from '../widget-button-more/widget-button-more.component';
import { WidgetTitle } from '../widget-title/widget-title.component';
import { ChartsIcon } from '../../common/icons/common.icons';

import './widget-charts.scss';

export const WidgetCharts = (): JSX.Element => {
  return (
    <Widget className="bi-widget-charts">
      <div className="g-flex bi-widget-charts__header">
        <WidgetTitle title={'components.charts.title'} icon={<ChartsIcon />} />
        {/*TODO Add dropdown*/}
      </div>

      <ChartCompactComponent chartType={'total'} />
      <div className="bi-widget-charts__button">
        <WidgetButtonMore
          title={'components.widget.view-all-charts'}
          to={'/charts'}
        />
      </div>
    </Widget>
  );
};
