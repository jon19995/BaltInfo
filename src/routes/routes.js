/**
 * Routes
 */
export const routes = [
    {
        path: '/',
        redirect: '/users',
    },
    {
        path: '/users',
        name: 'UserList',
        component: () => import('@/page/UserList.vue'),
    },
    {
        path: '/users/:id',
        name: 'User',
        component: () => import('@/page/TheUser.vue'),
    },
]
