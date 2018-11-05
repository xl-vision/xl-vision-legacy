import * as React from 'react'
import Row from '../row'
import * as Enzyme from 'enzyme'

function sum(a: number, b: number) {
  return a + b
}
describe('Row Test', () => {
  it('renders test', () => {
    const row = Enzyme.render(
      <Row />
    )
    expect(row).toMatchSnapshot()
  })
})
