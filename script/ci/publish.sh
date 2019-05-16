#!/bin/bash

#更新package的版本和tag一致

tag = ${TRAVIS_TAG}

echo "the tag is ${tag}"

sed -i -r 's/("version": ").*"/\1'${tag}'"/' ../../package.json

npm --registry=//registry.npmjs.org/:_authToken=${NPM_TOKEN}

npm publish

#提交更改到github

git config user.name "Rhys Xia"
git config user.email "xrs4433@outlook.com"
git add ./package.json
# 不再次调用钩子了
git commit --no-verify -m":bookmark:Update version"
git push "https://${GITHUB_TOKEN}@github.com/xl-vision/xl-vision.git"

#更新网站
cd docs
git init
git add ./*
git commit --no-verify -m":memo:Update docs site"
git push "https://${GITHUB_TOKEN}@github.com/xl-vision/xl-vision.git" master:gh-pages

