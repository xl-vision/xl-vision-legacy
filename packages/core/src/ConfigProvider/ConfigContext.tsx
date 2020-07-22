import React from 'react'
import locale from '../locale/en-US'

export const defaultConfig = {
  locale
}

const ConfigContext = React.createContext(defaultConfig)

export default ConfigContext
