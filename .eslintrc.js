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
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'generic'
          }
        ]
      }
    }
  ]
}
