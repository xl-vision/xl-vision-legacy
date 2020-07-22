import functions from 'jss-plugin-rule-value-function'
import global from 'jss-plugin-global'
import nested from 'jss-plugin-nested'
import camelCase from 'jss-plugin-camel-case'
import defaultUnit from 'jss-plugin-default-unit'
import vendorPrefixer from 'jss-plugin-vendor-prefixer'
import propsSort from 'jss-plugin-props-sort'
import { isBrowser } from '@xl-vision/commons'
import { Plugin } from 'jss'

const jssPreset = () => {
  const plugins: Array<Plugin> = [
    functions(),
    global(),
    nested(),
    camelCase(),
    defaultUnit(),
    propsSort()
  ]
  if (isBrowser) {
    plugins.push(vendorPrefixer())
  }
  return {
    plugins
  }
}

export default jssPreset
