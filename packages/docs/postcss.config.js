const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        'ie 11',
        'edge >= 14',
        'firefox >= 52',
        'chrome >= 49',
        'safari >= 10',
        'node 8.0'
      ]
    })
  ]
}