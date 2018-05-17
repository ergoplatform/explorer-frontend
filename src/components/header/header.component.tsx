import * as React from 'react';

import { HeaderStatsComponent } from '../header-stats/header-stats.component';
import { SearchComponent } from '../search/search.component';

import './header.scss';

class Header extends React.Component {
  render (): JSX.Element {
    return (
      <div className='bi-header g-flex g-flex-column__item-fixed'>
        <HeaderStatsComponent/>
        
        <SearchComponent/>
      </div>
    );
  }
}

export const HeaderComponent = Header;
