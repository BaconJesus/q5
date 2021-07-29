import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import EventDetails from '../views/event/Details.vue'
import EventEdit from '../views/event/Edit.vue'
import EventLayout from '../views/event/Layout.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: (route) => ({
      page: parseInt(route.query.page) || 0,
      perPage: parseInt(route.query.perPage) || 10
    })
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/event/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'edit',
        name: 'EventEdit',
        props: true,
        component: EventEdit
      }
    ]
  },
  {
    path:'/404/:',
    name: '404Resource',
    component: NotFound,
    props: true

  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
