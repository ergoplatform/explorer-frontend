import environment from '../config/environment';

import { SET_LOCALE } from '../constants/settings.types';

export interface SettingsState {
  locale: string;
}

let settings = JSON.parse(localStorage.getItem('settings') as string);

if (!settings) {
  settings = {
    locale: environment.defaultLocale
  };
}

const initialState = {
  ...settings
};

export function settingsReducer (state: SettingsState = initialState, action: any): SettingsState {
  switch (action.type) {
    case SET_LOCALE: {
      const newState = { ...state, locale: action.payload.locale };
      
      // TODO: move to service
      localStorage.setItem('settings', JSON.stringify(newState));
      
      return newState;
    }
    default:
      return { ...state };
  }
}
