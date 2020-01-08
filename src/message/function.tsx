import { MessageItemProps } from './message-item'
import { isServer } from '../commons/utils/env'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import Message from './message'

export interface FuncMessageProps extends MessageItemProps {
  duration?: number
  onClose?: () => void
}

// const children: React.ReactElement[] = []

let root: HTMLDivElement

export const open = (props: FuncMessageProps) => {
  if (isServer) {
    return
  }

  const {} = props

  if (!root) {
    root = document.createElement('div')
    document.body.appendChild(root)
  }
}
