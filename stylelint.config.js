module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  plugins: ['stylelint-scss'],
  rules: {
    'color-no-invalid-hex': true,
    'color-hex-case': 'lower',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true
  }
}
