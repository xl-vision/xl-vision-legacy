module.exports = {
  verbose: true,
  preset: 'ts-jest',
  // testEnvironment: 'node',
  setupFiles: ['./test/setup.js'],
  testMatch: ['**/src/**/__test__/*.ts?(x)'],
  // collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/__*__/**', '!src/icon/icons/**'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
      diagnostics: true
    }
  },
  testURL: 'http://localhost'
}
