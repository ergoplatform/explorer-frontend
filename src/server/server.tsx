import * as express from 'express';
import * as fs from 'fs';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

import { serverHtml } from './server.html';

import { App } from './app.server';

import '../config/axios.config';

import { DataPage } from './pages/data.page';
import { StatsPage } from './pages/stats.page';
import { Preloader } from './preloader';

const port = 3000;

const server  = express();
const appPath = fs.realpathSync(process.cwd());

server.use(express.static(appPath + '/build'));

const manifest = {
  assets: require(`../../build/asset-manifest.json`)
};

server.use((req: any, res, next) => {
  req.explorer = {
    preloadedState: {}
  };
  
  next();
});

server.use('*', Preloader);

server.use('/', DataPage);
server.use('/stats', StatsPage);

server.get('*', (req: any, res) => {
  const context: any        = {};
  
  const body = renderToString(<App location={ req.url } context={ context } preloadedState={ req.explorer.preloadedState }/>);
  
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
