#!/bin/bash

set -ex

npm run test  -- --coverage && bash <(curl -s https://codecov.io/bash)
npm i codacy-coverage -g
cat ./coverage/lcov.info | codacy-coverage -t ${CODACY_ACCOUNT_TOKEN}
