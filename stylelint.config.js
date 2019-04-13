module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  plugins: ['stylelint-scss'],
  rules: {
    'color-no-invalid-hex': true,
    'color-hex-case': 'lower',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'at-rule-empty-line-before': [
      'always', {
        'except': ['blockless-after-blockless'],
        'ignoreAtRules': [ 'else', 'return' ]
      }
    ],
    'block-closing-brace-newline-after': [
      'always', {
        'ignoreAtRules': ['if', 'else']
      }
    ],
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-empty-line-before': 'never',
    'scss/at-extend-no-missing-placeholder': true,
    'scss/at-function-named-arguments': 'never',
    'scss/at-function-parentheses-space-before': 'never',
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension-blacklist': ['scss', 'css'],
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-mixin-named-arguments': 'never',
    'scss/at-mixin-parentheses-space-before': 'never',
    'scss/operator-no-newline-after': true,
    'scss/operator-no-newline-before': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/no-duplicate-dollar-variables': true
  }
}
