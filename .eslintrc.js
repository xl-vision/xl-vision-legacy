const confusingBrowserGlobals = require('confusing-browser-globals')

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
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: __dirname,
        devDependencies: [
          'site/**',
          'test/**',
          'scripts/**',
          '**/__test__/**',
          '**/*.mdx',
          '*.js',
          '.*.js'
        ]
      }
    ],
    // Strict, airbnb is using warn; allow warn and error for dev environments
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'nonblock-statement-body-position': 'error',
    'no-plusplus': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false
      }
    ],
    'no-restricted-globals': ['error'].concat(confusingBrowserGlobals),
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'no-use-before-define': 'off',
    'no-multi-assign': 'off',
    'react-hooks/exhaustive-deps': [
      'error',
      {
        // custom hooks
        additionalHooks: '(useLayoutEffect|useUpdated)'
      }
    ],
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
        checkLocalVariables: true
      }
    ],
    'react/forbid-prop-types': 'off', // todo remove
    'react/jsx-boolean-value': ['error', 'always'],
    'react/display-name': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
        'prettier/@typescript-eslint'
        // 'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
        'no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            mjs: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never'
          }
        ],

        'import/no-cycle': 'off',
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
