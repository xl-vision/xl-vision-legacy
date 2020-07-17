import React from 'react'
import { createTheming } from 'react-jss'

export type Theme = {}

const ThemeContext = React.createContext<Theme>({})

export const theme =  createTheming(ThemeContext)
