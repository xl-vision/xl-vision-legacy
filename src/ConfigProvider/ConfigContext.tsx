import React from 'react'
import locale from '../locale/en-US'

const ConfigContext = React.createContext({
  clsPrefix: 'xl',
  locale
})

export default ConfigContext
