import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RootView from '../components/RootView.vue'
import AddEditFactory from '../components/AddEditFactory.vue'

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
    component: AddEditFactory
  },
  {
    path: '/edit-factory',
    name: 'Edit Factory',
    component: AddEditFactory
  },
]

const router = new VueRouter({
  routes
})

export default router
