[![Build Status](https://travis-ci.org/ergoplatform/ergo-explorer.svg?branch=master)](https://travis-ci.org/ergoplatform/ergo-explorer)
[![Codecov](https://img.shields.io/codecov/c/github/ergoplatform/ergo-explorer.svg)](https://codecov.io/gh/ergoplatform/ergo-explorer)
[![Docker Hub](https://img.shields.io/docker/build/ergoplatform/ergo-explorer.svg)](https://hub.docker.com/r/ergoplatform/ergo-explorer/builds/)

This repository contains browser for viewing activity on the underlying blockchain network.

## Code style

### TypeScript

For typescript code style standards we use [TSLint](https://palantir.github.io/tslint/)

### CSS

We use [CSS Comb](http://csscomb.com) to format SCSS code in project.

To have it in JetBrains WebStorm follow next instructions

1. Go to Preferences > External Tools (or press ⌘, on Mac)
1. Click on Add icon (or press ⌘N on Mac)
1. Fill the form with following info:
    * Name: CSS Comb
    * Program: `$ProjectFileDir$/node_modules/.bin/csscomb`
    * Parameters: `$FilePath$ -t`
    * Working directory: `$FileDir$`

## Translations

In order to translate project files use [i18n-editor](https://github.com/jcbvm/i18n-editor/releases).
Download latest stable release and open Project located in `client/src/locales`
