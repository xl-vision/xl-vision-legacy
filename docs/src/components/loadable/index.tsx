import * as React from 'react'
import Markdown from '../markdown'

export interface LoadableProps {
    loader: () => Promise<{ default: string }>
    loading?: React.ComponentType
    error?: React.ComponentType<{ error: Error }>
}

export interface LoadableState {
    component: React.ComponentType
}

function resolve(obj: any): string {
    return obj && obj.__esModule ? obj.default : obj
}

export default class Loadable extends React.PureComponent<LoadableProps, LoadableState> {

    constructor(props: LoadableProps) {
        super(props)

        this.state = {
            component: () => <div/>
        }

    }

    componentDidMount() {
        const {loader, loading, error} = this.props
        if (loading) {
            this.setState(() => ({
                component: loading
            }))
        }

        loader().then(it => {
            this.setState(() => ({
                component: () => <Markdown>{resolve(it)}</Markdown>
            }))
        }).catch(err => {
            if (error) {
                this.setState(() => ({
                    component: () => React.createElement(error, {error: err})
                }))
            }

        })
    }

    render() {
        return React.createElement(this.state.component)
    }
}