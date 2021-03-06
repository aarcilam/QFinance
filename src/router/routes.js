const routes = [{
        path: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                path: '',
                component: () =>
                    import ('pages/Index.vue')
            },
            {
                path: 'timeline',
                component: () =>
                    import ('pages/Timeline.vue')
            },
            {
                path: 'expimp',
                component: () =>
                    import ('pages/ExportImport.vue')
            },
            {
                path: 'details',
                name: 'details',
                props: true,
                component: () =>
                    import ('pages/Detail.vue')
            }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/Error404.vue')
    }
]

export default routes