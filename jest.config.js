module.exports = {
    preset: 'ts-jest',
    // testEnvironment: 'node',
    setupFiles: [
        "./script/test/setup.js"
    ],
    testMatch: [
        "**/src/scripts/**/_test/index.ts?(x)"
    ],
    // collectCoverage: true,
    collectCoverageFrom: [
        'src/scripts/**/*.{ts,tsx}',
        '!src/scripts/**/_*/**',
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer',
    ],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.test.json',
            diagnostics: true
        }
    },
    testURL: 'http://localhost',
};