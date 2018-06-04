import * as express from 'express';
import * as fs from 'fs';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { html } from './html';

import { App } from './app.server';

const port = 3000;

const server = express();

const path = fs.realpathSync(process.cwd());

server.use(express.static(path + '/build'));

const manifest = {
  assets: require(`../../build/asset-manifest.json`)
};

server.get('*', (req: any, res) => {
  console.debug(req.url);
  
  const context = {};
  
  res.send(html({
    assets: manifest.assets,
    body: renderToString(<App location={ { pathname: req.url } } context={context}/>)
  }));
});


server.listen(port, () => console.debug('Example app listening on port 3000!'));
