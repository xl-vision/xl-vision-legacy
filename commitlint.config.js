module.exports = {
  extends: ['@commitlint/config-conventional'],
  formatter: require.resolve('./scripts/commitlintFormatter'),
  rules: {}
}
