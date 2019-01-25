module.exports = function (content, map, meta) {
    const str = content.replace(/\`/g,'\\`')
    let dest = `
        import React from 'react';
        import Markdown from '@/components/markdown';
        export default class Component extends React.Component {
            render() {
                return React.createElement(Markdown, {
                    children: \`${str}\`
                })
            }
        }
    `
    return dest
}