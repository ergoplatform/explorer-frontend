import * as express from 'express';
import * as fs from 'fs-extra';
import puppeteer from 'puppeteer';

import environment from '../../client/src/config/environment';

export const ChartImage = express.Router();

const cacheRoot = fs.realpathSync(process.cwd()) + '/tmp/cache/';
fs.ensureDirSync(cacheRoot);

export const generateImages = async () => {
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
  
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--headless', '--disable-gpu'],
    executablePath: process.env.CHROME_BIN || undefined
  });
  
  for (const chartType of chartTypes) {
    const filename = cacheRoot + chartType;
    
    const page = await browser.newPage();
    
    await page.setViewport({
      height: 600,
      width: 960
    });
    
    await page.goto(appUrl + '/charts/' + chartType + '?iframe=1');
    
    await page.waitFor(2000);
    await page.screenshot({ path: filename, type: 'jpeg' });
    
    await page.close();
  }
  
  await browser.close();
};

ChartImage.use('/', express.static(cacheRoot));
