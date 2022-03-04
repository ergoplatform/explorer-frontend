import React from 'react';
import { Link } from 'react-router-dom';
import LoaderLogo from 'src/components/loader/loader';
import { WidgetTableHeader } from './widget-table-header/widget-table-header';
import './widget-table.scss';

export type Column = {
  value: any;
};

export type Row = Column[];
type Props = {
  isFetching: boolean;
  data?: Row[];
  headerTiles: any;
};

export const WidgetTable = ({ headerTiles, data, isFetching }: Props) => {
  if (isFetching) {
    return (
      <div className="widget-table-loader">
        <LoaderLogo></LoaderLogo>
      </div>
    );
  }

  return (
    <div className="widget-table bi-widget-table">
      <WidgetTableHeader tiles={headerTiles} />
      {data
        ? data.map((row, i) => (
            <div key={i} className="widget-table__row bi-widget-table__row">
              {Object.keys(row).map((column, j) => (
                <div
                  key={j}
                  className="widget-table__cell bi-widget-table__cell"
                >
                  {row[column].link ? (
                    <Link
                      to={`${row[column].linkValue}`}
                      className="u-word-wrap u-word-wrap--ellipsis"
                    >
                      {row[column].value}
                    </Link>
                  ) : (
                    row[column].value
                  )}
                </div>
              ))}
            </div>
          ))
        : null}
    </div>
  );
};
