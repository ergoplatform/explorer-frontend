import { ActionCreatorsMapObject } from 'redux';
import { OraclePoolStateService } from '../services/oraclePoolState.service';

export interface OraclePoolStateActions extends ActionCreatorsMapObject {
  getPoolData: () => any;
}

export const OraclePoolStateActions: OraclePoolStateActions = {
  getPoolData() {
    return (dispatch: any) => OraclePoolStateService.getPoolData(dispatch);
  },
};
