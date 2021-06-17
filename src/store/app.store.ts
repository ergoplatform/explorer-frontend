import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import environment from '../config/environment';

import { reducer } from '../reducers/app.reducers';

import { AddressState } from '../reducers/address.reducer';
import { BlockState } from '../reducers/block.reducer';
import { BlocksState } from '../reducers/blocks.reducer';
import { ChartState } from '../reducers/chart.reducer';
import { SearchState } from '../reducers/search.reducer';
import { SettingsState } from '../reducers/settings.reducer';
import { StatsState } from '../reducers/stats.reducer';
import { TransactionState } from '../reducers/transaction.reducer';
import { TokensState } from '../reducers/tokens.reducer';
import { UnconfirmedTransactions } from '../reducers/unconfirmedTransactions.reducer';

export interface AppState {
  address: AddressState;
  block: BlockState;
  chart: ChartState;
  settings: SettingsState;
  stats: StatsState;
  blocks: BlocksState;
  transaction: TransactionState;
  search: SearchState;
  struct: Record<string, any>;
  tokens: TokensState;
  unconfirmedTransactions: UnconfirmedTransactions;
}

let middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    predicate: () => environment.isLoggerEnabled,
  });

  middlewares = [...middlewares, logger];
}

export const configureStore = (preloadedState: any = {}) => {
  return createStore<AppState, any, any, any>(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};
