import * as React from 'react';

import apiIcon from '../../../assets/images/icons/api.icon.svg';
import arrowIcon from '../../../assets/images/icons/arrow.icon.svg';
import chartIcon from '../../../assets/images/icons/chart.icon.svg';
import dataIcon from '../../../assets/images/icons/data.icon.svg';
import searchIcon from '../../../assets/images/icons/search.icon.svg';
import statsIcon from '../../../assets/images/icons/stats.icon.svg';
import walletIcon from '../../../assets/images/icons/wallet.icon.svg';

interface IIconProps {
  className?: string;
}

export const SearchIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${searchIcon.id}` }/>
    </svg>
  );
};

export const ArrowIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${arrowIcon.id}` }/>
    </svg>
  );
};

export const DataIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${dataIcon.id}` }/>
    </svg>
  );
};

export const ApiIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${apiIcon.id}` }/>
    </svg>
  );
};

export const WalletIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${walletIcon.id}` }/>
    </svg>
  );
};

export const ChartIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${chartIcon.id}` }/>
    </svg>
  );
};

export const StatsIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${statsIcon.id}` }/>
    </svg>
  );
};
