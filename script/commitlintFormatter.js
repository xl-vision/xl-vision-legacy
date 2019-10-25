const formatter = require('@commitlint/format')

module.exports = function(report, options) {
  const isError = report.errorCount > 0
  const result = formatter.default(report, options)
  return result + isError && "\n\nPlease use command 'npm run commit' to commit changes\n\n"
}
