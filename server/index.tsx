import * as express from 'express';
import * as fs from 'fs';
import * as proxy from 'http-proxy-middleware';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

import { serverHtml } from './server.html';

import { App } from './app.server';

import '../client/src/config/axios.config';

import { DataPage } from './pages/data.page';
import { StatsPage } from './pages/stats.page';
import { Preloader } from './preloader';
import { ChartPage } from './pages/charts.page';

const port = process.env.PORT || 5000;

const server = express();

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

server.use('*', Preloader);

server.use('/', DataPage);
server.use('/stats', StatsPage);
server.use('/charts', ChartPage);

server.get('*', (req: any, res) => {
  const context: any = {};
  
  const body = renderToString(
    (
      <App location={ req.url }
           context={ context }
           preloadedState={ req.explorer.preloadedState }/>
    )
  );
  
  const htmlToRender = serverHtml({
    assets: manifest.assets,
    body,
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

server.listen(port, () => console.debug(`App is listening on port ${port}!`));
