import * as React from 'react'
import { default as Row, responsiveMap, Breakpoint } from '../row'
import Col from '../col'
import * as Enzyme from 'enzyme'
// import Context from '../context'

describe('Grid Test', () => {

    let ret: MediaQueryList
    const matchMedia = window.matchMedia
    const listenersMap: Record<string, Array<((this: MediaQueryList, ev: MediaQueryListEvent) => any)>> = {}

    beforeAll(() => {
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

    afterAll(() => {
        window.matchMedia = matchMedia
    })

    it('renders basically', () => {
        const row = Enzyme.mount(
            <Row gutter={10} type={'flex'} align={'top'} justify={'center'}>
                <Col span={10} offset={1} push={2} pull={3}
                    xxl={{
                        span: 1,
                        offset: 2,
                        push: 3,
                        pull: 4
                    }}
                    xl={{
                        span: 5,
                        offset: 6,
                        push: 7,
                        pull: 8
                    }}
                    lg={{
                        span: 9,
                        offset: 10,
                        push: 11,
                        pull: 12
                    }}
                    md={{
                        span: 13,
                        offset: 14,
                        push: 15,
                        pull: 16
                    }}
                    sm={{
                        span: 17,
                        offset: 18,
                        push: 19,
                        pull: 20
                    }}
                    xs={{
                        span: 21,
                        offset: 22,
                        push: 23,
                        pull: 24
                    }}>renders row</Col>
            </Row>
        )
        expect(row).toMatchSnapshot()
    })

    it('renders responsibly: gutter', () => {
        const gutter: Record<string, number> = {
            xxl: 1,
            xl: 2,
            lg: 3,
            md: 4,
            sm: 5,
            xs: 6
        }
        const row = Enzyme.mount(
            <Row gutter={gutter} type={'flex'} align={'top'} justify={'center'}>
                <Col>renders responsibly</Col>
            </Row>
        )
        expect(row.find('.xl-row').prop('style')).toMatchObject({})
        expect(row.find('.xl-col').prop('style')).toMatchObject({})
        Object.keys(gutter)
            .forEach((key: Breakpoint) => {
                const mediaQuery = responsiveMap[key]
                Object.keys(listenersMap).forEach(mediaQuery2 => {
                    const listeners = listenersMap[mediaQuery2]
                    if (mediaQuery2 === mediaQuery) {
                        listeners.forEach(it => {
                            // @ts-ignore
                            it({ ...ret, matches: true, media: mediaQuery2 })
                        })
                    } else {
                        listeners.forEach(it => {
                            // @ts-ignore
                            it({ ...ret, matches: false, media: mediaQuery2 })
                        })
                    }
                })
                row.update()
                expect(row.find('.xl-row').prop('style')).toMatchObject({ marginLeft: gutter[key] / -2, marginRight: gutter[key] / -2 })
                expect(row.find('.xl-col').prop('style')).toMatchObject({ marginLeft: gutter[key] / 2, marginRight: gutter[key] / 2 })
            })
    })
})
