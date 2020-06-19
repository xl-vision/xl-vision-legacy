module.exports = {
  extends: ['@commitlint/config-conventional'],
  formatter: require.resolve('./script/commitlintFormatter'),
  rules: {
    'scope-case': [2, 'always', ['pascal-case', 'camel-case']]
  }
}
