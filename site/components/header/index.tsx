import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'xl-vision'
import { FabGithub } from 'xl-vision/icon'
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
          <FabGithub />
          Github
        </Button>
      </div>
    </header>
  )
}

export default Header
