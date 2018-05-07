import { combineReducers } from 'redux';

import { AppState } from '../store/app.store';
import { settingsReducer } from './settings.reducer';
import { statsReducer } from './stats.reducer';

export const reducer = combineReducers<AppState>({
  settings: settingsReducer,
  stats: statsReducer,
});
