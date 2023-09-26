import React from 'react';
import './oracle-tiles.scss';

interface Props {
  data?: any;
}

const OracleTiles = (props: Props) => {
  const { data } = props;

  return (
    <div className="oracle-tiles-list">
      {data.map((tile: any, index: number) => {
        const value =
          index === 0
            ? `${tile.symbol || ''} ${tile.value}`
            : `${tile.value} ${tile.symbol || ''}`;

        return (
          <div className="oracle-tiles-list__item" key={tile.name}>
            <p className="oracle-tiles-list__item-title">{tile.name}</p>
            <p className="oracle-tiles-list__item-paragraph">{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OracleTiles;
