import * as React from 'react'
import routes from '../../routes'
import Loadable from '../loadable'
import { Route, Redirect } from 'react-router-dom'

import './index.scss'

const renderContents = (config: Array<any>, level: string = '0') => {
    let arr: Array<React.ReactElement<Route>> = []
    let component: React.ReactNode
    config.forEach((it, index) => {
        if (it.children) {
            arr = arr.concat(renderContents(it.children, `${level}-${index}`))
        } else {
            if (it.redirect) {
                component = <Redirect to={it.redirect} path={it.path} />
            } else {
                component = <Loadable loader={it.component}
                    loading={() => <div>loading...</div>} />
            }
            arr.push(<Route key={`${level}-${index}`} exact={true} path={it.path} render={() => component} />)
        }
    })
    return arr
}
const Routes = renderContents(routes)

export default class Content extends React.Component<{}, {}> {
    render() {
        return (
            <div className={'content'}>
                {Routes}
            </div>
        )
    }
}