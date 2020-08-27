import { ActionCreatorsMapObject } from 'redux';
import { OraclePoolStateService } from '../services/oraclePoolState.service';

export interface OraclePoolStateActions extends ActionCreatorsMapObject {
  getPoolData: (key: string) => any;
}

export const OraclePoolStateActions: OraclePoolStateActions = {
  getPoolData(key: string) {
    return (dispatch: any) => OraclePoolStateService.getPoolData(dispatch, key);
  },
};
