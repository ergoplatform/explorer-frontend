import { ActionCreatorsMapObject } from 'redux';
import { OraclePoolStateV2Service } from 'src/services/oraclePoolStateV2.service';

interface OraclePoolStateV2Actions extends ActionCreatorsMapObject {
  getPoolInfo: (key: string) => any;
  getPoolStatus: (key: string) => any;
  getOracleInfo: (key: string) => any;
  getOracleStatus: (key: string) => any;
}

export const OraclePoolStateV2Actions: OraclePoolStateV2Actions = {
  getPoolInfo(key: string) {
    return (dispatch: any) =>
      OraclePoolStateV2Service.getPoolInfo(dispatch, key);
  },
  getPoolStatus(key: string) {
    return (dispatch: any) =>
      OraclePoolStateV2Service.getPoolStatus(dispatch, key);
  },
  getOracleInfo(key: string) {
    return (dispatch: any) =>
      OraclePoolStateV2Service.getOracleInfo(dispatch, key);
  },
  getOracleStatus(key: string) {
    return (dispatch: any) =>
      OraclePoolStateV2Service.getOracleStatus(dispatch, key);
  },
};
