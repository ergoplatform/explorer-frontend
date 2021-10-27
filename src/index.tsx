import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import './assets/styles/main.scss';

import './config/axios.config';

import { enableTabMode } from './utils/enableTabMode';

import { App } from './app';

Sentry.init({
  dsn: 'https://8b21a07b87134c0e9774c924d30934e9@o445331.ingest.sentry.io/5421594',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const rootElement = document.getElementById('root') as HTMLElement;

ReactModal.setAppElement(rootElement);

ReactDOM.render(<App />, rootElement);

enableTabMode();
