const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath) => {
  return path.resolve(appDirectory, relativePath);
};

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolvePath('package.json')).homepage,
  process.env.PUBLIC_URL
);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  appTsConfig: resolvePath('tsconfig.json'),
  apiSpec: resolvePath('api.yaml'),
  appEsLint: resolvePath('.eslintrc.json'),
  dotenv: resolvePath('.env'),
  appPath: resolvePath('.'),
  nodeModules: resolvePath('node_modules'),
  yarnLockFile: resolvePath('yarn.lock'),
  packageJson: resolvePath('package.json'),
  client: {
    build: resolvePath('build'),
    public: resolvePath('client/public'),
    html: resolvePath('client/public/index.html'),
    root: resolveModule(resolvePath, 'client/src/index'),
    src: resolvePath('client/src'),
    styles: resolvePath('client/src/assets/styles'),
    publicUrl: publicUrlOrPath,
    servedPath: publicUrlOrPath,
  },
  server: {
    build: resolvePath('build/server'),
    root: resolveModule(resolvePath, 'server/index'),
    src: resolvePath('server'),
  },
  publicUrlOrPath,
};

module.exports.moduleFileExtensions = moduleFileExtensions;
