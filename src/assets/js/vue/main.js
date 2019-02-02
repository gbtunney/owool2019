// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import App from './App'
import store from './store'
//import data from './data.json';
import router from './router'

import {Slugify, GDatamapper} from '@/gUtilities/main.js'
import Product from './components/shopify/product/Product';
Vue.config.productionTip = false
const schema = require("schm");


const VUE_APP_NAME = '#owool-product-app';
const PRODUCT_DATA= document.querySelector(VUE_APP_NAME).dataset;


console.log(PRODUCT_DATA.producthandle);
//SHOPIFY_PRODUCT_DROP = SHOPIFY_PRODUCT_DROP


//function initVue(productViewData){
	var vm = new Vue({
		el: VUE_APP_NAME,
		components: {
			Product
		},
		data: {
			products: []
		},
		store,
		template: `<Product producthandle="${PRODUCT_DATA.producthandle}" :variantID="${PRODUCT_DATA.variantid}" :productID="${PRODUCT_DATA.productid}" :products='products'></Product>`,
	})
//}

//initVue(productViewData);

/* eslint-disable no-new */
