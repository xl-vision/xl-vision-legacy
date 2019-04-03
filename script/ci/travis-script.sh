#!/bin/bash

set -x
set -e
npm run tslint
npm run compile
npm run dist

if [ "${TRAVIS_PULL_REQUEST}" = "true" ]; then
    npm run test
else
    npm run test -- --collectCoverage
    bash <(curl -s https://codecov.io/bash)
fi
