import React from 'react';

import environment from '../../../config/environment';

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
import signIcon from '../../../assets/images/icons/sign.svg';
import sortDirectionAscIcon from '../../../assets/images/icons/sort-direction-asc.icon.svg';
import sortDirectionDescIcon from '../../../assets/images/icons/sort-direction-desc.icon.svg';
import sortDirectionIcon from '../../../assets/images/icons/sort-direction.icon.svg';
import statsIcon from '../../../assets/images/icons/stats.icon.svg';
import logoAltImage from '../../../assets/images/logo-main-alt.svg';
import logoImage from '../../../assets/images/logo-main.svg';
import logoVerticalAltImage from '../../../assets/images/logo-vertical-alt.svg';
import logoVerticalImage from '../../../assets/images/logo-vertical.svg';
import diagramIcon from '../../../assets/images/icons/diagram.svg';
import tokenIcon from '../../../assets/images/icons/tokens.svg';

interface IconProps {
  className?: string;
}

export const makeIcon = (iconId: string, className?: string): JSX.Element => {
  return (
    <svg className={className} focusable="false">
      <use xlinkHref={`#${iconId}`} />
    </svg>
  );
};

export const SearchIcon = ({ className }: IconProps) => {
  return makeIcon(searchIcon.id, className);
};

export const ArrowIcon = ({ className }: IconProps) => {
  return makeIcon(arrowIcon.id, className);
};

export const DataIcon = ({ className }: IconProps) => {
  return makeIcon(dataIcon.id, className);
};

export const ApiIcon = ({ className }: IconProps) => {
  return makeIcon(apiIcon.id, className);
};

export const SignIcon = ({ className }: IconProps) => {
  return makeIcon(signIcon.id, className);
};

export const ChartIcon = ({ className }: IconProps) => {
  return makeIcon(chartIcon.id, className);
};

export const StatsIcon = ({ className }: IconProps) => {
  return makeIcon(statsIcon.id, className);
};

export const QRCodeIcon = ({ className }: IconProps) => {
  return makeIcon(qrCodeIcon.id, className);
};

export const CrossIcon = ({ className }: IconProps) => {
  return makeIcon(crossIcon.id, className);
};

export const DoubleArrowIcon = ({ className }: IconProps) => {
  return makeIcon(doubleArrowIcon.id, className);
};

export const SortDirectionIcon = ({ className }: IconProps) => {
  return makeIcon(sortDirectionIcon.id, className);
};

export const SortDirectionAscIcon = ({ className }: IconProps) => {
  return makeIcon(sortDirectionAscIcon.id, className);
};

export const SortDirectionDescIcon = ({ className }: IconProps) => {
  return makeIcon(sortDirectionDescIcon.id, className);
};

export const BurgerIcon = ({ className }: IconProps) => {
  return makeIcon(burgerIcon.id, className);
};

export const ArrowDownIcon = ({ className }: IconProps) => {
  return makeIcon(arrowDownIcon.id, className);
};

export const ArrowThickIcon = ({ className }: IconProps) => {
  return makeIcon(arrowThickIcon.id, className);
};

export const LogoVerticalIcon = ({ className }: IconProps) => {
  if (environment.alternativeLogo) {
    return makeIcon(logoVerticalAltImage.id, className);
  }

  return makeIcon(logoVerticalImage.id, className);
};

export const LogoIcon = ({ className }: IconProps) => {
  if (environment.alternativeLogo) {
    return makeIcon(logoAltImage.id, className);
  }

  return makeIcon(logoImage.id, className);
};

export const DiagramIcon = ({ className }: IconProps) => {
  return makeIcon(diagramIcon.id, className);
};

export const TokenIcon = ({ className }: IconProps) => {
  return makeIcon(tokenIcon.id, className);
};
