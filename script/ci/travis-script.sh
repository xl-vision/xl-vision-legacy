#!/bin/bash

set -x
set -e

npm run test --coverage
bash <(curl -s https://codecov.io/bash)
