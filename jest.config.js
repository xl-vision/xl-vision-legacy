module.exports = {
  verbose: true,
  preset: 'ts-jest',
  // testEnvironment: 'node',
  setupFiles: ['./test/setup.js'],
  testMatch: ['**/src/**/__test__/*.ts?(x)'],
  // collectCoverage: true,
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx}',
    '!packages/docs/**',
    '!packages/icons/src/*.tsx',
    '!**/__*__/**',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
      diagnostics: true
    }
  },
  testURL: 'http://localhost'
}
