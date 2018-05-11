import environment from '../config/environment';

import { SET_BLOCKS_LIMIT, SET_LOCALE, SET_SIDEBAR_IS_COLLAPSED } from '../constants/settings.types';

export interface SettingsState {
  locale: string;
  isSidebarCollapsed: boolean;
  blocksLimit: number;
}

const settings = JSON.parse(localStorage.getItem('settings') as string) || {};

const initialState = {
  blocksLimit: 30,
  isSidebarCollapsed: false,
  locale: environment.defaultLocale,
  ...settings
};

export function settingsReducer (state: SettingsState = initialState, action: any): SettingsState {
  switch (action.type) {
    case SET_LOCALE: {
      const newState = {
        ...state,
        locale: action.payload.locale
      };
      
      // TODO: move to service
      localStorage.setItem('settings', JSON.stringify(newState));
      
      return newState;
    }
    
    case SET_SIDEBAR_IS_COLLAPSED: {
      const newState = {
        ...state,
        isSidebarCollapsed: action.payload.isSidebarCollapsed
      };
      
      // TODO: move to service
      localStorage.setItem('settings', JSON.stringify(newState));
      
      return newState;
    }
    
    case SET_BLOCKS_LIMIT: {
      const newState = {
        ...state,
        blocksLimit: action.payload.blocksLimit
      };
      
      // TODO: move to service
      localStorage.setItem('settings', JSON.stringify(newState));
      
      return newState;
    }
    
    default:
      return { ...state };
  }
}
