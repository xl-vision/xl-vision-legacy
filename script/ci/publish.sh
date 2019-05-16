#!/bin/bash

#update package.json version

tag = ${TRAVIS_TAG}

echo "the tag is ${tag}"

sed -i -r 's/("version": ").*"/\1'${tag}'"/' ../../package.json

npm --registry=//registry.npmjs.org/:_authToken=${NPM_TOKEN}

npm publish

#commit to github

git config user.name "Rhys Xia"
git config user.email "xrs4433@outlook.com"
git add ./package.json
# no need for hook
git commit --no-verify -m":bookmark:Update version"
git push "https://${GITHUB_TOKEN}@github.com/xl-vision/xl-vision.git"

#update site
cd docs
git init
git add ./*
git commit --no-verify -m":memo:Update docs site"
git push "https://${GITHUB_TOKEN}@github.com/xl-vision/xl-vision.git" master:gh-pages

