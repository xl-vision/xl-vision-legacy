module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
    browser: true
  },
  settings: {
    react: {
      version: '16.8'
    }
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      parserOptions: {
        ecmaVersion: 2018
      },
      plugins: ['standard', 'prettier'],
      extends: ['standard', 'plugin:prettier/recommended']
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint', 'standard', 'react', 'react-hooks'],
      extends: [
        'standard',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'prettier/standard',
        'prettier/@typescript-eslint',
        'prettier/react'
      ],
      rules: {
        // 'no-void': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/display-name': 'error',
        'react/jsx-boolean-value': ['error', 'always'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'generic'
          }
        ],
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/restrict-plus-operands': [
          'error',
          {
            checkCompoundAssignments: true
          }
        ],
        '@typescript-eslint/restrict-template-expressions': 'error',
        '@typescript-eslint/no-floating-promises': 'error'
      }
    }
  ]
}
