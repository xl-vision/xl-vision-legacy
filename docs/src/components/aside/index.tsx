import * as React from 'react'
import routes from '../../routes'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import './index.scss'

const renderMenus = (config: any, level: string = '0') => {
    return (
        <ul className={'aside-list'}>
            {
                config.filter((it: any) => !it.redirect)
                    .map((it: any, index: number) => {
                        let ret: any
                        if (it.children) {

                            const deep = level.split('-').length
                            let tag = deep
                            if (tag > 5) {
                                tag = 5
                            }
                            const title = React.createElement(`h${tag}`, {
                                className: classnames('aside-title', `aside-title-level-${deep}`)
                            }, [it.name])
                            ret = (
                                <>
                                    {title}
                                    {renderMenus(it.children, `${level}-${index}`)}
                                </>
                            )
                        } else {
                            ret = <NavLink to={it.path} className={'aside-link'} activeClassName={'aside-link-active'}>{it.name}</NavLink>
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
            <div className={'aside'}>
                {renderMenus(routes)}
            </div>
        )
    }
}