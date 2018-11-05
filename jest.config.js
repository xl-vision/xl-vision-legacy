module.exports = {
    preset: 'ts-jest',
    // testEnvironment: 'node',
    setupFiles: [
        "./test/setup.js"
    ],
    testMatch: [
        "**/src/components/*/test/index.ts?(x)"
    ],
    // collectCoverage: true,
    collectCoverageFrom: [
        'src/components/**/*.{ts,tsx}',
        '!src/components/**/test/*.{ts,tsx}',
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer',
    ],
    globals: {
        'ts-jest': {
            tsConfig:'./tsconfig.json',
            diagnostics: true
        }
    }
};