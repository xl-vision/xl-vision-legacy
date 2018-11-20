import * as React from 'react'
import Row from '../row'
import Col from '../col'
import * as Enzyme from 'enzyme'

describe('Grid Test', () => {

    it('renders basically', () => {
        const row = Enzyme.mount(
            <Row gutter={10}>
                <Col span={5} offset={1} push={2} pull={3}>renders row</Col>
                <Col span={5} offset={1} push={2} pull={3}>renders row</Col>
            </Row>
        )
        expect(row).toMatchSnapshot()
    })

    it('renders basically: flex', () => {
        const row = Enzyme.mount(
            <Row gutter={10} type={'flex'} align={'top'} justify={'center'}>
                <Col span={5} offset={1} push={2} pull={3} order={2}>renders row</Col>
                <Col span={5} offset={1} push={2} pull={3} order={1}>renders row</Col>
            </Row>
        )
        expect(row).toMatchSnapshot()
    })

    it('renders responsibily', () => {
        const row = Enzyme.mount(
            <Row gutter={10}>
                <Col
                    xs={{
                        span: 10,
                        offset: 2,
                        pull: 3,
                        push: 4
                    }}
                    md={{
                        span: 4,
                        offset: 4,
                        pull: 2,
                        push: 1
                    }}>renders row</Col>
                <Col
                    xs={{
                        span: 5,
                        offset: 1,
                        pull: 2,
                        push: 3
                    }}
                    md={{
                        span: 7,
                        offset: 5,
                        pull: 3,
                        push: 2
                    }}>renders row</Col>
            </Row>
        )
        expect(row).toMatchSnapshot()
    })

    it('renders responsibily: flex', () => {
        const row = Enzyme.mount(
            <Row type='flex' gutter={10}>
                <Col
                    xs={{
                        span: 10,
                        offset: 2,
                        pull: 3,
                        push: 4,
                        order: 1
                    }}
                    md={{
                        span: 4,
                        offset: 4,
                        pull: 2,
                        push: 1,
                        order: 2
                    }}>renders row</Col>
                <Col
                    xs={{
                        span: 5,
                        offset: 1,
                        pull: 2,
                        push: 3,
                        order: 2
                    }}
                    md={{
                        span: 7,
                        offset: 5,
                        pull: 3,
                        push: 2,
                        order: 1
                    }}>renders row</Col>
            </Row>
        )
        expect(row).toMatchSnapshot()
    })

    it('renders responsibily: gutter', () => {
        const row = Enzyme.mount(
            <Row gutter={{
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 5,
                xxl: 6
            }}>
                <Col span={5} offset={1} push={2} pull={3} order={2}>renders row</Col>
                <Col span={5} offset={1} push={2} pull={3} order={1}>renders row</Col>
            </Row>
        )
        expect(row).toMatchSnapshot()
    })
})
