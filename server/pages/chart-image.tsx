import * as express from 'express';
import * as fs from 'fs-extra';
import puppeteer from 'puppeteer';
import * as util from 'util';

import environment from '../../client/src/config/environment';

export const ChartImage = express.Router();

const cacheRoot = fs.realpathSync(process.cwd()) + '/tmp/cache/';
fs.ensureDirSync(cacheRoot);

export const generateImages = () => {
  const chartTypes = [
    'total',
    'blockchain-size',
    'block-size',
    'transactions-per-block',
    'hash-rate',
    'hash-rate-distribution',
    'difficulty',
    'miners-revenue'
  ];
  
  let appUrl = 'http://0.0.0.0:' + 5000;
  
  if (process.env.NODE_ENV === 'production' && environment.environments) {
    appUrl = environment.environments[0].url;
  }
  
  chartTypes.forEach(async (chartType) => {
    const filename = cacheRoot + chartType;
    
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--headless', '--disable-gpu'],
      executablePath: process.env.CHROME_BIN || undefined
    });
    
    const page = await browser.newPage();
    
    await page.setViewport({
      height: 600,
      width: 960
    });
    
    await page.goto(appUrl + '/charts/' + chartType + '?iframe=1');
    
    await page.waitFor(2000);
    await page.screenshot({ path: filename, type: 'jpeg' });
    
    await browser.close();
  });
};


ChartImage.get('/:chartType', (req, res) => {
  const filename = cacheRoot + req.params.chartType;
  
  if (fs.existsSync(filename)) {
    const stats = fs.statSync(filename);
    const mtime = new Date(util.inspect(stats.mtime)).getTime();
    
    // Random caching for images, increase cache time randomly from 1 to 100 sec
    if ((new Date()).getTime() - mtime < 60 * 60 * 1000 + Math.random() * 100 * 1000) {
      return res.sendFile(filename);
    }
  }
  
  res.status(404)
    .send('Not found');
});
