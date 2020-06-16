import { render } from 'enzyme'
import * as React from 'react'
import Grid from '..'

describe('Grid', () => {
  it('基本用法', () => {
    const wrapper = render(
      <div>
        <div className='box'>
          <Grid gutter={10}>
            <Grid.Col span={4}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={5}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={7}>
              <div className='col'>col3</div>
            </Grid.Col>
            <Grid.Col span={8}>
              <div className='col'>col4</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col3</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col4</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10}>
            <Grid.Col span={8}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={0}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={8}>
              <div className='col'>col3</div>
            </Grid.Col>
            <Grid.Col span={8}>
              <div className='col'>col4</div>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
    // wrapper.unmount()
  })
  it('偏移布局', () => {
    const wrapper = render(
      <div>
        <div className='box'>
          <Grid gutter={10}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6} offset={6}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col3</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6} push={6}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6} pull={6}>
              <div className='col'>col3</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col4</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10}>
            <Grid.Col span={6} offset={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6} pull={12}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col4</div>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('响应式布局', () => {
    const wrapper = render(
      <div className='box'>
        <Grid gutter={{ xs: 8, sm: 10, md: 15, lg: 20, xl: 25, xxl: 30 }}>
          <Grid.Col span={{ xs: 8, sm: 6, md: 4, lg: 6 }}>
            <div className='col'>col1</div>
          </Grid.Col>
          <Grid.Col span={{ xs: 8, sm: 6, md: 5, lg: 10, xxl: 6 }}>
            <div className='col'>col2</div>
          </Grid.Col>
          <Grid.Col span={{ xs: 8, sm: 6, md: 7, lg: 4, xl: 0, xxl: 6 }}>
            <div className='col'>col3</div>
          </Grid.Col>
          <Grid.Col span={{ xs: 0, sm: 6, md: 8, lg: 4, xl: 8, xxl: 6 }}>
            <div className='col'>col4</div>
          </Grid.Col>
        </Grid>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('响应式偏移', () => {
    const wrapper = render(
      <div>
        <div className='box'>
          <Grid gutter={10}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6} offset={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col3</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6} push={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}>
              <div className='col'>col3</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6} pull={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }} offset={6}>
              <div className='col'>col3</div>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('flex布局', () => {
    const wrapper = render(
      <div>
        <div className='box'>
          <Grid gutter={10} type={'flex'} align={'top'}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col3</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col4</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10} type={'flex'} align={'middle'}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col3</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col4</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10} type={'flex'} align={'bottom'}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col3</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col4</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10} type={'flex'} justify={'start'}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col3</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10} type={'flex'} justify={'center'}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col3</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10} type={'flex'} justify={'end'}>
            <Grid.Col span={6}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='col'>col3</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className='box'>
          <Grid gutter={10} type={'flex'}>
            <Grid.Col span={6} order={3}>
              <div className='col'>col1</div>
            </Grid.Col>
            <Grid.Col span={6} order={1}>
              <div className='col'>col2</div>
            </Grid.Col>
            <Grid.Col span={6} order={2}>
              <div className='col'>col3</div>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
