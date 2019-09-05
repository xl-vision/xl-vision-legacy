import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from '../../../src'
import logo from '../../assets/img/logo.png'
import './index.scss'

const Header: React.FunctionComponent<{}> = () => {
  return (
    <header className='header'>
      <Link to='/' className='logo'>
        <img src={logo} alt='' />
      </Link>
      <div>
        <Button type='text' ghost href='https://github.com/xl-vision/xl-vision' target='_black'>
          <Icon.FabGithub />
          Github
        </Button>
      </div>
    </header>
  )
}

export default Header
