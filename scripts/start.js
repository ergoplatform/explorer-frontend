process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const config = require('../config/webpack.config.dev');
const fs = require('fs-extra');
const paths = require('../config/paths');

fs.emptyDirSync(paths.appBuild);
copyPublicFolder();

webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  }

  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

