import * as storage from 'universal-localstorage';
import environment from '../config/environment';

import {
  SET_LOCALE,
  SET_SIDEBAR_IS_COLLAPSED, SET_SIDEBAR_IS_HIDDEN,
  SET_SIDEBAR_IS_SHOWN
} from '../constants/settings.types';

export interface SettingsState {
  locale: string;
  isSidebarCollapsed: boolean;
  isSidebarDisplayed: boolean;
  blocksLimit: number;
}

const settings = JSON.parse(storage.getItem('settings') as string) || {};

const initialState = {
  isSidebarCollapsed: false,
  locale: environment.defaultLocale,
  ...settings,
  isSidebarDisplayed: false,
};

export function settingsReducer (state: SettingsState = initialState, action: any): SettingsState {
  switch (action.type) {
    case SET_LOCALE: {
      const newState = {
        ...state,
        locale: action.payload.locale
      };
      
      // TODO: move to service
      storage.setItem('settings', JSON.stringify(newState));
      
      return newState;
    }
    
    case SET_SIDEBAR_IS_COLLAPSED: {
      const newState = {
        ...state,
        isSidebarCollapsed: action.payload.isSidebarCollapsed
      };
      
      // TODO: move to service
      storage.setItem('settings', JSON.stringify(newState));
      
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
