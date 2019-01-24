import * as React from 'react'
import routes from '../../routes'
import Loadable from '../loadable'
import { Route, Redirect, Switch } from 'react-router-dom'

import './index.scss'

const renderContents = (config: Array<any>, level: string = '0') => {
    let arr: Array<React.ReactNode> = []
    let component: React.ReactNode
    config.forEach((it, index) => {
        if (it.children) {
            arr = arr.concat(renderContents(it.children, `${level}-${index}`))
        } else {
            if (it.redirect) {
                component = <Redirect key={`${level}-${index}`} exact={true} to={it.redirect} from={it.path} />
            } else {
                const loadable = <Loadable loader={it.component}
                    loading={() => <div>loading...</div>} />
                component = <Route key={`${level}-${index}`} exact={true} path={it.path} render={() => loadable} />
            }
            arr.push(component)
        }
    })
    return arr
}
const Routes = renderContents(routes)

export default class Content extends React.Component<{}, {}> {
    render() {
        return (
            <div className={'content'}>
                <Switch>
                    {Routes}
                </Switch>
            </div>
        )
    }
}