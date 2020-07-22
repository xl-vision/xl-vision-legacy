import React from 'react'
import PropTypes from 'prop-types'
import Context, { defaultConfig } from './ConfigContext'

export interface ConfigProviderProps extends Partial<typeof defaultConfig> {
  children: React.ReactNode
}

const ConfigProvider: React.FunctionComponent<ConfigProviderProps> = (props) => {
  const { children, ...others } = props
  const allProps = { ...defaultConfig, ...others }

  return <Context.Provider value={allProps}>{children}</Context.Provider>
}

ConfigProvider.displayName = 'ConfigProvider'

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default ConfigProvider
