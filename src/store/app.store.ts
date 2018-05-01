import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import { reducer } from '../reducers/app.reducers';

const logger = createLogger();

export const AppStore = createStore(reducer, applyMiddleware(logger));
