import React from 'react'
import { Grid, createUseStyles } from '@xl-vision/core'

export default () => {
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <Grid
        gutter={{
          xs: 8,
          sm: 10,
          md: 15,
          lg: 20,
          xl: 25,
          xxl: 30
        }}
      >
        <Grid.Col
          span={{
            xs: 8,
            sm: 6,
            md: 4,
            lg: 6
          }}
        >
          <div className={styles.box}>col1</div>
        </Grid.Col>
        <Grid.Col
          span={{
            xs: 8,
            sm: 6,
            md: 5,
            lg: 10,
            xxl: 6
          }}
        >
          <div className={styles.box}>col2</div>
        </Grid.Col>
        <Grid.Col
          span={{
            xs: 8,
            sm: 6,
            md: 7,
            lg: 4,
            xl: 0,
            xxl: 6
          }}
        >
          <div className={styles.box}>col3</div>
        </Grid.Col>
        <Grid.Col
          span={{
            xs: 0,
            sm: 6,
            md: 8,
            lg: 4,
            xl: 8,
            xxl: 6
          }}
        >
          <div className={styles.box}>col4</div>
        </Grid.Col>
      </Grid>
    </div>
  )
}

const useStyles = createUseStyles((theme) => {
  return {
    root: {
      padding: '0.5rem',
      backgroundColor: theme.color.getContrastColor().divider,
      borderRadius: '4px',

      '& + &': {
        marginTop: '1rem'
      }
    },
    box: {
      textAlign: 'center',
      padding: '0.5rem',
      backgroundColor: theme.color.themes.primary,
      color: theme.color.getContrastColor(theme.color.themes.primary).text.primary,
      borderRadius: '4px'
    }
  }
})
