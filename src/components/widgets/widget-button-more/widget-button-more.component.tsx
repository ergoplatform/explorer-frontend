import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './widget-button-more.scss';

interface ButtonProps {
  title: string;
  to: any;
}

export const WidgetButtonMore = ({ title, to }: ButtonProps): JSX.Element => {
  return (
    <Link className={'bi-widget-button-more g-flex'} to={to}>
      <FormattedMessage id={title} />
    </Link>
  );
};
