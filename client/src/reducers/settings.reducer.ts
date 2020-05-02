import environment from '../config/environment';

import {
  SET_LOCALE,
  SET_SIDEBAR_IS_COLLAPSED,
  SET_SIDEBAR_IS_HIDDEN,
  SET_SIDEBAR_IS_SHOWN,
  SET_TRANSACTION_SCRIPTS_HIDDEN,
  SET_TRANSACTION_SCRIPTS_SHOWN,
} from '../constants/settings.types';

export interface SettingsState {
  locale?: string;
  isSidebarCollapsed?: boolean;
  isSidebarDisplayed?: boolean;
  isScriptsDisplayed?: boolean;
}

const initialState = {
  isScriptsDisplayed: false,
  isSidebarCollapsed: false,
  isSidebarDisplayed: false,
  locale: environment.defaultLocale,
};

export function settingsReducer(
  state: SettingsState = initialState,
  action: any
): SettingsState {
  switch (action.type) {
    case SET_LOCALE: {
      const newState = {
        ...state,
        locale: action.payload.locale,
      };

      // TODO: move to service
      localStorage.setItem('settings', JSON.stringify(newState));

      return newState;
    }

    case SET_SIDEBAR_IS_COLLAPSED: {
      const newState = {
        ...state,
        isSidebarCollapsed: action.payload.isSidebarCollapsed,
      };

      // TODO: move to service
      localStorage.setItem('settings', JSON.stringify(newState));

      return newState;
    }

    case SET_TRANSACTION_SCRIPTS_SHOWN: {
      const newState = {
        ...state,
        isScriptsDisplayed: true,
      };

      // TODO: move to service
      localStorage.setItem('settings', JSON.stringify(newState));

      return newState;
    }

    case SET_TRANSACTION_SCRIPTS_HIDDEN: {
      const newState = {
        ...state,
        isScriptsDisplayed: false,
      };

      // TODO: move to service
      localStorage.setItem('settings', JSON.stringify(newState));

      return newState;
    }

    case SET_SIDEBAR_IS_SHOWN: {
      return { ...state, isSidebarDisplayed: true };
    }

    case SET_SIDEBAR_IS_HIDDEN: {
      return { ...state, isSidebarDisplayed: false };
    }

    default:
      return { ...state };
  }
}
