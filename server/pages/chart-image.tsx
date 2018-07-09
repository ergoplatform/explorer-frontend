import * as express from 'express';
import puppeteer from 'puppeteer';
import tmp from 'tmp';
import environment from '../../client/src/config/environment';

export const ChartImage = express.Router();

ChartImage.get('/:chartType', async (req, res) => {
  if (environment.environments) {
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    
    await page.setViewport({
      height: 600,
      width: 960
    });
    
    await page.goto(environment.environments[0].url + '/charts/' + req.params.chartType + '?iframe=1');
    
    const tmpPath = tmp.fileSync();
    
    await page.waitFor(1500);
    await page.screenshot({ path: tmpPath.name, type: 'jpeg' });
    
    await browser.close();
    
    
    res.setHeader('Expires', new Date(Date.now() + 60 * 60 * 60).toUTCString());
    res.sendFile(tmpPath.name, { headers: { 'Content-Type': 'image/jpeg' } });
  } else {
    res.sendFile('../../empty-photo.jpg', { headers: { 'Content-Type': 'image/jpeg' } });
  }
});
