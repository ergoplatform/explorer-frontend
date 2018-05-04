import * as React from 'react';

import arrowIcon from '../../assets/images/icons/arrow.icon.svg';
import searchIcon from '../../assets/images/icons/search.icon.svg';

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
