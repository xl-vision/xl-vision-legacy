module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        "**/src/components/*/test/index.ts?(x)"
    ],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            diagnostics: true
        }
    }
};