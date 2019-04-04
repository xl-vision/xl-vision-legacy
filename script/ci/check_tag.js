const {
    version
} = require('../../package.json')

const tag = process.env.TRAVIS_TAG

if (tag !== version) {
    throw new Error(`The tag '${tag}' does not equal to package version '${version}'`)
}