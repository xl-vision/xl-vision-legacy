import './index.scss'

import * as React from 'react'
import routes from '../../routes'

import { Link } from 'react-router-dom'

export default class Aside extends React.Component<{}, {}> {
    render() {
        return (
            <ul>
                {routes.filter(it => !it.redirect).map((it, index) => {
                    return (
                        <li key={index}>
                            <Link to={it.path}>{it.name}</Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}