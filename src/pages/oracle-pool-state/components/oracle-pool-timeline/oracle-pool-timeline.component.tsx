import React, { useMemo } from 'react';
import './oracle-pool-timeline.scss';
import cn from 'classnames';
import {
  ArrowLeftIcon,
  GreenCircleIcon,
  GreenLineGroupIcon,
  BlackCircleSMIcon,
  RedCircleIcon,
  RedLineGroupIcon,
  RedLineGroupIcon2,
  OrangeLineGroupIcon,
  OrangeCircleIcon,
  GroupDotsIcon,
} from 'src/components/common/icons/common.icons';
import { getTimelineConfig, dotStates } from './getTimelineConfig';
import { GroupLineIcon } from '../oracle-tiles/icons/icons';

const renderMobileTimeline = (
  epochPreparation: any,
  epochEnd: any,
  epochStart: any
) => {
  if (epochPreparation) {
    return (
      <div className="or-timeline-mobile or-timeline-mobile--ending">
        <div className="or-timeline-card">
          <OrangeCircleIcon className="or-timeline-card__icon" />
          <div className="or-timeline-card__title">Currently Ending Epoch</div>
          <div className="or-timeline-card__value">
            {epochPreparation?.value || 'loading...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="or-timeline-mobile">
      <div className="or-timeline-card">
        <GreenCircleIcon className="or-timeline-card__icon" />
        <div className="or-timeline-card__title">Current Block Height</div>
        <div className="or-timeline-card__value">
          {epochStart?.value || 'loading...'}
        </div>
      </div>
      <GroupLineIcon className="or-timeline-mobile-line" />
      <div className="or-timeline-card">
        <RedCircleIcon className="or-timeline-card__icon" />
        <div className="or-timeline-card__title">Epoch end Height</div>
        <div className="or-timeline-card__value">
          {epochEnd?.value || 'loading...'}
        </div>
      </div>
    </div>
  );
};

const OraclePoolTimelineComponent = (props: any) => {
  const { poolData } = props;

  const timeline = useMemo(() => getTimelineConfig(poolData), [poolData]);

  const epochStart = useMemo(
    () => timeline.find((item) => item.type === dotStates.EPOCH_START),
    [timeline]
  );

  const epochEnd = useMemo(
    () => timeline.find((item) => item.type === dotStates.EPOCH_END),
    [timeline]
  );

  const epochPreparation = useMemo(
    () => timeline.find((item) => item.type === dotStates.EPOCH_ENDING),
    [timeline]
  );

  return (
    <>
      {renderMobileTimeline(epochPreparation, epochEnd, epochStart)}
      <div className="or-timeline">
        <div className="or-timeline__line">
          <div className="or-timeline__arrow">
            <ArrowLeftIcon />
          </div>
          <div
            className={cn('or-timeline__arrow or-timeline__arrow--right', {
              'or-timeline__arrow--end-right':
                timeline[timeline.length - 1]?.type === dotStates.EPOCH_END,
            })}
          >
            <ArrowLeftIcon />
          </div>

          {timeline[timeline.length - 1]?.type === dotStates.EPOCH_END && (
            <div className="or-timeline__dots">
              <GroupDotsIcon />
            </div>
          )}

          <div className="or-timeline__content">
            {timeline.map((item, index) => {
              if (item.type === dotStates.EPOCH_START) {
                return (
                  <div
                    key={index}
                    className="or-timeline__circle-group circle-group"
                  >
                    <div className="circle-group__card circle-group__card--green">
                      Current Block Height
                    </div>
                    <GreenCircleIcon />
                    <div className="circle-group__line">
                      <GreenLineGroupIcon className="circle-group__line-icon" />
                      <span className="circle-group__line-text">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              }

              if (item.type === dotStates.EPOCH_END) {
                if (index === 1) {
                  return (
                    <div
                      key={index}
                      className="or-timeline__circle-group circle-group circle-group--end"
                    >
                      <div className="circle-group__card circle-group__card--red">
                        Epoch End Height
                      </div>
                      <RedCircleIcon />
                      <div className="circle-group__line">
                        <RedLineGroupIcon2 className="circle-group__line-icon" />
                        <span className="circle-group__line-text">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    className="or-timeline__circle-group circle-group circle-group--left circle-group--end"
                  >
                    <div className="circle-group__card circle-group__card--red">
                      Epoch End Height
                    </div>
                    <RedCircleIcon />
                    <div className="circle-group__line">
                      <RedLineGroupIcon className="circle-group__line-icon" />
                      <span className="circle-group__line-text">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              }

              if (item.type === dotStates.EPOCH_ENDING) {
                return (
                  <div
                    key={index}
                    className="or-timeline__circle-group circle-group"
                  >
                    <div className="circle-group__card circle-group__card--orange">
                      Currently Ending Epoch
                    </div>
                    <OrangeCircleIcon />
                    <div className="circle-group__line">
                      <OrangeLineGroupIcon className="circle-group__line-icon" />
                      <span className="circle-group__line-text">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className="or-timeline__circle-group circle-group circle-group--small"
                >
                  <BlackCircleSMIcon />
                  <div className="circle-group__line">
                    <span className="circle-group__line-text">
                      {item.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OraclePoolTimelineComponent;
