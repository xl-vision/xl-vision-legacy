module.exports = [
  {
    name: 'task:lintEs',
    tasks: {
      name: 'lint:es',
      options: {
        dot: true,
        from: [
          'script/**/*.js',
          'src/**/*.ts?(x)',
          'test/**/*.ts?(x)',
          'test/**/*.js?(x)',
          'site/**/*.ts?(x)',
          '*.js'
        ]
      }
    }
  },
  {
    name: 'task:lintStyle',
    tasks: {
      name: 'lint:style'
    }
  },
  {
    name: 'task:lint',
    tasks: [
      {
        name: 'task:lintStyle'
      },
      {
        name: 'task:lintEs'
      }
    ]
  },
  {
    name: 'task:compileLib',
    tasks: [
      {
        name: 'compile:ts',
        options: {
          from: ['src/**/*.ts?(x)', '!**/__*__/**']
        }
      },
      {
        name: 'compile:scss'
      },
      {
        name: 'copy',
        options: {
          from: ['src/**/*.scss', '!**/__*__/**'],
          to: 'lib'
        }
      }
    ]
  },
  {
    name: 'task:compileEs',
    tasks: [
      {
        name: 'compile:ts',
        options: {
          from: ['src/**/*.ts?(x)', '!**/__*__/**'],
          es: true,
          to: 'es'
        }
      },
      {
        name: 'compile:scss',
        options: {
          to: 'es'
        }
      },
      {
        name: 'copy',
        options: {
          from: ['src/**/*.scss', '!**/__*__/**'],
          to: 'es'
        }
      }
    ]
  },
  {
    name: 'task:compile',
    tasks: [
      {
        name: 'task:compileLib'
      },
      {
        name: 'task:compileEs'
      }
    ]
  },
  {
    name: 'task:dist',
    tasks: [
      // 项目
      {
        name: 'bundle'
      },
      // icon
      {
        name: 'bundle',
        options: {
          entry: 'src/icon',
          libraryName: 'xl-vision-icon'
        }
      },
      {
        name: 'compile:scss',
        options: {
          from: 'src/style/index.scss',
          to: 'dist',
          sourceMap: true,
          rename: 'xl-vision.css'
        }
      },
      {
        name: 'compile:scss',
        options: {
          from: 'src/style/index.scss',
          to: 'dist',
          sourceMap: true,
          rename: 'xl-vision.min.css',
          beautify: false
        }
      }
    ]
  },
  {
    name: 'task:dev',
    tasks: [
      {
        name: 'docs',
        options: {
          dev: true,
          tsConfig: 'tsconfig.site.json',
          alias: {
            'xl-vision$': 'src/index.tsx',
            'xl-vision/lib/icon': 'src/icon',
            'xl-vision/es/icon': 'src/icon'
          }
        }
      }
    ]
  },
  {
    name: 'task:docs',
    tasks: [
      {
        name: 'docs',
        options: {
          tsConfig: 'tsconfig.site.json',
          alias: {
            'xl-vision$': 'src/index.tsx',
            'xl-vision/lib/icon': 'src/icon',
            'xl-vision/es/icon': 'src/icon'
          }
        }
      }
    ]
  }
]
