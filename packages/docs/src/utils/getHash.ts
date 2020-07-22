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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const child = (it as any).props?.children
    if (child) {
      text += getText(child)
    }
  })
  return text
}

const getHash = (children: React.ReactNode) => {
  const text = getText(children)
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + text.charCodeAt(i)
    // eslint-disable-next-line no-bitwise
    hash |= 0
  }
  return `id_${hash}`
}

export default getHash
