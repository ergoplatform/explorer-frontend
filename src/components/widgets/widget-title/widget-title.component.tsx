import React from 'react';
import { FormattedMessage } from 'react-intl';

import './widget-title.scss';

interface WidgetTitleProps {
  title: string;
  icon: React.ReactNode;
}

export const WidgetTitle = ({ title, icon }: WidgetTitleProps): JSX.Element => {
  return (
    <div className="bi-widget-title g-flex">
      {icon}
      <h2 className="bi-widget-title__text">
        <FormattedMessage id={title} />
      </h2>
    </div>
  );
};
