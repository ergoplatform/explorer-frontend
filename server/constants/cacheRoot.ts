import * as fs from 'fs-extra';

export const cacheRoot = fs.realpathSync(process.cwd()) + '/tmp/cache/';
fs.ensureDirSync(cacheRoot);
