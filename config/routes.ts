export default [
  {
    path: '/',
    component: '../layouts/SimpleLayout',
    routes: [
      {
        path: '/',
        name: 'home',
        component: './Home',
      },
      {
        path: '/about',
        name: 'about',
        component: './About',
      },
      {
        path: '/search',
        name: 'search',
        component: './Search',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]


