import axios from 'axios';
import * as compression from 'compression';
import * as express from 'express';
import * as fs from 'fs';
import * as proxy from 'http-proxy-middleware';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

import { serverHtml } from './server.html';

import { App, Error } from './app.server';

import '../client/src/config/axios.config';

import { AddressPage } from './pages/address.page';
import { BlockPage } from './pages/block.page';
import { ChartImage, generateImages } from './pages/chart-image';
import { ChartPage } from './pages/charts.page';
import { DataPage } from './pages/data.page';
import { SearchPage } from './pages/search.page';
import { StatsPage } from './pages/stats.page';
import { TransactionPage } from './pages/transaction.page';
import { Preloader } from './preloader';

const port = process.env.PORT || 5000;

const server = express();

server.use(compression());

let manifest = {
  assets: {
    'main.css': 'static/css/main.css',
    'main.js': 'static/js/bundle.js'
  }
};

const appPath = fs.realpathSync(process.cwd());

if (process.env.NODE_ENV === 'production') {
  manifest = {
    assets: require(`../build/client/asset-manifest.json`)
  };
  
  server.use('/static', express.static(appPath + '/build/client/static'));
  server.use('/favicon.png', express.static(appPath + '/build/client/favicon.png'));
  server.use('/app.config.js', express.static(appPath + '/build/client/app.config.js'));
  server.use('/manifest.json', express.static(appPath + '/build/client/manifest.json'));
} else {
  server.use('/static/css', express.static(appPath + '/build/server/static/css'));
  server.use('/static/media', express.static(appPath + '/build/server/static/media'));
  server.use(['/*\.(js|json|png)(\.map)?', '/static'], proxy({ target: 'http://localhost:3000' }));
}


server.use((req: any, res, next) => {
  req.explorer = {
    preloadedState: {}
  };
  
  next();
});

server.use('/:locale?/search', SearchPage);

server.use((req: any, res, next) => {
  axios.interceptors.response.use(response => response, () => {
    if (req.explorer.skipError) {
      return;
    }
    
    return res.redirect('/server-error');
  });
  
  next();
});

server.use('/:locale?/server-error', (req: any, res) => {
  const context: any = {};
  
  const body = renderToString(
    (
      <Error location={ req.url }
             context={ context }
             preloadedState={ req.explorer.preloadedState }/>
    )
  );
  
  const helmet = Helmet.renderStatic();
  
  const htmlToRender = serverHtml({
    assets: manifest.assets,
    body,
    helmet,
    preloadedState: req.explorer.preloadedState,
    spriteContent: sprite.stringify()
  });
  
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    
    res.end();
  } else {
    res.write(htmlToRender);
    res.end();
  }
});

server.use('*', Preloader);

server.use('/:locale?', DataPage);
server.use('/:locale?/stats', StatsPage);
server.use('/:locale?/charts', ChartPage);
server.use('/:locale?/blocks', BlockPage);
server.use('/:locale?/transactions', TransactionPage);
server.use('/:locale?/addresses', AddressPage);
server.use('/charts/images', ChartImage);


server.get('*', (req: any, res) => {
  const context: any = {};
  
  const body = renderToString(
    (
      <App location={ req.url }
           context={ context }
           preloadedState={ req.explorer.preloadedState }/>
    )
  );
  
  const helmet = Helmet.renderStatic();
  
  const htmlToRender = serverHtml({
    assets: manifest.assets,
    body,
    helmet,
    preloadedState: req.explorer.preloadedState,
    spriteContent: sprite.stringify()
  });
  
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    
    res.end();
  } else {
    res.write(htmlToRender);
    res.end();
  }
});

server.listen(port, () => {
  console.debug(`App is listening on port ${port}!`);
  
  generateImages();
  
  setInterval(() => {
    generateImages();
  }, 1000 * 60 * 10);
});

