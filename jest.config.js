module.exports = {
    preset: 'ts-jest',
    // testEnvironment: 'node',
    setupFiles: [
        "./script/test/setup.js"
    ],
    testMatch: [
        "**/src/package/**/_test/index.ts?(x)"
    ],
    // collectCoverage: true,
    collectCoverageFrom: [
        'src/package/**/*.{ts,tsx}',
        '!src/package/**/_*/**',
        '!src/package/icon/icons/**'
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