#!/bin/bash

set -x
set -e
npm run tslint
npm run compile
npm run dist
npm run test -- --coverage
bash <(curl -s https://codecov.io/bash)
