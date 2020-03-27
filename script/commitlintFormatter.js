const formatter = require('@commitlint/format')

module.exports = function (report, options) {
  const isError = report.errorCount > 0
  let result = formatter.default(report, options)
  if (isError) {
    result += "\n\nPlease use command 'npm run commit' to commit changes\n\n"
  }
  return result
}
