const generate = require('@xl-vision/icon-generator')
const path = require('path')
const fs = require('fs-extra')

const config = {
    pathMap: [{
        input: path.join(__dirname, 'icons/font-awesome/brands/*.svg'),
        formater: name => `fa-br-${name}`,
        output: 'src/components/icon/icons'
    },{
        input: path.join(__dirname, 'icons/font-awesome/regular/*.svg'),
        formater: name => `fa-re-${name}`,
        output: 'src/components/icon/icons'
    },{
        input: path.join(__dirname, 'icons/font-awesome/solid/*.svg'),
        formater: name => `fa-so-${name}`,
        output: 'src/components/icon/icons'
    }],
    template: path.join(__dirname, 'template/index.ts')
}
fs.removeSync(path.join(__dirname,'../../src/components/icon/icons'))

generate(config)