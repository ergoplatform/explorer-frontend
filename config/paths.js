const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => {
  return path.resolve(appDirectory, relativePath);
};

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  }
  if (!hasSlash && needsSlash) {
    return `${path}/`;
  }
  return path;
}

const getPublicUrl = packageJson =>
  envPublicUrl || require(packageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(packageJson) {
  const publicUrl = getPublicUrl(packageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

module.exports = {
  appTsConfig: resolvePath('tsconfig.json'),
  apiSpec: resolvePath('api.yaml'),
  appEsLint: resolvePath('.eslintrc.json'),
  dotenv: resolvePath('.env'),
  nodeModules: resolvePath('node_modules'),
  yarnLockFile: resolvePath('yarn.lock'),
  packageJson: resolvePath('package.json'),
  client: {
    build: resolvePath('build/client'),
    public: resolvePath('client/public'),
    html: resolvePath('client/public/index.html'),
    root: resolvePath('client/src/index.tsx'),
    src: resolvePath('client/src'),
    styles: resolvePath('client/src/assets/styles'),
    publicUrl: getPublicUrl(resolvePath('package.json')),
    servedPath: getServedPath(resolvePath('package.json')),
  },
  server: {
    build: resolvePath('build/server'),
    root: resolvePath('server/index.tsx'),
    src: resolvePath('server'),
  },
};
