import React from 'react'
import { Grid, createUseStyles } from '@xl-vision/core'

export default () => {
  const styles = useStyles()
  return (
    <div>
      <div className={styles.root}>
        <Grid gutter={10}>
          <Grid.Col span={6}>
            <div className={styles.box}>col1</div>
          </Grid.Col>
          <Grid.Col
            span={6}
            offset={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 6
            }}
          >
            <div className={styles.box}>col2</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className={styles.box}>col3</div>
          </Grid.Col>
        </Grid>
      </div>
      <div className={styles.root}>
        <Grid gutter={10}>
          <Grid.Col span={6}>
            <div className={styles.box}>col1</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className={styles.box}>col2</div>
          </Grid.Col>
          <Grid.Col
            span={6}
            push={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 6
            }}
          >
            <div className={styles.box}>col3</div>
          </Grid.Col>
        </Grid>
      </div>
      <div className={styles.root}>
        <Grid gutter={10}>
          <Grid.Col span={6}>
            <div className={styles.box}>col1</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className={styles.box}>col2</div>
          </Grid.Col>
          <Grid.Col
            span={6}
            pull={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 6
            }}
            offset={6}
          >
            <div className={styles.box}>col3</div>
          </Grid.Col>
        </Grid>
      </div>
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
