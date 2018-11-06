import * as React from 'react'
import Row from '../row'
// import { default as Row, responsiveMap } from '../row'
import * as Enzyme from 'enzyme'

describe('Grid Test', () => {

  // const matchMedia = window.matchMedia

  // beforeAll(() => {
  //   window.matchMedia = (mediaQuery: string) => {
  //     return {
  //       media: mediaQuery,
  //       matches: mediaQuery === responsiveMap.lg,
  //       addListener() {
  //       },
  //       removeListener() {
  //       },
  //     }
  //   }
  // })

  // afterAll(() => {
  //   window.matchMedia = matchMedia
  // })

  it('renders row', () => {
    const row = Enzyme.shallow(
      <Row gutter={10} type={'flex'} align={'top'} justify={'center'} />
    )
    expect(row).toMatchSnapshot()
  })

  it('renders row responsibly', () => {
    const row = Enzyme.shallow(
      <Row gutter={{
        xxl: 1,
        xl: 2,
        lg: 3,
        md: 4,
        sm: 5,
        xs: 6
      }} type={'flex'} align={'top'} justify={'center'} />
    )
    expect(row).toMatchSnapshot()
  })
})
