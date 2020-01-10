import React from 'react'

export type Ref = { current: HTMLElement | undefined | null } | ((node: HTMLElement) => void)

export default (children: React.ReactElement, ref: Ref) => {
  // https://github.com/facebook/react/blob/2e5d1a8b9e2c29418a27b24306e4c8d5f8681f4f/packages/react-reconciler/src/ReactFiberCommitWork.js#L693
  const refCb = (node: HTMLElement) => {
    call(node, ref)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prevRef = (children as any).ref

    call(node, prevRef)
  }

  return React.cloneElement(children, {
    ref: refCb
  })
}

const call = (node: HTMLElement, ref: Ref) => {
  if (typeof ref === 'function') {
    ref(node)
  } else if (ref !== null) {
    ref.current = node
  }
}
