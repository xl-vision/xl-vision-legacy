import React from 'react'

const getText = (children: React.ReactNode) => {
  let text = ''
  React.Children.forEach(children, (it) => {
    if (!it) {
      return
    }
    if (typeof it !== 'object') {
      text += it.toString()
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const child = (it as any).props?.children
    if (child) {
      text += getText(child)
    }
  })
  return text.replace(/\s+/g, '_')
}

export default getText
