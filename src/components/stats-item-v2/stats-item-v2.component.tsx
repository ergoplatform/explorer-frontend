import React from 'react';
import { FormattedMessage } from 'react-intl';

import './stats-item-v2.scss';

interface IStatsItemProps {
  title: string;
  value: any;
}

export class StatsItemV2Component extends React.Component<IStatsItemProps> {
  render(): JSX.Element {
    const { title, value } = this.props;

    return (
      <div className="bi-stats-item-v2">
        <div className="bi-stats-item-v2__title">
          <FormattedMessage id={`common.stats.${title}`} />
        </div>

        <div className="bi-stats-item-v2__value">
          {title === 'supply' ? value.toUpperCase() : value}
        </div>
      </div>
    );
  }
}
