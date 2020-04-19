import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import environment from '../config/environment';

import { reducer } from '../reducers/app.reducers';

import { AddressState } from '../reducers/address.reducer';
import { ApiState } from '../reducers/api.reducer';
import { BlockState } from '../reducers/block.reducer';
import { BlocksState } from '../reducers/blocks.reducer';
import { ChartState } from '../reducers/chart.reducer';
import { SearchState } from '../reducers/search.reducer';
import { SettingsState } from '../reducers/settings.reducer';
import { StatsState } from '../reducers/stats.reducer';
import { TransactionState } from '../reducers/transaction.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface AppState {
  address: AddressState;
  api: ApiState;
  block: BlockState;
  chart: ChartState;
  settings: SettingsState;
  stats: StatsState;
  blocks: BlocksState;
  transaction: TransactionState;
  search: SearchState;
  struct: Record<string, any>;
}

const logger = createLogger({
  predicate: () => environment.isLoggerEnabled,
});

export const configureStore = (preloadedState: any = {}) => {
  return createStore<AppState, any, any, any>(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );
};
