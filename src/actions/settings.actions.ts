import { Action, ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux';

import { SET_LOCALE, SET_SIDEBAR_IS_COLLAPSED } from '../constants/settings.types';

const setLocale = (localeId: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      payload: {
        locale: localeId
      },
      type: SET_LOCALE
    });
  };
};

const setSidebarCollapsedStatus = (isCollapsed: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      payload: {
        isSidebarCollapsed: isCollapsed
      },
      type: SET_SIDEBAR_IS_COLLAPSED
    });
  };
};

export interface SettingsActions extends ActionCreatorsMapObject {
  setLocale: ActionCreator<any>;
  setSidebarCollapsedStatus: ActionCreator<any>;
}

export const SettingsActions: SettingsActions = {
  setLocale,
  setSidebarCollapsedStatus,
};
