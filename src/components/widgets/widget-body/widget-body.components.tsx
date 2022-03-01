import React from 'react';

import './widget-body.scss';

export const WidgetBody = ({ children }: any): JSX.Element => {
  return <div className={'bi-widget-body'}>{children}</div>;
};
