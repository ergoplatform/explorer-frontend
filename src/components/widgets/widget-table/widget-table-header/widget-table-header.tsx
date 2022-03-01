import React from 'react';
import { FormattedMessage } from 'react-intl';
import './widget-table-header.scss';

type Props = {
  tiles: string[];
};

export const WidgetTableHeader = (props: Props) => {
  return (
    <div className="widget-table-header widget-table__row bi-widget-table__row">
      {props.tiles.map((id) => (
        <div key={id} className="widget-table__cell bi-widget-table__cell">
          <FormattedMessage id={id} />
        </div>
      ))}
    </div>
  );
};
