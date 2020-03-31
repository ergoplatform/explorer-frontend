import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import './assets/styles/main.scss';

import './config/axios.config';

import { enableTabMode } from './utils/enableTabMode';

import { App } from './app';

const rootElement = document.getElementById('root') as HTMLElement;

let renderMethod = ReactDOM.render;

if (document.body.classList.contains('ssr')) {
  renderMethod = ReactDOM.hydrate;

  document.body.classList.remove('ssr');
}

ReactModal.setAppElement(rootElement);

renderMethod(
  <App/>, rootElement
);

enableTabMode();
