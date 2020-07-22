import React from 'react'
import { create, CreateGenerateIdOptions, GenerateId, Jss, SheetsRegistry } from 'jss'
import jssPreset from './utils/jssPreset'

export type JssContextProps = {
  jss: Jss
  generateId?: GenerateId
  classNamePrefix?: string
  createGenerateIdOptions?: CreateGenerateIdOptions
  sheetsRegistry?: SheetsRegistry
}

const jss = create(jssPreset())

const JssContext = React.createContext<JssContextProps>({
  jss
})

export default JssContext
