import { combineReducers } from 'redux';

import { AppState } from '../store/app.store';
import { addressReducer } from './address.reducer';
import { blockReducer } from './block.reducer';
import { blocksReducer } from './blocks.reducer';
import { chartReducer } from './chart.reducer';
import { settingsReducer } from './settings.reducer';
import { statsReducer } from './stats.reducer';
import { transactionReducer } from './transaction.reducer';

export const reducer = combineReducers<AppState>({
  address: addressReducer,
  block: blockReducer,
  blocks: blocksReducer,
  chart: chartReducer,
  settings: settingsReducer,
  stats: statsReducer,
  transaction: transactionReducer,
});
