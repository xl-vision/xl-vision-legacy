const markdownIt = require('markdown-it')

module.exports = function (content, map, meta) {
    let dest = `
        import React from 'react';
        import Markdown2Jsx from 'markdown-to-jsx';
        export default class Component extends React.Component {
            render() {
                return <Markdown2Jsx>${content}</Markdown2Jsx>
            }
        }
    `
    return dest
}