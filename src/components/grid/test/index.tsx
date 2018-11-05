import * as React from 'react'
import Row from '../row'
import * as Enzyme from 'enzyme'

describe('Row Test', () => {
  it('renders test', () => {
    const row = Enzyme.mount(
      <Row />
    )
    expect(row).toMatchSnapshot()
  })
})
