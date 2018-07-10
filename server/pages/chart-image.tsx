import * as express from 'express';
import fs from 'fs';
import puppeteer from 'puppeteer';
import * as util from 'util';
import environment from '../../client/src/config/environment';

export const ChartImage = express.Router();

ChartImage.get('/:chartType', async (req, res) => {
  // TODO: replace with nginx caching
  const cacheRoot = '/var/cache/explorer/';
  const filename = cacheRoot + req.params.chartType;
  
  if (!fs.existsSync(cacheRoot)) {
    fs.mkdirSync(cacheRoot);
  }
  
  
  if (fs.existsSync(filename)) {
    const stats = fs.statSync(filename);
    const mtime = new Date(util.inspect(stats.mtime)).getTime();
    
    if ((new Date()).getTime() - mtime < 60 * 60 * 1000 ) {
      return res.sendFile(filename);
    }
  }
  
  
  if (environment.environments) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--headless', '--disable-gpu'],
      executablePath: process.env.CHROME_BIN || undefined
    });
    
    const page = await browser.newPage();
    
    await page.setViewport({
      height: 600,
      width: 960
    });
    
    await page.goto(environment.environments[0].url + '/charts/' + req.params.chartType + '?iframe=1');
    
    
    await page.waitFor(2000);
    await page.screenshot({ path:filename, type: 'jpeg' });
    
    await browser.close();
    
    res.setHeader('Expires', new Date(Date.now() + 60 * 60 * 60).toUTCString());
    res.sendFile(filename, { headers: { 'Content-Type': 'image/jpeg' } });
  } else {
    res.sendFile('../../empty-photo.jpg', { headers: { 'Content-Type': 'image/jpeg' } });
  }
});
