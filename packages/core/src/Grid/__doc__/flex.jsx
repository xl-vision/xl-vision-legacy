import React from 'react'
import { Grid, createUseStyles } from '@xl-vision/core'

export default () => {
  const styles = useStyles()
  return (
    <div>
      <div className={styles.root}>
        <Grid gutter={10} type='flex' align='top'>
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
        <Grid gutter={10} type='flex' align='middle'>
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
        <Grid gutter={10} type='flex' align='bottom'>
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
        <Grid gutter={10} type='flex' justify='start'>
          <Grid.Col span={6}>
            <div className={styles.box}>col1</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className={styles.box}>col2</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className={styles.box}>col3</div>
          </Grid.Col>
        </Grid>
      </div>
      <div className={styles.root}>
        <Grid gutter={10} type='flex' justify='center'>
          <Grid.Col span={6}>
            <div className={styles.box}>col1</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className={styles.box}>col2</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className={styles.box}>col3</div>
          </Grid.Col>
        </Grid>
      </div>
      <div className={styles.root}>
        <Grid gutter={10} type='flex' justify='end'>
          <Grid.Col span={6}>
            <div className={styles.box}>col1</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className={styles.box}>col2</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className={styles.box}>col3</div>
          </Grid.Col>
        </Grid>
      </div>
      <div className={styles.root}>
        <Grid gutter={10} type='flex'>
          <Grid.Col span={6} order={3}>
            <div className={styles.box}>col1</div>
          </Grid.Col>
          <Grid.Col span={6} order={1}>
            <div className={styles.box}>col2</div>
          </Grid.Col>
          <Grid.Col span={6} order={2}>
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

      '& > div': {
        height: '50px'
      },

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
