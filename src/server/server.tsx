import * as express from 'express';
import * as fs from 'fs';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

import { html } from './html';

import { App } from './app.server';

import '../config/axios.config';

import { BlockApiService } from '../services/block.api.service';

const port = 3000;

const server  = express();
const appPath = fs.realpathSync(process.cwd());

server.use(express.static(appPath + '/build'));

const manifest = {
  assets: require(`../../build/asset-manifest.json`)
};

server.get('*', (req: any, res) => {
  const context: any        = {};
  const preloadedState: any = {};
  // const promises            = [];
  //
  // if (req.url === '/blocks') {
  //   promises.push(BlockApiService.getBlocks({ limit: 30, offset: 0 }));
  // }
  
  BlockApiService.getBlocks({ limit: 30, offset: 0 })
    .then((response: any) => {
      console.debug(response.data.items[0]);
      
      preloadedState.blocks = {
        blocks: response.data.items,
        fetching: false,
        offset: 0,
        total: response.data.total
      };
      
      console.debug(preloadedState);
      
      const body = renderToString(<App location={ req.url } context={ context } preloadedState={ preloadedState }/>);
      
      const htmlToRender = html({
        assets: manifest.assets,
        body,
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
  
  
});


server.listen(port, () => console.debug(`App is listening on port ${port}!`));
