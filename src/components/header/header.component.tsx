import * as React from 'react';

import { HeaderStatsComponent } from '../header-stats/header-stats.component';
import { SearchComponent } from '../search/search.component';

import './header.scss';

import { BurgerIcon } from '../common/icons/common.icons';

export class HeaderComponent extends React.Component {
  render (): JSX.Element {
    return (
      <div className='bi-header g-flex g-flex-column__item-fixed'>
        <button className='bi-header__toggle bi-btn bi-btn--flat'>
          <BurgerIcon className='bi-header__toggle-icon'/>
        </button>
        
        <div className='bi-header__logo'>
          <span className='bi-header__logo-highlight'>ERGO</span>
          EXPLORER
        </div>
        
        <div className='bi-header__stats g-flex__item'>
          <HeaderStatsComponent/>
        </div>
        
        <SearchComponent/>
      </div>
    );
  }
}
