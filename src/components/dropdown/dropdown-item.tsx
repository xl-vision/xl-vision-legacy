import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../commons/config'
import DropdownContext from './dropdown-context'

export interface DropdownItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  disabled?: boolean
  prefixCls?: string
}

const DropdownItem: React.FunctionComponent<DropdownItemProps> = React.forwardRef<
  HTMLLIElement,
  DropdownItemProps
>((props, ref) => {
  const {
    children,
    disabled,
    prefixCls = `${namePrefix}-dropdown-item`,
    onMouseEnter,
    onClick,
    onContextMenu,
    onFocus,
    ...others
  } = props

  const { closeOnClick, close } = React.useContext(DropdownContext)

  // disabled时阻止下面几个事件，防止嵌套dropdown时，子Dropdown在disabled的情况下还触发
  // 下面的事件对应trigger的几种情况: hover, click, contextMenu, focus
  const onMouseEnterWrapper = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        onMouseEnter && onMouseEnter(e)
      }
    },
    [disabled, onMouseEnter]
  )

  const onClickWrapper = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        onClick && onClick(e)
        if (closeOnClick) {
          close()
        }
      }
    },
    [disabled, onClick, closeOnClick, close]
  )

  const onContextMenuWrapper = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        onContextMenu && onContextMenu(e)
      }
    },
    [disabled, onContextMenu]
  )

  const onFocusWrapper = React.useCallback(
    (e: React.FocusEvent<HTMLLIElement>) => {
      if (disabled) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        onFocus && onFocus(e)
      }
    },
    [disabled, onFocus]
  )

  const classes = classnames(prefixCls, {
    [`${prefixCls}--disabled`]: disabled
  })

  return (
    <li
      {...others}
      ref={ref}
      className={classes}
      onMouseEnter={onMouseEnterWrapper}
      onContextMenu={onContextMenuWrapper}
      onClick={onClickWrapper}
      onFocus={onFocusWrapper}
    >
      {children}
    </li>
  )
})

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  prefixCls: PropTypes.string
}

export default DropdownItem
