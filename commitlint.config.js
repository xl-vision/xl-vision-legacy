module.exports = {
  extends: ['@commitlint/config-conventional'],
  formatter: require.resolve('./scripts/commitlintFormatter'),
  rules: {
    'scope-case': [2, 'always', ['pascal-case', 'camel-case']]
  }
}
