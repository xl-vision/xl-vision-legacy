const path = require('path')
const tslint = require('gulp-tslint')

function runTslint(stream, configPath = 'tslint.json') {
    return stream.pipe(tslint({
        formatter: "verbose",
        configuration: configPath,
    })).pipe(tslint.report())
}

module.exports = runTslint