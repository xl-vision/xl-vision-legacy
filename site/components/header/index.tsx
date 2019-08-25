import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from '../../../src'
import logo from '../../assets/img/logo.png'
import './index.scss'

const Header: React.FunctionComponent<void> = () => {
  return (
    <header className='header'>
      <Link to='/' className='logo'>
        <img src={logo} alt='' />
      </Link>
      <div>
        <Button
          size={'small'}
          ghost={true}
          href={'https://github.com/xl-vision/xl-vision'}
          target={'_black'}
        >
          <Icon.FabGithub />
          github
        </Button>
      </div>
    </header>
  )
}

Header.displayName = 'header'

export default Header
