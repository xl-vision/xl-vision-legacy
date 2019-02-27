const regex = /\s*---\s*((.*(?!---)\n)*)\s*---/
module.exports = function (content, map, meta) {
    let parseStr = content.replace(/\r\n/g,'\n').replace(/`/g, "\\`")
    const importsMatch = parseStr.match(regex)
    let imports = ''
    if (importsMatch) {
        imports = importsMatch[1]
    }
    parseStr = parseStr.replace(regex, '')
    let dest = `
        ${imports}
        import React from 'react';
        import Markdown from '@/components/markdown';
        export default () => React.createElement(Markdown, {
            children: \`${parseStr}\`
        })
    `
    return dest
}