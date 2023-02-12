module.exports = {
  testEnvironment        : 'node',
  testEnvironmentOptions : {
    NODE_ENV: 'test',
  },
  restoreMocks               : true,
  coveragePathIgnorePatterns : [ 'node_modules', 'dist/config', 'dist/application.js' ],
  coverageReporters          : [ 'text', 'lcov', 'clover', 'html' ],
  globals                    : {
    'ts-jest': {
      diagnostics: false,
    },
  },
  transform: { '\\.ts$': [ 'ts-jest' ] },
}
