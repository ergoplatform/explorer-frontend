import React from 'react';
import './oracle-pool-list.scss';
import OraclePoolCard from './components/oracle-pool-card/oracle-pool-card';
import { pools } from 'src/config/pools';

const OraclePoolList = () => {
  return (
    <div className="oracle-pool-list">
      {pools.map((data) => (
        <OraclePoolCard key={data.key} data={data}></OraclePoolCard>
      ))}
    </div>
  );
};

export default OraclePoolList;
