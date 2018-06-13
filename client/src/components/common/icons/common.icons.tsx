import * as React from 'react';

import apiIcon from '../../../assets/images/icons/api.icon.svg';
import arrowDownIcon from '../../../assets/images/icons/arrow-down.icon.svg';
import arrowIcon from '../../../assets/images/icons/arrow.icon.svg';
import burgerIcon from '../../../assets/images/icons/burger.icon.svg';
import chartIcon from '../../../assets/images/icons/chart.icon.svg';
import crossIcon from '../../../assets/images/icons/cross.icon.svg';
import dataIcon from '../../../assets/images/icons/data.icon.svg';
import doubleArrowIcon from '../../../assets/images/icons/double-arrow.icon.svg';
import qrCodeIcon from '../../../assets/images/icons/qrcode.icon.svg';
import searchIcon from '../../../assets/images/icons/search.icon.svg';
import sortDirectionAscIcon from '../../../assets/images/icons/sort-direction-asc.icon.svg';
import sortDirectionDescIcon from '../../../assets/images/icons/sort-direction-desc.icon.svg';
import sortDirectionIcon from '../../../assets/images/icons/sort-direction.icon.svg';
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

export const QRCodeIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${qrCodeIcon.id}` }/>
    </svg>
  );
};

export const CrossIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${crossIcon.id}` }/>
    </svg>
  );
};

export const DoubleArrowIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${doubleArrowIcon.id}` }/>
    </svg>
  );
};

export const SortDirectionIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${sortDirectionIcon.id}` }/>
    </svg>
  );
};

export const SortDirectionAscIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${sortDirectionAscIcon.id}` }/>
    </svg>
  );
};

export const SortDirectionDescIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${sortDirectionDescIcon.id}` }/>
    </svg>
  );
};


export const BurgerIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${burgerIcon.id}` }/>
    </svg>
  );
};

export const ArrowDownIcon = ({ className }: IIconProps) => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${arrowDownIcon.id}` }/>
    </svg>
  );
};
