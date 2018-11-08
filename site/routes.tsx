export default [
    {
        path: '/',
        redirect: '/grid'
    },
    {
        name: '栅格组件',
        path: '/grid',
        component: () => import('../src/components/grid/doc')
    },
]