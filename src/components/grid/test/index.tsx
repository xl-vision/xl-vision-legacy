import * as React from 'react'
import { render } from 'enzyme'
import Row from '../row'

describe('row', () => {
    it('should render row', () => {
        const wrapper = render(<Row></Row>)
        expect(wrapper).toMatchSnapshot()
    })
})
