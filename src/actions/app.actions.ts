import { Action, Dispatch } from 'redux';

export const CLEAR_APP_PRELOADED_STATE = 'app/preloaded-state/clear';

export interface AppActions {
  clearPreloadedState(): void;
}

export const AppActions: any = {
  clearPreloadedState(): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: CLEAR_APP_PRELOADED_STATE,
      });
    };
  },
};
