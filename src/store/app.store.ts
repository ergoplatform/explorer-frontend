import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { reducer } from '../reducers/app.reducers';

import { AddressState } from '../reducers/address.reducer';
import { BlockState } from '../reducers/block.reducer';
import { BlocksState } from '../reducers/blocks.reducer';
import { SettingsState } from '../reducers/settings.reducer';
import { StatsState } from '../reducers/stats.reducer';

export interface AppState {
  address: AddressState;
  block: BlockState;
  settings: SettingsState;
  stats: StatsState;
  blocks: BlocksState;
}

const logger = createLogger();

export const AppStore = createStore<AppState>(reducer, applyMiddleware(thunk, logger));
