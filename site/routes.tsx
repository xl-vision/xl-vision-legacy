export default [
    {
        path: '/',
        redirect: '/install'
    },
    {
        name: '安装',
        path: '/install',
        component: () => import('../src/components/grid/doc')

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