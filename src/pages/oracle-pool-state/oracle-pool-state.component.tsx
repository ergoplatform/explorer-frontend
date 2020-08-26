import React from 'react';
import { connect } from 'react-redux';
import './oracle-pool-state.scss';
import OraclePoolTimelineComponent from './components/oracle-pool-timeline/oracle-pool-timeline.component';
import OracleTiles from './components/oracle-tiles/oracle-tiles.component';
import OracleTable from './components/oracle-table/oracle-table.component';

interface Props {}

const OraclePoolState = (props: Props) => {
  return (
    <div className="or-content">
      <h1 className="or-content__title h1">ERG/USD Oracle Pool</h1>

      <OraclePoolTimelineComponent />

      <OracleTiles />

      <div className="or-content__table">
        <div>
          <OracleTable name="Summary" />
        </div>
        <div>
          <OracleTable name="Technical" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any): any => ({});

const mapDispatchToProps = (dispatch: any): any => {
  return {};
  // return bindActionCreators({ ...IssuedTokensActions }, dispatch);
};

const OraclePoolStateComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(OraclePoolState);

export default OraclePoolStateComponent;
