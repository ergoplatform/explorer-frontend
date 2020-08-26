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

const data = [
  { name: 'Latest Price', value: '0.29', symbol: '$' },
  { name: 'Posting Schedule', value: '60', symbol: 'min' },
  { name: 'Epoch Ends', value: '60', symbol: 'min' },
  { name: 'Current Pool Stage', value: '288699' },
  { name: 'Pool Funded Percentage', value: '1560' },
];

const icons = [
  LatestPriceIcon,
  PostingScheduleIcon,
  EpochEndsIcon,
  CurrentPoolStageIcon,
  PoolFundedPercentageIcon,
];

const OracleTiles = (props: Props) => {
  // const { data } = props;

  return (
    <div className="oracle-tiles-list">
      {data.map((tile, index) => {
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
