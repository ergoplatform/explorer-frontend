import React, { useEffect, useMemo } from 'react';
import './oracle-pool-timeline.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';
// import // getOraclePoolInfoStructSelector,
// // getCurrentBlockHeightStructSelector,
// // getOraclePoolStatusStructSelector,
// 'src/selectors/oraclePoolState';
import { OraclePoolStateActions } from 'src/actions/oraclePoolState.actions';
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

const poolInfo = JSON.parse(
  '{"live_epoch_address":"3vThpSDoLo58CtKKFLBQMmtcD5e5pJeFNNyPKnDRC4zKzhgySeTUkU71fk9mcFgHe23k1b4QuERNdcignnexcULMEenifBffiNeCdiTkgaUiGtH5D9rrsj698mRLDhANmybx8c6NunwUMoKuLsRoEYtYi8rRjuKfbNDN1HfVsgFKSyKMSnwJXa5KAuABSz5dYUgURf6M3i2bxsKKYTe4uQFEoVcbBwvfW4UxXaKqQYGB8xGLASMfHtcs9R5CBFkHyUSXh2sFy17pfdQ5emx8CgE5ZXRqx7YBYzk9jSyGqp2myT5XvBAS2uSeahNKWYKzh1XTqDc3YGLvBPHJ98bksaaSnNX4SwAhia2mXY4iCKsYf6F7p5QPNjYBXqLyzkDFxSzgQJmMg1Ybh3fx6Sg8esE9w5L7KCGEuydPkBE","epoch_prep_address":"Gxd4hMRT6J1SA6D3tfvyij49J2DCQkeZfxNVEpoZidZtS9YYsi8Jg5u3JBZQHxdmrLpVgTsnLnSbt377BRJAWFUfkdcmC1pMPFNUYBWuYaccbMxP5kV3WkGU7oxsWJauKfiGkFZPN1W1RmWVmpFbdKaCizjnMqC7TLsQ53JfBzWo5CsYj2Vn3YYbJFZiXbfVXWKjvkUHatcGxL47QnBffcKfFJun7t1tFgxowLonpFpq7SFAz4YRE6TdZarmWDjDER13pSUupfaKCZmUe3aCRhgAsdp4RHuW8n1RywcYcSjGNPVFzsGjD8GQdUrs85Xv4gobuH49S4WZFgkcoQAx3jx3GqhY9kQWwdn7Ni7v2XcKMwFFCvvzrPAKtUHLZYU4VN4RjvoFLRYJ5H","pool_deposits_address":"zLSQDVBaFJVVPWsvzN8begiciWsjdiFyJn9NwnLbJxMrGehDXPJnEuWm2x8gQtCutoK7crMSP9sKQBPyaPVRQXpiSr7ZoKrz4arYiJXKX1MDAfJFm9tjkY379ZiskLYHC3mmf4CQxATbY9P3mTjYw3f3Hkoxnu4yxvMCVBtRTuuRK1qh4E6aGpG8cJcpJ5qBtEsx7SrJoMZP34exMNxD1dPoaDFbuKHnoXAZmDLHnLqG3HgdPy","datapoint_address":"jL2aaqw6XU61SZznxeykLpREPzSmZv8bwbjEsJD6DMfXQLgBc12wMmPpVD81JnLxfxkT6s5nvYgbB62vkH8ChHeuVKtCPDMLTZ3gFMTa11YXXGBKvkezBENzpDBh8HsLHhnTTbMzv2sViDQpSWVNEF6G3Z9Fn2Ce6TNc5iHFZr7jGCBLtfRLKMb9RRUc9voWz9yEWpgADEkoQnDyMn5wc6xLoJsSYLfXHo2t8pyvwXfn2NotR3xFRDHU7wHXe","oracle_payout_price":2000000,"live_epoch_length":5,"epoch_prep_length":5,"margin_of_error":0.01,"number_of_oracles":4,"oracle_pool_nft_id":"b662db51cf2dc39f110a021c2a31c74f0a1a18ffffbf73e8a051a7b8c0f09ebc","oracle_pool_participant_token_id":"12caaacb51c89646fac9a3786eb98d0113bd57d68223ccc11754a4f67281daed"}'
);

const poolStatus = JSON.parse(
  '{"funded_percentage":6200,"current_pool_stage":"Epoch Preparation","latest_datapoint":331797000,"current_epoch_id":"Preparing Epoch Currently","epoch_ends":292887}'
);

const mapStateToProps = (state: any): any => ({
  poolInfo: poolInfo,
  // poolInfo: getOraclePoolInfoStructSelector(state),
  poolStatus: poolStatus,
  // poolStatus: getOraclePoolStatusStructSelector(state),
  // currentBlock: getCurrentBlockHeightStructSelector(state),
  currentBlock: 292878,
});

const mapDispatchToProps = (dispatch: any): any => {
  return bindActionCreators({ ...OraclePoolStateActions }, dispatch);
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const OraclePoolTimeline = (props: Props) => {
  const {
    poolInfo,
    currentBlock,
    getPoolInfo,
    poolStatus,
    getCurrentBlockHeight,
    getPoolStatus,
  } = props;

  console.log(poolInfo);
  console.log(poolStatus);
  useEffect(() => {
    getPoolInfo();
    getCurrentBlockHeight();
    getPoolStatus();
  }, []);

  const timeline = useMemo(() => getTimelineConfig(poolStatus, currentBlock), [
    poolStatus,
    currentBlock,
  ]);

  const epochStart = useMemo(
    () => timeline.find((item) => item.type === dotStates.EPOCH_START),
    [timeline]
  );

  const epochEnd = useMemo(
    () => timeline.find((item) => item.type === dotStates.EPOCH_END),
    [timeline]
  );

  return (
    <>
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
      <div className="or-timeline">
        <div className="or-timeline__line">
          <div className="or-timeline__arrow">
            <ArrowLeftIcon />
          </div>
          <div
            className={cn('or-timeline__arrow or-timeline__arrow--right', {
              'or-timeline__arrow--end-right':
                timeline[timeline.length - 1].type === dotStates.EPOCH_END,
            })}
          >
            <ArrowLeftIcon />
          </div>

          {timeline[timeline.length - 1].type === dotStates.EPOCH_END && (
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
                      className="or-timeline__circle-group circle-group"
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
                    className="or-timeline__circle-group circle-group circle-group--left"
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

const OraclePoolTimelineComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(OraclePoolTimeline);

export default OraclePoolTimelineComponent;
