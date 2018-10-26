import './index.scss'

import * as React from 'react'
import routes from '../../routes'

import { Link } from 'react-router-dom'

export default class Aside extends React.PureComponent {
    render() {
        return (
            <ul>
                {routes.map((it, index) => {
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