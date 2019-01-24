module.exports = {
    preset: 'ts-jest',
    // testEnvironment: 'node',
    setupFiles: [
        "./script/test/setup.js"
    ],
    testMatch: [
        "**/src/components/**/test/index.ts?(x)"
    ],
    // collectCoverage: true,
    collectCoverageFrom: [
        'src/components/**/*.{ts,tsx}',
        '!src/components/**/test/*.{ts,tsx}',
        '!src/components/**/doc/*.{ts,tsx}',
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer',
    ],
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.test.json',
            diagnostics: true
        }
    },
    testURL: 'http://localhost',
};