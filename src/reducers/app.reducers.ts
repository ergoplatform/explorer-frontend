import { combineReducers } from 'redux';
import { reducer as struct } from 'redux-struct';

import { AppState } from '../store/app.store';
import { addressReducer } from './address.reducer';
import { blockReducer } from './block.reducer';
import { blocksReducer } from './blocks.reducer';
import { chartReducer } from './chart.reducer';
import { searchReducer } from './search.reducer';
import { settingsReducer } from './settings.reducer';
import { statsReducer } from './stats.reducer';
import { transactionReducer } from './transaction.reducer';
import { tokensReducer } from './tokens.reducer';
import { unconfirmedTransactionsReducer } from './unconfirmedTransactions.reducer';

export const reducer = combineReducers<AppState>({
  address: addressReducer,
  block: blockReducer,
  blocks: blocksReducer,
  chart: chartReducer,
  search: searchReducer,
  settings: settingsReducer,
  stats: statsReducer,
  transaction: transactionReducer,
  tokens: tokensReducer,
  unconfirmedTransactions: unconfirmedTransactionsReducer,
  struct,
});
