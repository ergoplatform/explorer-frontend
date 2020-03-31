import axios from 'axios';
import compression from 'compression';
import consoleStamp from 'console-stamp';
import express from 'express';
import fs from 'fs';
import proxy from 'http-proxy-middleware';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

import { serverHtml } from './server.html';

import { App } from './app.server';

import { AddressPage } from './pages/address.page';
import { BlockPage } from './pages/block.page';
import { ChartPage } from './pages/charts.page';
import { DataPage } from './pages/data.page';
import { SearchPage } from './pages/search.page';
import { StatsPage } from './pages/stats.page';
import { TransactionPage } from './pages/transaction.page';
import { Preloader } from './preloader';
import { OrderBookPage } from './pages/order-book.page';
import { IssuedTokenPage } from './pages/issued-token.page';

axios.defaults.timeout = 10 * 1000;

consoleStamp(console, 'dd/mm/yyyy HH:MM:ss.l');

const port = process.env.PORT || 5000;

const server = express();

server.use(compression());

let manifest = {
  assets: {
    'main.css': 'static/css/main.css',
    'main.js': 'static/js/bundle.js',
  },
};

const appPath = fs.realpathSync(process.cwd());

if (process.env.NODE_ENV === 'production') {
  manifest = {
    assets: require(`../build/client/asset-manifest.json`),
  };

  server.use('/static', express.static(appPath + '/build/client/static'));
  server.use(
    '/favicon.png',
    express.static(appPath + '/build/client/favicon.png')
  );
  server.use(
    '/app.config.js',
    express.static(appPath + '/build/client/app.config.js')
  );
  server.use(
    '/manifest.json',
    express.static(appPath + '/build/client/manifest.json')
  );
} else {
  server.use(
    '/static/css',
    express.static(appPath + '/build/server/static/css')
  );
  server.use(
    '/static/media',
    express.static(appPath + '/build/server/static/media')
  );
  server.use(
    ['/*.(js|json|png)(.map)?', '/static'],
    proxy({ target: 'http://localhost:3000' })
  );
}

server.use(
  '/charts/images/total.jpeg',
  express.static(appPath + '/build/client/charts/total.jpeg')
);
server.use(
  '/charts/images/block-size.jpeg',
  express.static(appPath + '/build/client/charts/block-size.jpeg')
);
server.use(
  '/charts/images/blockchain-size.jpeg',
  express.static(appPath + '/build/client/charts/blockchain-size.jpeg')
);
server.use(
  '/charts/images/difficulty.jpeg',
  express.static(appPath + '/build/client/charts/difficulty.jpeg')
);
server.use(
  '/charts/images/hash-rate-distribution.jpeg',
  express.static(appPath + '/build/client/charts/hash-rate-distribution.jpeg')
);
server.use(
  '/charts/images/hash-rate.jpeg',
  express.static(appPath + '/build/client/charts/hash-rate.jpeg')
);
server.use(
  '/charts/images/miners-revenue.jpeg',
  express.static(appPath + '/build/client/charts/miners-revenue.jpeg')
);
server.use(
  '/charts/images/transactions-per-block.jpeg',
  express.static(appPath + '/build/client/charts/transactions-per-block.jpeg')
);

server.use((req: any, res, next) => {
  req.explorer = {
    preloadedState: {},
  };

  next();
});

server.use('/:locale?/search', SearchPage);

server.use((req: any, res, next) => {
  axios.interceptors.response.use(
    response => response,
    () => {
      if (!req.explorer.skipError) {
        req.explorer.hasError = true;
      }
    }
  );

  next();
});

server.use('*', Preloader);

server.use('/:locale?', DataPage);
server.use('/:locale?/stats', StatsPage);
server.use('/:locale?/charts', ChartPage);
server.use('/:locale?/blocks', BlockPage);
server.use('/:locale?/transactions', TransactionPage);
server.use('/:locale?/addresses', AddressPage);
server.use('/:locale?/order-book', OrderBookPage);
server.use('/:locale?/issued-token', IssuedTokenPage);

server.get('*', (req: any, res) => {
  const context: any = {};

  const body = renderToString(
    <App
      location={req.url}
      context={context}
      hasError={req.explorer.hasError}
      preloadedState={req.explorer.preloadedState}
    />
  );

  const helmet = Helmet.renderStatic();

  const htmlToRender = serverHtml({
    assets: manifest.assets,
    body,
    hasError: req.explorer.hasError,
    helmet,
    preloadedState: req.explorer.preloadedState,
    spriteContent: sprite.stringify(),
  });

  if (context.url) {
    res.writeHead(302, {
      Location: context.url,
    });

    res.end();
  } else {
    res.write(htmlToRender);
    res.end();
  }
});

server.listen(port, () => {
  console.info(`App is listening on port ${port}!`);
});
