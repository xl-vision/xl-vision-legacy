const formatter = require('@commitlint/format')

module.exports = function(report, options) {
  const result = formatter.default(report, options)
  return result + "\n\nPlease use command 'npm run commit' to commit changes\n\n"
}
