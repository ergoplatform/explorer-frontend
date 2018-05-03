import * as React from 'react';

import HeaderStatsComponent from '../header-stats/header-stats.component';

import './header.scss';

class HeaderComponent extends React.Component {
  render (): JSX.Element {
    return (
      <div className='bi-header'>
        <HeaderStatsComponent/>
      </div>
    );
  }
}

export default HeaderComponent;
