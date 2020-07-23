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
      version: '16.9'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        directory: './tsconfig.json'
      }
    }
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
  plugins: ['unicorn'],
  rules: {
    'import/no-extraneous-dependencies': [
      'off',
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
    'no-continue': 'off',
    // Strict, airbnb is using warn; allow warn and error for dev environments
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'nonblock-statement-body-position': 'error',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-restricted-globals': ['error'].concat(confusingBrowserGlobals),
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'no-use-before-define': 'off',
    'no-multi-assign': 'off',
    'consistent-return': [
      'off',
      {
        treatUndefinedAsUnspecified: true
      }
    ],
    'import/no-named-as-default': 'off',
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
    'react/require-default-props': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true
        },
        ignore: [/^.*\.config.js$/, /^en-US.ts$/, /^zh-CN.ts$/]
      }
    ],
    'unicorn/better-regex': 'error',
    'unicorn/expiring-todo-comments': 'error',
    'unicorn/consistent-function-scoping': 'error',
    'unicorn/import-index': 'error',
    // forbid passing object as default value to props of function component
    // 'unicorn/no-object-as-default-parameter': 'error',
    'unicorn/prefer-query-selector': 'error',
    'unicorn/no-abusive-eslint-disable': 'error'
  },
  overrides: [
    {
      files: ['**/__doc__/**'],
      rules: {
        'react/display-name': 'off'
      }
    },
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
    },
    {
      files: ['**/__test__/**/*.ts?(x)'],
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      }
    }
  ]
}
