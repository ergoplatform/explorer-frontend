#!/bin/bash

git chechout master

git pull origin master

rm -rf /build

yarn build

git add .

git commit -m 'update testnet build'

git push origin master
