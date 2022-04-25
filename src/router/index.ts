import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RootView from '../components/RootView.vue'
import EditFactory from '../components/EditFactory.vue'
import AddFactory from '../components/AddFactory.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Root',
    component: RootView
  },
  {
    path: '/add-factory',
    name: 'Add Factory',
    component: AddFactory
  },
  {
    path: '/edit-factory',
    name: 'Edit Factory',
    component: EditFactory
  },
]

const router = new VueRouter({
  routes
})

export default router
