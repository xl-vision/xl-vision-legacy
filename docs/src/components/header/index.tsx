import * as React from 'react'

import logo from '@/assets/img/logo.png'
import './index.scss'

export default function() {
  return (
    <header className='header'>
      <a href='/' className='logo'>
        <img src={logo} alt='' />
      </a>
    </header>
  )
}
