import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import { SET_LOCALE, SET_SIDEBAR_IS_COLLAPSED } from '../constants/settings.types';


export interface SettingsActions extends ActionCreatorsMapObject {
  setLocale: (localeId: string) => any;
  setSidebarCollapsedStatus: (isCollapsed: boolean) => any;
}

export const SettingsActions: SettingsActions = {
  setLocale (localeId: string): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        payload: {
          locale: localeId
        },
        type: SET_LOCALE
      });
    };
  },
  
  setSidebarCollapsedStatus (isCollapsed: boolean): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        payload: {
          isSidebarCollapsed: isCollapsed
        },
        type: SET_SIDEBAR_IS_COLLAPSED
      });
    };
  }
};
