import * as React from 'react'
import routes from '../../routes'
import { Link } from 'react-router-dom'

import './index.scss'

const renderMenus = (config: any, level: string = '0') => {
    return (
        <ul className={'aside-list'}>
            {
                config.filter(it => !it.redirect)
                    .map((it, index) => {
                        let ret: any
                        if (it.children) {
                            ret = renderMenus(it.children, `${level}-${index}`)
                        } else {
                            ret = <Link to={it.path}>{it.name}</Link>
                        }
                        return (
                            <li key={`${level}-${index}`} className={'aside-item'}>{ret}</li>
                        )
                    })
            }
        </ul>
    )
}

export default class Aside extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                {renderMenus(routes)}
            </div>
        )
    }
}