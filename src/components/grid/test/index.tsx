import * as React from 'react'
import { default as Row, responsiveMap } from '../row'
import Col from '../col'
import * as Enzyme from 'enzyme'
// import Context from '../context'

describe('Grid Test', () => {

    let ret: MediaQueryList
    const matchMedia = window.matchMedia
    const listenersMap: Record<string, Array<((this: MediaQueryList, ev: MediaQueryListEvent) => any)>> = {}

    beforeEach(() => {
        window.matchMedia = function (mediaQuery: string) {
            ret = {
                media: mediaQuery,
                matches: mediaQuery === responsiveMap.lg,
                addListener(listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any) {
                    listenersMap[mediaQuery] = (listenersMap[mediaQuery] || []).concat(listener)
                },
                removeListener() {
                },
                onchange: null,
                addEventListener() {
                },
                removeEventListener() {
                },
                dispatchEvent() {
                    return true
                },
            }
            return ret
        }
    })

    afterEach(() => {
        window.matchMedia = matchMedia
    })

    it('renders basically', () => {
        const row = Enzyme.mount(
            <Row gutter={10} type={'flex'} align={'top'} justify={'center'}>
                <Col span={10} offset={1} push={2} pull={3}>renders row</Col>
            </Row>
        )
        expect(row).toMatchSnapshot()
    })

    it('renders responsibly', () => {
        const row = Enzyme.mount(
            <Row gutter={{
                xxl: 1,
                xl: 2,
                lg: 3,
                md: 4,
                sm: 5,
                xs: 6
            }} type={'flex'} align={'top'} justify={'center'}>
                <Col>renders responsibly</Col>
            </Row>
        )
        Object.keys(listenersMap)
            .filter(key => key === responsiveMap.lg)
            .forEach(key => {
                const listeners = listenersMap[key]
                listeners.forEach(it => {
                    // @ts-ignore
                    it({...ret, matches: true})
                })

            })
        expect(row).toMatchSnapshot()
    })
})
