import * as React from 'react';

import StatsItemComponent from '../stats-item/stats-item.component';

import './header-stats.scss';

// TODO: replace mock data
const stats: any[] = [
  {
    title: 'common.stats.softwareVersion',
    value: '1.0.2'
  },
  {
    title: 'common.stats.circulatingSupply',
    value: '3820969'
  }];

class HeaderStatsComponent extends React.Component {
  render (): JSX.Element {
    return (
      <div className='bi-header-stats g-flex'>
        {
          stats.map((item) => {
            return <StatsItemComponent title={ item.title } value={ item.value } key={ item.title }/>;
          })
        }
      </div>
    );
  }
}

export default HeaderStatsComponent;
