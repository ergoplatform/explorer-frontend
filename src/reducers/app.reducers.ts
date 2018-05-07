import { combineReducers } from 'redux';

import { AppState } from '../store/app.store';
import { blocksReducer } from './blocks.reducer';
import { settingsReducer } from './settings.reducer';
import { statsReducer } from './stats.reducer';

export const reducer = combineReducers<AppState>({
  blocks: blocksReducer,
  settings: settingsReducer,
  stats: statsReducer
});
