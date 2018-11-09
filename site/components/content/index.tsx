import './index.scss'

import * as React from 'react'
import routes from '../../routes'
import Loadable from '../loadable'
import { Route, Redirect } from 'react-router-dom'


const Routes = routes.map((it, index) => {
    let component: React.ReactNode
    if (it.redirect) {
        component = <Redirect to={it.redirect} path={it.path} />
    } else {
        component = <Loadable loader={it.component}
            loading={() => <div>loading...</div>} />
    }
    return <Route key={index} exact={true} path={it.path} render={() => component} />
})

export default class Content extends React.Component<{}, {}> {
    render() {
        return (
            <div className={'c-content'}>
                {Routes}
            </div>
        )
    }
}