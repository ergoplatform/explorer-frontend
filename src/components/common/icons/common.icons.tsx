import React from 'react';

import environment from '../../../config/environment';

import { ReactComponent as apiIcon } from '../../../assets/images/icons/api.icon.svg';
import { ReactComponent as arrowDownIcon } from '../../../assets/images/icons/arrow-down.icon.svg';
import { ReactComponent as arrowThickIcon } from '../../../assets/images/icons/arrow-thick.icon.svg';
import { ReactComponent as arrowIcon } from '../../../assets/images/icons/arrow.icon.svg';
import { ReactComponent as burgerIcon } from '../../../assets/images/icons/burger.icon.svg';
import { ReactComponent as chartIcon } from '../../../assets/images/icons/chart.icon.svg';
import { ReactComponent as crossIcon } from '../../../assets/images/icons/cross.icon.svg';
import { ReactComponent as dataIcon } from '../../../assets/images/icons/data.icon.svg';
import { ReactComponent as doubleArrowIcon } from '../../../assets/images/icons/double-arrow.icon.svg';
import { ReactComponent as qrCodeIcon } from '../../../assets/images/icons/qrcode.icon.svg';
import { ReactComponent as searchIcon } from '../../../assets/images/icons/search.icon.svg';
import { ReactComponent as signIcon } from '../../../assets/images/icons/sign.svg';
import { ReactComponent as sortDirectionAscIcon } from '../../../assets/images/icons/sort-direction-asc.icon.svg';
import { ReactComponent as sortDirectionDescIcon } from '../../../assets/images/icons/sort-direction-desc.icon.svg';
import { ReactComponent as sortDirectionIcon } from '../../../assets/images/icons/sort-direction.icon.svg';
import { ReactComponent as statsIcon } from '../../../assets/images/icons/stats.icon.svg';
import { ReactComponent as logoAltImage } from '../../../assets/images/logo-main-alt.svg';
import { ReactComponent as logoImage } from '../../../assets/images/logo-main.svg';
import { ReactComponent as logoVerticalAltImage } from '../../../assets/images/logo-vertical-alt.svg';
import { ReactComponent as logoVerticalImage } from '../../../assets/images/logo-vertical.svg';
import { ReactComponent as diagramIcon } from '../../../assets/images/icons/diagram.svg';
import { ReactComponent as tokenIcon } from '../../../assets/images/icons/tokens.svg';

interface IconProps {
  className?: string;
}

export const makeIcon = (Icon: any, className?: string): JSX.Element => {
  return <Icon className={className} focusable="false" />;
};

export const SearchIcon = ({ className }: IconProps) => {
  return makeIcon(searchIcon, className);
};

export const ArrowIcon = ({ className }: IconProps) => {
  return makeIcon(arrowIcon, className);
};

export const DataIcon = ({ className }: IconProps) => {
  return makeIcon(dataIcon, className);
};

export const ApiIcon = ({ className }: IconProps) => {
  return makeIcon(apiIcon, className);
};

export const SignIcon = ({ className }: IconProps) => {
  return makeIcon(signIcon, className);
};

export const ChartIcon = ({ className }: IconProps) => {
  return makeIcon(chartIcon, className);
};

export const StatsIcon = ({ className }: IconProps) => {
  return makeIcon(statsIcon, className);
};

export const QRCodeIcon = ({ className }: IconProps) => {
  return makeIcon(qrCodeIcon, className);
};

export const CrossIcon = ({ className }: IconProps) => {
  return makeIcon(crossIcon, className);
};

export const DoubleArrowIcon = ({ className }: IconProps) => {
  return makeIcon(doubleArrowIcon, className);
};

export const SortDirectionIcon = ({ className }: IconProps) => {
  return makeIcon(sortDirectionIcon, className);
};

export const SortDirectionAscIcon = ({ className }: IconProps) => {
  return makeIcon(sortDirectionAscIcon, className);
};

export const SortDirectionDescIcon = ({ className }: IconProps) => {
  return makeIcon(sortDirectionDescIcon, className);
};

export const BurgerIcon = ({ className }: IconProps) => {
  return makeIcon(burgerIcon, className);
};

export const ArrowDownIcon = ({ className }: IconProps) => {
  return makeIcon(arrowDownIcon, className);
};

export const ArrowThickIcon = ({ className }: IconProps) => {
  return makeIcon(arrowThickIcon, className);
};

export const LogoVerticalIcon = ({ className }: IconProps) => {
  if (environment.alternativeLogo) {
    return makeIcon(logoVerticalAltImage, className);
  }

  return makeIcon(logoVerticalImage, className);
};

export const LogoIcon = ({ className }: IconProps) => {
  if (environment.alternativeLogo) {
    return makeIcon(logoAltImage, className);
  }

  return makeIcon(logoImage, className);
};

export const DiagramIcon = ({ className }: IconProps) => {
  return makeIcon(diagramIcon, className);
};

export const TokenIcon = ({ className }: IconProps) => {
  return makeIcon(tokenIcon, className);
};
