import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from '../../../src'
import logo from '../../assets/img/logo.png'
import './index.scss'

export default function () {
  return (
    <header className='header'>
      <Link to='/' className='logo'>
        <img src={logo} alt=''/>
      </Link>
      <Button href={'https://github.com/xl-vision/xl-vision'}>
        <Icon.FabGithub/>
      </Button>
    </header>
  )
}
