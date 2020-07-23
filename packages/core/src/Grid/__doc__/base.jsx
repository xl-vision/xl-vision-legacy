import React from 'react'
import { Grid, createUseStyles } from '@xl-vision/core'

export default () => {
  const styles = useStyles()
  return (
    <div>
      <div className={styles.root}>
        <Grid gutter={10}>
          <Grid.Col span={4}>
            <div className={styles.box}>col1</div>
          </Grid.Col>
          <Grid.Col span={5}>
            <div className={styles.box}>col2</div>
          </Grid.Col>
          <Grid.Col span={7}>
            <div className={styles.box}>col3</div>
          </Grid.Col>
          <Grid.Col span={8}>
            <div className={styles.box}>col4</div>
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
          <Grid.Col span={6}>
            <div className={styles.box}>col3</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className={styles.box}>col4</div>
          </Grid.Col>
        </Grid>
      </div>
      <div className={styles.root}>
        <Grid gutter={10}>
          <Grid.Col span={8}>
            <div className={styles.box}>col1</div>
          </Grid.Col>
          <Grid.Col span={0}>
            <div className={styles.box}>col2</div>
          </Grid.Col>
          <Grid.Col span={8}>
            <div className={styles.box}>col3</div>
          </Grid.Col>
          <Grid.Col span={8}>
            <div className={styles.box}>col4</div>
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
