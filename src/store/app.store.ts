import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { reducer } from '../reducers/app.reducers';
import { SettingsState } from '../reducers/settings.reducer';

export interface AppState {
  settings: SettingsState;
}

const logger = createLogger();

export const AppStore = createStore<AppState>(reducer, applyMiddleware(thunk, logger));
