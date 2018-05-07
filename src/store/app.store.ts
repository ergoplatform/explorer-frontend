import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { reducer } from '../reducers/app.reducers';
import { BlocksState } from '../reducers/blocks.reducer';
import { SettingsState } from '../reducers/settings.reducer';
import { StatsState } from '../reducers/stats.reducer';

export interface AppState {
  settings: SettingsState;
  stats: StatsState;
  blocks: BlocksState;
}

const logger = createLogger();

export const AppStore = createStore<AppState>(reducer, applyMiddleware(thunk, logger));
