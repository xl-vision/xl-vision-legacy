import React from 'react'

export const fillRef = <T extends Element>(
  children: React.ReactElement,
  ref: React.Ref<T | undefined>
) => {
  // https://github.com/facebook/react/blob/2e5d1a8b9e2c29418a27b24306e4c8d5f8681f4f/packages/react-reconciler/src/ReactFiberCommitWork.js#L693
  const refCb = (node: T | null) => {
    call(node, ref)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prevRef = (children as any).ref

    call(node, prevRef)
  }

  return React.cloneElement(children, {
    ref: refCb
  })
}

const call = <T extends Element>(node: T | null, ref: React.Ref<T | undefined>) => {
  if (typeof ref === 'function') {
    ref(node)
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ref as any).current = node
  }
}
