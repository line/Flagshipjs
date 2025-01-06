#!/bin/sh

echo "//npm.linecorp.com/:_authToken=$PRIVATE_NPM_TOKEN" >> .npmrc
npm publish --registry=https://npm.linecorp.com
