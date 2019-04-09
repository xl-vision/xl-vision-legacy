module.exports = {
    preset: 'ts-jest',
    // testEnvironment: 'node',
    setupFiles: [
        "./script/test/setup.js"
    ],
    testMatch: [
        "**/src/**/test/*.ts?(x)"
    ],
    // collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/doc/**',
        '!src/**/test/**',
        '!src/icon/icons/**'
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer',
    ],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            diagnostics: true
        }
    },
    testURL: 'http://localhost',
};