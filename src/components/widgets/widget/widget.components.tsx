import React from 'react';

import './widget.scss';

export const Widget = ({ children }: any): JSX.Element => {
  return <div className={'bi-widget'}>{children}</div>;
};
