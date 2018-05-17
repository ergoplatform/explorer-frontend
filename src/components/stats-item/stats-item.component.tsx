import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import './stats-item.scss';

interface IStatsItemProps {
  title: string;
  value: any;
}

class StatsItem extends React.PureComponent {
  props: IStatsItemProps & InjectedIntlProps;
  
  render (): JSX.Element {
    const { title, value } = this.props;
    
    return (
      <div className='bi-stats-item'>
        <div className='bi-stats-item__title'>
          { this.props.intl.formatMessage({ id: `common.stats.${title}` }) }
        </div>
        
        <div className='bi-stats-item__value'>
          { value }
        </div>
      </div>
    );
  }
}

export const StatsItemComponent = injectIntl<IStatsItemProps>(StatsItem);
