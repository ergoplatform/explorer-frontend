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
  console.log(data);
  return (
    <div className="oracle-tiles-list">
      {data.map((tile: any, index: number) => {
        const Icon = icons[index];

        return (
          <div className="oracle-tiles-list__item" key={tile.name}>
            <Icon className="oracle-tiles-list__item-icon" />
            <p className="oracle-tiles-list__item-title">{tile.name}</p>
            <p className="oracle-tiles-list__item-paragraph">
              {tile.value} {tile.symbol}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default OracleTiles;
