import { resolve } from 'path';

export default [
    {
        path: '/',
        redirect: '/grid'
    },
    {
        name: '安装',
        path: '/install',
        component: () => new Promise((resolve => resolve('install')))
    },
    {
        name: '组件',
        children: [
            {
                name: '布局',
                children: [
                    {
                        name: '栅格布局',
                        path: '/grid',
                        component: () => import('../src/components/grid/doc')
                    },
                ]
            }
        ]
    },
]