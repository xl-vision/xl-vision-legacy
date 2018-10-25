import './index.scss'

import * as React from 'react'
import routes from '../../routes'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export default class Aside extends React.Component {
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