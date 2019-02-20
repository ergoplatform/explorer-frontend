import puppeteer from 'puppeteer';

import environment from '../../client/src/config/environment';
import { cacheRoot } from '../constants/cacheRoot';

let browser: any;

const generateImages = async () => {
  if (browser) {
    await browser.close();
  }
  
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
  
  browser = await puppeteer.launch({
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
  
  browser = null;
};

const IMAGE_GENERATION_TIMEOUT = 1000 * 60;

export const runImageGeneration = () => {
  console.info('[PROGRESS] Generating charts preview images...');
  
  generateImages()
    .then(() => {
      console.info('[SUCCESS] Charts preview generated!');
      
      setTimeout(() => {
        runImageGeneration();
      }, IMAGE_GENERATION_TIMEOUT * 10);
    })
    .catch((e) => {
      console.error('[FAILURE] Charts preview generation failed!');
      console.error(e);
      
      setTimeout(() => {
        runImageGeneration();
      }, IMAGE_GENERATION_TIMEOUT);
    });
};
