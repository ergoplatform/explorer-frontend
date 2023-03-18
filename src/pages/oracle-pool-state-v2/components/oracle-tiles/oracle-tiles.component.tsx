import React from 'react';
import './oracle-tiles.scss';
import {
  LatestPriceIcon,
  EpochEndsIcon,
  PostingScheduleIcon,
  CurrentPoolStageIcon,
  PoolFundedPercentageIcon,
} from './icons/icons';

interface Props {
  data?: any;
}

const icons = [
  LatestPriceIcon,
  PostingScheduleIcon,
  EpochEndsIcon,
  CurrentPoolStageIcon,
  PoolFundedPercentageIcon,
];

const OracleTiles = (props: Props) => {
  const { data } = props;

  return (
    <div className="oracle-tiles-list">
      {data.map((tile: any, index: number) => {
        const Icon = icons[index];
        const value =
          index === 0
            ? `${tile.symbol || ''} ${tile.value}`
            : `${tile.value} ${tile.symbol || ''}`;

        return (
          <div className="oracle-tiles-list__item" key={tile.name}>
            <Icon className="oracle-tiles-list__item-icon" />
            <p className="oracle-tiles-list__item-title">{tile.name}</p>
            <p className="oracle-tiles-list__item-paragraph">{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OracleTiles;
