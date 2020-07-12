import React from 'react'
import PropTypes from 'prop-types'

export interface AffixProps {
  children: React.ReactElement
  offsetTop?: number
  offsetBottom?: number
  scrollContainer?: () => HTMLElement
  onChange?: (changed: boolean) => void
}

const defaultScrollContainer = () => window

const Affix: React.FunctionComponent<AffixProps> = (props) => {
  const {
    children,
    offsetBottom,
    offsetTop,
    scrollContainer = defaultScrollContainer,
    onChange
  } = props

  return children
}

Affix.displayName = 'Affix'

Affix.propTypes = {
  children: PropTypes.element.isRequired
}

export default Affix
