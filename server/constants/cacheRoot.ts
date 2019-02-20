const fs = require('fs');

const cachePath = process.cwd() + '/tmp/cache/';


if (!fs.existsSync(cachePath)) {
  fs.mkdirSync(cachePath);
}

export const cacheRoot = cachePath;
