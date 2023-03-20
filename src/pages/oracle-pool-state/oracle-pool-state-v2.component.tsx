import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import './oracle-pool-state.scss';
import OraclePoolTimelineComponent from '../oracle-pool-state/components/oracle-pool-timeline/oracle-pool-timeline.component';
import OracleTiles from '../oracle-pool-state/components/oracle-tiles/oracle-tiles.component';
import OracleTable from '../oracle-pool-state/components/oracle-table/oracle-table.component';
import { bindActionCreators } from 'redux';
import { withRouter, RouterProps } from 'react-router';
import LoaderLogo from 'src/components/loader/loader';
import { ErrorIcon, ArrowIcon } from 'src/components/common/icons/common.icons';
import { nanoErgsInErg } from 'src/constants/config';
import { resetStruct } from 'redux-struct';
import {
  GET_ORACLE_INFO_V2_STRUCT,
  GET_ORACLE_POOL_INFO_V2_STRUCT,
  GET_ORACLE_POOL_STATUS_V2_STRUCT,
  GET_ORACLE_STATUS_V2_STRUCT,
} from 'src/constants/struct.types';
import { Link } from 'react-router-dom';
import { OraclePoolStateV2Actions } from 'src/actions/oraclePoolStatev2.actions';
import { pools } from 'src/services/oraclePoolStateV2.service';
import { pools as configPools } from 'src/config/pools';
import {
  getOracleInfoStructSelector,
  getOraclePoolInfoStructSelector,
  getOraclePoolStatusStructSelector,
  getOracleStatusStructSelector,
} from 'src/selectors/oraclePoolStateV2';

const mapStateToProps = (state: any): any => ({
  poolInfo: getOraclePoolInfoStructSelector(state),
  poolStatus: getOraclePoolStatusStructSelector(state),
  oracleInfo: getOracleInfoStructSelector(state),
  oracleStatus: getOracleStatusStructSelector(state),
});

