import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/shopify/product/Product'
import Catalog from '@/components/shopify/catalog/Catalog.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Product',
      component: Product
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: Catalog
    }
  ]
})
