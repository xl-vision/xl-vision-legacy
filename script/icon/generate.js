const generate = require('@xl-vision/icon-generator')
const path = require('path')
const fs = require('fs-extra')

const config = {
    pathMap: [{
        input: path.join(__dirname, 'icons/font-awesome/brands/*.svg'),
        formater: name => `fab-${name}`,
        output: 'src/package/icon/icons'
    }, {
        input: path.join(__dirname, 'icons/font-awesome/regular/*.svg'),
        formater: name => `far-${name}`,
        output: 'src/package/icon/icons'
    }, {
        input: path.join(__dirname, 'icons/font-awesome/solid/*.svg'),
        formater: name => `fas-${name}`,
        output: 'src/package/icon/icons'
    }],
    template: path.join(__dirname, 'template/index.tsx')
}
const iconDestPath = path.join(__dirname, '../../src/package/icon/icons')
const iconIndexPath = path.join(iconDestPath, '../index.ts')

const toCamel = str => {
    let tempStr = ''
    let flag = true
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i)
        if (flag) {
            char = char.toUpperCase()
            flag = false
        } else if (char === '-') {
            flag = true
            continue
        }
        tempStr += char
    }
    return tempStr
}

const run = async () => {
    fs.removeSync(iconDestPath)
    fs.removeSync(iconIndexPath)

    await generate(config)

    let importContent = `import createIcon from './base/createIcon'\n`
    let exportContent = `{\n    createIcon,\n`
    //获取icons目录下所有的icon，生成index.ts文件
    const files = await fs.readdir(iconDestPath)

    files.forEach(it => {
        const name = it.substring(0, it.length - path.extname(it).length)
        importContent += `import ${toCamel(name)} from './icons/${name}'\n`
        exportContent += `    ${toCamel(name)},\n`
    })
    exportContent += '}\n'
    let allContent = `// This file is automatically generated\n// tslint:disable\n\n`
    allContent += importContent

    allContent += `export { BaseIconProps } from './base/base-icon'\n`
    allContent += `export { IconProps } from './base/createIcon'\n`
    allContent += `export ${exportContent}\n export default ${exportContent}`


    fs.writeFileSync(iconIndexPath, allContent)
}

run()
