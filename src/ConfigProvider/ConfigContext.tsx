import React from 'react'
import locale from '../locale/en-US'

export const defaultConfig = {
  clsPrefix: 'xl',
  locale
}

const ConfigContext = React.createContext(defaultConfig)

export default ConfigContext
