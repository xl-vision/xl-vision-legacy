import React from 'react'
import PropTypes from 'prop-types'
import AnchorContext from './AnchorContext'
import Affix from '../Affix'

export interface AnchorProps {
  children: React.ReactNode
  offsetTop?: number
  offsetBottom?: number
}

const Anchor: React.FunctionComponent<AnchorProps> = (props) => {
  const { children, offsetTop, offsetBottom } = props

  return (
    <AnchorContext.Provider value={{}}>
      <Affix offsetTop={offsetTop} offsetBottom={offsetBottom}>
        {children}
      </Affix>
    </AnchorContext.Provider>
  )
}

Anchor.displayName = 'Anchor'

Anchor.propTypes = {
  offsetBottom: PropTypes.number,
  offsetTop: PropTypes.number,
  children: PropTypes.node.isRequired
}

export default Anchor
