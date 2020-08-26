import { makeIcon } from 'src/components/common/icons/common.icons';
import { ReactComponent as epochEndsIcon } from '../../../../../assets/images/icons/oraclePoolState/epochEndsIcon.svg';
import { ReactComponent as latestPriceIcon } from '../../../../../assets/images/icons/oraclePoolState/latestPriceIcon.svg';
import { ReactComponent as currentPoolStageIcon } from '../../../../../assets/images/icons/oraclePoolState/currentPoolStageIcon.svg';
import { ReactComponent as poolFundedPercentageIcon } from '../../../../../assets/images/icons/oraclePoolState/poolFundedPercentageIcon.svg';
import { ReactComponent as postingScheduleIcon } from '../../../../../assets/images/icons/oraclePoolState/postingScheduleIcon.svg';
import { ReactComponent as groupLine } from '../../../../../assets/images/icons/oraclePoolState/groupLine.svg';

interface IconProps {
  className?: string;
}

export const CurrentPoolStageIcon = ({ className }: IconProps) => {
  return makeIcon(currentPoolStageIcon, className);
};

export const LatestPriceIcon = ({ className }: IconProps) => {
  return makeIcon(latestPriceIcon, className);
};

export const EpochEndsIcon = ({ className }: IconProps) => {
  return makeIcon(epochEndsIcon, className);
};

export const PoolFundedPercentageIcon = ({ className }: IconProps) => {
  return makeIcon(poolFundedPercentageIcon, className);
};

export const PostingScheduleIcon = ({ className }: IconProps) => {
  return makeIcon(postingScheduleIcon, className);
};

export const GroupLineIcon = ({ className }: IconProps) => {
  return makeIcon(groupLine, className);
};
