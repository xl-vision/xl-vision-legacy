const regex = /\s*---\s*((.*(?!---)\n)*)\s*---/
module.exports = function (content, map, meta) {
    console.log('11111111111111111111111111111111111111')
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
        export default class Component extends React.Component {
            render() {
                return React.createElement(Markdown, {
                    children: \`${parseStr}\`
                })
            }
        }
    `
    return dest
}