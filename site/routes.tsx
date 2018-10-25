export default [
    {
        name: 'hello',
        path: '/hello',
        component: () => import('../src/components/hello/doc/index.md')
    },
    {
        name: 'hello2',
        path: '/hello2',
        component: () => import('../src/components/hello2/doc/index.md')
    }
]