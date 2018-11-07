import * as React from 'react'
import { default as Row, responsiveMap } from '../row'
// import { default as Row, responsiveMap } from '../row'
import * as Enzyme from 'enzyme'

describe('Grid Test', () => {

    const matchMedia = window.matchMedia

    beforeAll(() => {
        const listeners:Array<((this: MediaQueryList, ev: MediaQueryListEvent) => any)> = []
        window.matchMedia = (mediaQuery: string) => {
            return {
                media: mediaQuery,
                matches: mediaQuery === responsiveMap.lg,
                addListener(listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any) {
                    listeners.push(listener)
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
                }

            }
        }
    })

    afterAll(() => {
        window.matchMedia = matchMedia
    })

    it('renders row', () => {
        const row = Enzyme.shallow(
            <Row gutter={10} type={'flex'} align={'top'} justify={'center'}/>
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
            }} type={'flex'} align={'top'} justify={'center'}/>
        )
        expect(row).toMatchSnapshot()
    })
})
