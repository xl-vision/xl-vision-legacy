module.exports = {
  extends: ['@commitlint/config-conventional'],
  formatter: require.resolve('./script/commitlintFormatter'),
  rules: []
}
