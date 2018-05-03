[![Build Status](https://travis-ci.org/blockchaininstituteadmin/ergo-explorer.svg?branch=master)](https://travis-ci.org/blockchaininstituteadmin/ergo-explorer)

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
