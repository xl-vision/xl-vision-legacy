import * as React from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from '@xl-vision/core'
import logo from '../../assets/img/logo.png'
import ColorContext from '../Layout/ColorContext'

const Header: React.FunctionComponent<Record<string, unknown>> = () => {
  const { setDark } = React.useContext(ColorContext)
  const styles = useStyles()

  const handleClick = React.useCallback(() => {
    setDark((prev) => !prev)
  }, [setDark])

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        <img src={logo} alt='' />
      </Link>
      <button type='button' onClick={handleClick}>
        click
      </button>
      {/* <div>
        <Button type='text' ghost href='https://github.com/xl-vision/xl-vision' target='_black'>
          <FabGithub />
          Github
        </Button>
      </div> */}
    </header>
  )
}

export default Header

const useStyles = createUseStyles((theme) => {
  return {
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5rem 1rem',
      ...theme.elevations(2)
    },
    logo: {
      textDecoration: 'none',
      '&>img': {
        height: '3.5rem'
      }
    }
  }
}, 'Header')
