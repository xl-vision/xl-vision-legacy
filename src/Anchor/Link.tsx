import React from 'react'
import PropTypes from 'prop-types'

export interface LinkProps {
  href: string
  title: React.ReactNode
  children?: React.ReactNode
}

const Link: React.FunctionComponent<LinkProps> = (props) => {
  const { href, title, children } = props

  return (
    <div>
      <a href={href} title={typeof title === 'string' ? title : ''}>
        {title}
      </a>
      {children}
    </div>
  )
}

Link.displayName = 'Link'

Link.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node
}

export default Link
