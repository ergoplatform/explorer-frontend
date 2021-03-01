import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import './oracle-pool-state.scss';
import OraclePoolTimelineComponent from './components/oracle-pool-timeline/oracle-pool-timeline.component';
import OracleTiles from './components/oracle-tiles/oracle-tiles.component';
import OracleTable from './components/oracle-table/oracle-table.component';
import { OraclePoolStateActions } from 'src/actions/oraclePoolState.actions';
import { bindActionCreators } from 'redux';
import { getOraclePoolDataStructSelector } from 'src/selectors/oraclePoolState';
import { withRouter, RouterProps } from 'react-router';
import { pools } from 'src/services/oraclePoolState.service';
import LoaderLogo from 'src/components/loader/loader';
import { ErrorIcon, ArrowIcon } from 'src/components/common/icons/common.icons';
import { resetStruct } from 'redux-struct';
import { GET_ORACLE_POOL_DATA_STRUCT } from 'src/constants/struct.types';
import { Link } from 'react-router-dom';

const mapStateToProps = (state: any): any => ({
  poolData: getOraclePoolDataStructSelector(state),
});

const mapDispatchToProps = (dispatch: any): any => {
  return bindActionCreators(
    {
      ...OraclePoolStateActions,
      resetPoolDataStruct: () =>
        dispatch(resetStruct(GET_ORACLE_POOL_DATA_STRUCT)),
    },
    dispatch
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouterProps;

const OraclePoolState = (props: Props) => {
  const {
    getPoolData,
    poolData,
    match: {
      params: { id },
    },
    history,
    resetPoolDataStruct,
  } = props;

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (!pools[id]) {
      history.push(`/oracle-pool-state/${Object.keys(pools)[0]}`);
    }
  }, []);

  useEffect(() => {
    if (pools[id]) {
      getPoolData(id);
    }
  }, [id]);

  useEffect(() => {
    if (poolData.data) {
      setIsDataLoaded(true);
    }
  }, [poolData.data]);

  useEffect(() => {
    let intervalId: any = null;

    if (pools[id]) {
      intervalId = setInterval(() => getPoolData(id), 30000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [id]);

  useEffect(() => () => resetPoolDataStruct(), []);

  const data = useMemo(() => poolData.data || null, [poolData.data]);

  const tiles = useMemo(
    () =>
      data
        ? [
            {
              name: 'Latest Price',
              value: Number(data.latest_price).toFixed(2),
              symbol: '$',
            },
            {
              name: 'Posting Schedule',
              value: data.posting_schedule_minutes,
              symbol: 'min',
            },
            {
              name: 'Epoch Ends',
              value: data.epoch_ends_in_minutes,
              symbol: 'min',
            },
            { name: 'Current Pool Stage', value: data.current_pool_stage },
            {
              name: 'Pool Funded Percentage',
              value: data.pool_funded_percentage,
            },
          ]
        : [],
    [data]
  );

  const technicalData = useMemo(
    () =>
      data
        ? [
            {
              name: 'Latest Pool Datapoint',
              value: data.latest_datapoint,
            },
            {
              name: 'Datapoint Address',
              value: data.datapoint_address,
            },
            {
              name: 'Epoch Prep Address',
              value: data.epoch_prep_address,
            },
            {
              name: 'Live Epoch Address',
              value: data.live_epoch_address,
            },
            {
              name: 'Pool Deposits Address',
              value: data.pool_deposits_address,
            },
            {
              name: 'Oracle Payout Price (in nanoErg)',
              value: data.oracle_payout_price,
            },
            {
              name: 'Epoch Prep Length',
              value: data.epoch_prep_length,
            },
            {
              name: 'Oracle Pool NFT ID',
              value: data.oracle_pool_nft_id,
            },
            {
              name: 'Oracle Pool Participant Token Id',
              value: data.oracle_pool_participant_token_id,
            },
            {
              name: 'Deviation range',
              value: data.deviation_range,
            },
            {
              name: 'Consensus number',
              value: data.consensus_num,
            },
          ]
        : [],
    [data]
  );

  const summaryData = useMemo(
    () =>
      data
        ? [
            {
              name: `Latest Price: [${data.title}]`,
              value: data.latest_price,
            },
            {
              name: `Number Of Oracles`,
              value: data.number_of_oracles,
            },
            {
              name: 'Posting Schedule (In Blocks)',
              value: data.posting_schedule_blocks,
            },
            {
              name: 'Posting Schedule (In Minutes)',
              value: data.posting_schedule_minutes,
            },
            {
              name: 'Pool Funded Percentage',
              value: data.pool_funded_percentage,
            },
            {
              name: 'Current Pool Stage',
              value: data.current_pool_stage,
            },
          ]
        : [],
    [data]
  );

  if (!isDataLoaded) {
    return <LoaderLogo />;
  }

  if (poolData.error) {
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
      <h1 className="or-content__title">{data?.title} Oracle Pool</h1>

      <OraclePoolTimelineComponent poolData={data} />

      <OracleTiles data={tiles} />

      <div className="or-content__table">
        <div>
          <OracleTable name="Summary" data={summaryData} />
        </div>
        <div>
          <OracleTable name="Technical" data={technicalData} />
        </div>
      </div>
    </div>
  );
};

const OraclePoolStateComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OraclePoolState));

export default OraclePoolStateComponent;
