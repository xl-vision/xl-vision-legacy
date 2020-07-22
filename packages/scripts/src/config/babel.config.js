module.exports = (api) => {
  const es = api.env('es')
  return {
    presets: [
      require.resolve('@babel/preset-react'),
      [
        require.resolve('@babel/preset-env'),
        {
          targets: {
            browsers: [
              'ie 11',
              'edge >= 14',
              'firefox >= 52',
              'chrome >= 49',
              'safari >= 10',
              'node 8.0'
            ]
          },
          modules: es ? false : 'commonjs'
        }
      ]
    ],
    plugins: [
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          helpers: true
        }
      ]
    ]
  }
}
