import * as React from 'react'
import { PostProcessor } from '..'

export default class KeyPostProcessor implements PostProcessor {
  name: 'key'
  process(elements: React.ReactNode[]) {
    const arr: Array<React.ReactNode> = []
    elements.forEach((it, index) => {
      let ele = it
      if (React.isValidElement(ele)) {
        const key = index.toString()
        const temp_ele = ele as React.ReactElement<any>
        ele = React.createElement(temp_ele.type, {
          ...temp_ele.props,
          key
        })
      }
      arr.push(ele)
    })

    return arr
  }
}
