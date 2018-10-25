import './index.scss'

import * as React from 'react'
import routes from '../../routes'
import Loadable from '../loadable'
import { Route } from 'react-router-dom'


const Routes = routes.map((it, index) => {
    const LoadableComponent = <Loadable loader={it.component}
                                        loading={() => <div>123</div>}/>
    return <Route key={index} path={it.path} component={() => LoadableComponent}/>
})

export default class Content extends React.Component {
    render() {
        return (
            <div>
                {Routes}
            </div>
        )
    }
}