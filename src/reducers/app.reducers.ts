import { combineReducers } from 'redux';

import { AppState } from '../store/app.store';
import { blockReducer } from './block.reducer';
import { blocksReducer } from './blocks.reducer';
import { settingsReducer } from './settings.reducer';
import { statsReducer } from './stats.reducer';

export const reducer = combineReducers<AppState>({
  block: blockReducer,
  blocks: blocksReducer,
  settings: settingsReducer,
  stats: statsReducer
});