const mapDispatchToProps = (dispatch: any): any => {
  return bindActionCreators(
    {
      ...OraclePoolStateV2Actions,
      resetPoolInfoStruct: () =>
        dispatch(resetStruct(GET_ORACLE_POOL_INFO_V2_STRUCT)),
      resetPoolStatusStruct: () =>
        dispatch(resetStruct(GET_ORACLE_POOL_STATUS_V2_STRUCT)),
      resetOracleInfoStruct: () =>
        dispatch(resetStruct(GET_ORACLE_INFO_V2_STRUCT)),
      resetOracleStatusStruct: () =>
        dispatch(resetStruct(GET_ORACLE_STATUS_V2_STRUCT)),
    },
    dispatch
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouterProps;

const OraclePoolState = (props: Props) => {
  const {
    getPoolInfo,
    getPoolStatus,
    getOracleInfo,
    getOracleStatus,
    poolInfo,
    poolStatus,
    oracleInfo,
    oracleStatus,
    match: {
      params: { id },
    },
    history,
    resetPoolInfoStruct,
    resetPoolStatusStruct,
    resetOracleInfoStruct,
    resetOracleStatusStruct,
  } = props;

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (!pools[id]) {
      history.push(`/oracle-pool-state/${Object.keys(pools)[0]}`);
    }
  }, []);

  useEffect(() => {
    if (pools[id]) {
      getPoolInfo(id);
      getPoolStatus(id);
      getOracleInfo(id);
      getOracleStatus(id);
    }
  }, [id]);

  useEffect(() => {
    if (
      poolInfo.data &&
      poolStatus.data &&
      oracleInfo.data &&
      oracleStatus.data
    ) {
      setIsDataLoaded(true);
    }
  }, [poolInfo.data, poolStatus.data, oracleInfo.data, oracleStatus.data]);

  useEffect(() => {
    let intervalId: any = null;

    if (pools[id]) {
      intervalId = setInterval(() => {
        getPoolInfo(id);
        getPoolStatus(id);
        getOracleInfo(id);
        getOracleStatus(id);
      }, 30000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [id]);

  useEffect(
    () => () => {
      resetPoolInfoStruct();
      resetOracleStatusStruct();
      resetPoolStatusStruct();
      resetOracleInfoStruct();
    },
    []
  );

  const poolInfoData = useMemo(() => poolInfo.data || null, [poolInfo.data]);
  const poolStatusData = useMemo(
    () => poolStatus.data || null,
    [poolStatus.data]
  );
  const oracleInfoData = useMemo(
    () => oracleInfo.data || null,
    [oracleInfo.data]
  );
  const oracleStatusData = useMemo(
    () => oracleStatus.data || null,
    [oracleStatus.data]
  );
  const tiles = useMemo(
    () =>
      poolStatusData && poolInfoData
        ? [
            {
              name: 'Latest Price',
              value: poolStatusData.latest_pool_datapoint / nanoErgsInErg,
              symbol: 'ERG',
            },
            {
              name: 'Posting Schedule',
              value: poolInfoData.epoch_length * 2,
              symbol: 'min',
            },
            {
              name: 'Epoch Ends',
              value:
                (poolStatusData.epoch_end_height -
                  poolStatusData.current_block_height) *
                2,
              symbol: 'min',
            },
            {
              name: 'Number Of Oracles',
              value: poolStatusData.number_of_oracles,
            },
            {
              name: 'Latest Pool Box Height',
              value: poolStatusData.latest_pool_box_height,
            },
          ]
        : [],
    [poolStatusData]
  );

  const poolInfoSummary = useMemo(
    () =>
      poolInfoData
        ? [
            {
              name: 'Ballot Token ID',
              value: poolInfoData.ballot_token_id,
            },
            {
              name: 'Epoch Length',
              value: poolInfoData.epoch_length,
            },
            {
              name: 'Max Deviation Percent',
              value: poolInfoData.max_deviation_percent,
            },
            {
              name: 'Min Data Points',
              value: poolInfoData.min_data_points,
            },
            {
              name: 'Min Votes',
              value: poolInfoData.min_votes,
            },
            {
              name: 'Oracle Token ID',
              value: poolInfoData.oracle_token_id,
            },
            {
              name: 'Pool Box Address',
              value: poolInfoData.pool_box_address,
            },
            {
              name: 'Pool Nft ID',
              value: poolInfoData.pool_nft_id,
            },
            {
              name: 'Refresh Box Address',
              value: poolInfoData.refresh_box_address,
            },
            {
              name: 'Refresh Token ID',
              value: poolInfoData.refresh_token_id,
            },
            {
              name: 'Reward Token ID',
              value: poolInfoData.reward_token_id,
            },
            {
              name: 'Update Box Address',
              value: poolInfoData.update_box_address,
            },
            {
              name: 'Update Token ID',
              value: poolInfoData.update_token_id,
            },
          ]
        : [],
    [poolInfoData]
  );

  const oracleInfoSummary = useMemo(
    () =>
      oracleInfoData
        ? [
            {
              name: `Base fee (in ERG)`,
              value: oracleInfoData.base_fee / nanoErgsInErg,
            },
            {
              name: `Oracle Address`,
              value: oracleInfoData.oracle_address,
            },
          ]
        : [],
    [oracleInfoData]
  );

  const poolStatusSummary = useMemo(
    () =>
      poolStatusData
        ? [
            {
              name: `Pool Box Epoch ID`,
              value: poolStatusData.pool_box_epoch_id,
            },
            {
              name: `Reward Tokens In Pool Box`,
              value: poolStatusData.reward_tokens_in_pool_box,
            },
          ]
        : [],
    [poolStatusData]
  );

  const oracleStatusSummary = useMemo(
    () =>
      oracleStatusData
        ? [
            {
              name: 'Local Datapoint Box State Height',
              value: oracleStatusData.local_datapoint_box_state.height,
            },
            {
              name: 'Local Datapoint Box State Status',
              value: oracleStatusData.local_datapoint_box_state.status,
            },
          ]
        : [],
    [oracleStatusData]
  );

  if (!isDataLoaded) {
    return <LoaderLogo />;
  }

  if (
    poolInfo.error ||
    poolStatus.error ||
    oracleInfo.error ||
    oracleStatus.error
  ) {
    return (
      <div className="or-pool-error">
        <ErrorIcon />
        <p className="or-pool-error__message">
          Server Error. Unable to fetch oracle pool data.
        </p>
        <p className="or-pool-error__message">
          Dont worry, the oracle pool is still functioning properly on the
          blockchain, but you have hit a server issue.{' '}
        </p>
        <p className="or-pool-error__message">
          If this problem persists, please contact us on{' '}
          <a href="https://discord.gg/kj7s7nb">Discord</a> or{' '}
          <a href="https://t.me/ergoplatform">Telegram</a>
        </p>
      </div>
    );
  }

  return (
    <div className="or-content">
      <Link className="or-content__btn-back" to={`/oracle-pools-list`}>
        <ArrowIcon className="or-content__btn-back-icon" />

        <span className="or-content__btn-back-title">
          Back to Oracle Pool List
        </span>
      </Link>
      <h1 className="or-content__title">
        {configPools.find((data) => data.key === id)?.name} Oracle Pool
      </h1>

      <OraclePoolTimelineComponent poolData={poolStatusData} />

      <OracleTiles data={tiles} />

      <div className="or-content__table">
        <div>
          <OracleTable name="Pool Status" data={poolStatusSummary} />
        </div>
        <div>
          <OracleTable name="Oracle Info" data={oracleInfoSummary} />
        </div>
        <div>
          <OracleTable name="Pool Info" data={poolInfoSummary} />
        </div>
        <div>
          <OracleTable name="Oracle Status" data={oracleStatusSummary} />
        </div>
      </div>
    </div>
  );
};

export const OraclePoolStateComponentV2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OraclePoolState));
