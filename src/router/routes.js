const routes = [{
  path: '/',
  component: () => import('layouts/NewLayout.vue'),
  children: [{
      path: '',
      component: () => import('pages/Index.vue')
    },
    {
      path: 'login',
      component: () => import('pages/Login.vue')
    },
    {
      path: 'register',
      component: () => import('pages/Register.vue')
    },
    {
      path: 'dashboard',
      component: () => import('pages/Dashboard.vue'),
      children: [{
          path: 'vehicles',
          component: () => import('pages/dashboard/Vehicles.vue')
        },
        {
          path: 'profile',
          component: () => import('pages/dashboard/Profile.vue')
        },
        {
          path: 'vehicles/:id',
          name: 'vehicle',
          component: () => import('pages/dashboard/Vehicle.vue')
        },
      ]
    }
  ]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
