import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (children: React.ReactElement, ref: { current: any }) => {
  // https://github.com/facebook/react/blob/2e5d1a8b9e2c29418a27b24306e4c8d5f8681f4f/packages/react-reconciler/src/ReactFiberCommitWork.js#L693
  const refCb = (node: HTMLElement) => {
    ref.current = node
    // 如果children上有ref，还需要触发
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prevRef = (children as any).ref
    if (typeof prevRef === 'function') {
      prevRef(node)
    } else if (prevRef !== null) {
      prevRef.current = node
    }
  }

  return React.cloneElement(children, {
    ref: refCb
  })
}
