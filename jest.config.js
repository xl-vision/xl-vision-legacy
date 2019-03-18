const tsConfig = require('@xl-vision/xl-vision-scripts/lib/config/tsConfig')
tsConfig.jsx = 'react'
module.exports = {
    preset: 'ts-jest',
    // testEnvironment: 'node',
    setupFiles: [
        "./script/test/setup.js"
    ],
    testMatch: [
        "**/src/scripts/**/test/index.ts?(x)"
    ],
    // collectCoverage: true,
    collectCoverageFrom: [
        'src/scripts/**/*.{ts,tsx}',
        '!src/scripts/**/test/*.{ts,tsx}',
        '!src/scripts/**/doc/*.{ts,tsx}',
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer',
    ],
    globals: {
        'ts-jest': {
            tsConfig,
            diagnostics: true
        }
    },
    testURL: 'http://localhost',
};