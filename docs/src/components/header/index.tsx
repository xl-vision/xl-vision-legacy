import * as React from 'react'
import './index.scss'
import logo from '@/assets/img/logo.png'

export default function() {
  return (
    <header className='header'>
      <a href='/' className='logo'>
        <img src={logo} alt='' />
      </a>
    </header>
  )
}
