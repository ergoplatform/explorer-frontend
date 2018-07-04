import * as React from 'react';

import apiIcon from '../../../assets/images/icons/api.icon.svg';
import arrowDownIcon from '../../../assets/images/icons/arrow-down.icon.svg';
import arrowThickIcon from '../../../assets/images/icons/arrow-thick.icon.svg';
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

export const makeIcon = (iconId: string, className?: string): JSX.Element => {
  return (
    <svg className={ className }
         focusable='false'>
      <use xlinkHref={ `#${iconId}` }/>
    </svg>
  );
};

export const SearchIcon = ({ className }: IIconProps) => {
  return makeIcon(searchIcon.id, className);
};

export const ArrowIcon = ({ className }: IIconProps) => {
  return makeIcon(arrowIcon.id, className);
};

export const DataIcon = ({ className }: IIconProps) => {
  return makeIcon(dataIcon.id, className);
};

export const ApiIcon = ({ className }: IIconProps) => {
  return makeIcon(apiIcon.id, className);
};

export const WalletIcon = ({ className }: IIconProps) => {
  return makeIcon(walletIcon.id, className);
};

export const ChartIcon = ({ className }: IIconProps) => {
  return makeIcon(chartIcon.id, className);
};

export const StatsIcon = ({ className }: IIconProps) => {
  return makeIcon(statsIcon.id, className);
};

export const QRCodeIcon = ({ className }: IIconProps) => {
  return makeIcon(qrCodeIcon.id, className);
};

export const CrossIcon = ({ className }: IIconProps) => {
  return makeIcon(crossIcon.id, className);
};

export const DoubleArrowIcon = ({ className }: IIconProps) => {
  return makeIcon(doubleArrowIcon.id, className);
};

export const SortDirectionIcon = ({ className }: IIconProps) => {
  return makeIcon(sortDirectionIcon.id, className);
};

export const SortDirectionAscIcon = ({ className }: IIconProps) => {
  return makeIcon(sortDirectionAscIcon.id, className);
};

export const SortDirectionDescIcon = ({ className }: IIconProps) => {
  return makeIcon(sortDirectionDescIcon.id, className);
};

export const BurgerIcon = ({ className }: IIconProps) => {
  return makeIcon(burgerIcon.id, className);
};

export const ArrowDownIcon = ({ className }: IIconProps) => {
  return makeIcon(arrowDownIcon.id, className);
};

export const ArrowThickIcon = ({ className }: IIconProps) => {
  return makeIcon(arrowThickIcon.id, className);
};
