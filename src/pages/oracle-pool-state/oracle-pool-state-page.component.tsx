import React from 'react';
import { withRouter } from 'react-router';
import { OraclePoolStateComponentV2 } from './oracle-pool-state-v2.component';
import OraclePoolStateComponent from './oracle-pool-state.component';

const OraclePoolStatePageComponent = withRouter((props: any) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  if (id === 'xauerg') {
    return <OraclePoolStateComponentV2 {...props} />;
  }
  return <OraclePoolStateComponent {...props} />;
});

export default OraclePoolStatePageComponent;
