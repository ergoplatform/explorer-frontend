import * as fs from 'fs-extra';

export const cacheRoot = fs.realpathSync(process.cwd()) + '/client/src/assets/images/charts';
fs.ensureDirSync(cacheRoot);
