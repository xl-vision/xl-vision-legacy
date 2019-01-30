module.exports = function (content, map, meta) {
    let dest = `
        import React from 'react';
        import Markdown from '@/components/markdown';
        export default class Component extends React.Component {
            render() {
                return React.createElement(Markdown, {
                    children: \`${content.replace(/`/g,"\\`")}\`
                })
            }
        }
    `
    return dest
}