import React from 'react';
import { FormattedMessage } from 'react-intl';

import './stats-item.scss';

interface IStatsItemProps {
  title: string;
  value: any;
}

export class StatsItemComponent extends React.Component<IStatsItemProps> {
  render(): JSX.Element {
    const { title, value } = this.props;

    return (
      <div className="bi-stats-item">
        <div className="bi-stats-item__title">
          <FormattedMessage id={`common.stats.${title}`} />
        </div>

        <div className="bi-stats-item__value">
          {title === 'supply' ? value.toUpperCase() : value}
        </div>
      </div>
    );
  }
}
