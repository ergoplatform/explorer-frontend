import { ActionCreatorsMapObject } from 'redux';
import { OraclePoolStateService } from '../services/oraclePoolState.service';

export interface OraclePoolStateActions extends ActionCreatorsMapObject {
  getPoolInfo: () => any;
  getCurrentBlockHeight: () => any;
  getPoolStatus: () => any;
}

export const OraclePoolStateActions: OraclePoolStateActions = {
  getPoolInfo() {
    return (dispatch: any) => OraclePoolStateService.getPoolInfo(dispatch);
  },
  getCurrentBlockHeight() {
    return (dispatch: any) =>
      OraclePoolStateService.getCurrentBlockHeight(dispatch);
  },
  getPoolStatus() {
    return (dispatch: any) => OraclePoolStateService.getPoolStatus(dispatch);
  },
};
