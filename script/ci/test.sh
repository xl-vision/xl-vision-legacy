#!/bin/bash

set -ex

if [ "${TRAVIS_PULL_REQUEST}" = "true" ]; then
    npm run test
else
    npm run test -- --collectCoverage
    bash <(curl -s https://codecov.io/bash)
fi
