import { combineReducers } from 'redux';

import { AppState } from '../store/app.store';
import { settingsReducer } from './settings.reducer';

export const reducer = combineReducers<AppState>({
  settings: settingsReducer
});
