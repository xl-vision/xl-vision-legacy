import * as React from 'react'
import Row from '../row'
import * as Enzyme from 'enzyme'

describe('Grid Test', () => {
  it('renders row', () => {
    const row = Enzyme.shallow(
      <Row />
    )
    expect(row).toMatchSnapshot()
  })
})
