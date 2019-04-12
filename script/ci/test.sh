#!/bin/bash

set -ex

npm run test  -- --coverage && bash <(curl -s https://codecov.io/bash) && npm run codacy-coverage -- -t ${CODACY_ACCOUNT_TOKEN}
