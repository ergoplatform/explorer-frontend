import * as React from 'react';

import searchIcon from '../../assets/images/icons/search.icon.svg';

interface IIconProps {
  className?: string;
  onClick?: any;
}

export const SearchIcon = ({ className, onClick }: IIconProps) => {
  return (
    <svg className={ className }
         onClick={ onClick }
         focusable='false'>
      <use xlinkHref={ `#${searchIcon.id}` }/>
    </svg>
  );
};
