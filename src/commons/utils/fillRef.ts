import React from 'react'

const call = <T extends Element>(node: T | null, ref: React.Ref<T | undefined>) => {
  if (typeof ref === 'function') {
    ref(node)
  } else if (ref && typeof ref === 'object' && 'current' in ref) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
    ;(ref as any).current = node
  }
}

const fillRef = <T extends HTMLElement>(
  children: React.ReactElement<React.RefAttributes<T>>,
  ref: React.Ref<T | undefined>
) => {
  // https://github.com/facebook/react/blob/2e5d1a8b9e2c29418a27b24306e4c8d5f8681f4f/packages/react-reconciler/src/ReactFiberCommitWork.js#L693
  // https://github.com/facebook/react/issues/8873#issuecomment-275423780
  const refCb = (node: T | null) => {
    call(node, ref)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { ref: prevRef } = (children as any)
    call(node, prevRef)
  }

  return React.cloneElement(children, {
    ref: refCb
  })
}

export default fillRef
