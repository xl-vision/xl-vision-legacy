#!/bin/bash

set -ex

npm run test  -- --coverage
bash <(curl -s https://codecov.io/bash)
npm i codacy-codecov -g
cat ./coverage/lcov.info | codacy-coverage --token ${CODACY_PROJECT_TOKEN} --projectName xl-vision
