import * as fs from 'fs-extra';

export const chartsRoot = fs.realpathSync(process.cwd()) + '/client/src/assets/images/charts';
fs.ensureDirSync(chartsRoot);
