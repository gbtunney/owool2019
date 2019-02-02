import Vue from 'vue'
import Vuex from 'vuex'
import shopify from "./shopify";
import {Slugify, GDatamapper} from '@/gUtilities/main.js'
import math from 'mathjs';

import isColor from 'is-color';
import randomColor from 'randomcolor';
const schema = require("schm");

export const SHOPIFY_DATA_INIT = 'SHOPIFY_DATA_INIT';

export const SHOPIFY_DATA_READY = 'SHOPIFY_DATA_READY';

export const CURRENT_VARIANT_CHANGED = 'CURRENT_VARIANT_CHANGED';
export const GET_SHOPIFY_DATA = 'GET_SHOPIFY_DATA';
export const SINGLE_OPTION_CHANGED = 'SINGLE_OPTION_CHANGED';
export const SINGLE_OPTION_SELECTED = 'SINGLE_OPTION_SELECTED';
export const SHOPIFY_DATA_COMPLETE = 'SHOPIFY_DATA_COMPLETE';


//shopify...

const 	parseOptions =function (inOptions) {
	
	const GDataMapOptionValues = {
		adapters: {
			default: {
				id: (obj, key) => ( !obj[key] ) ? false : true,
				slug: (obj, key) => ( !obj[key] ) ? Slugify(obj['title']) : false,
				title: (obj, key) => obj[key],
				testing: "gillintunney"
			}
		},
		validate: () => schema({
			id: {type: String, default: Math.round(math.random(11111111111, 999999999999999))},
			parent_id: {type: String, default: false},
			slug: {type: String, required: true},
			$isDisabled:  {type: Boolean, default: false},
			title: {type: String},
			_index: {type: Number, required: true},
			swatch_image: {type: Number, default: false},
			color: {type: String, default: randomColor()}
		})
	}
	
	let optionsArray = inOptions;
	
	var newArray =[];
	for (let i = 0; i < optionsArray.length; i++) {
		var currentObj = optionsArray[i];
		var OPTIONS_SCHEMA = schema({
			
			id: {type: String, default: math.random(11111111111, 999999999999999)},
			name: {type: String, default: false},
			slug: {type: String, default: Slugify(currentObj["name"]), required: true},
			position: {type: Number},
			_index: {type: Number, default: i, required: true},
			product_id: {type: String, required: true, default: false},
			values: {type: Array, default: false}
		});
		
		currentObj = OPTIONS_SCHEMA.parse(currentObj);
		for (var u = 0; u < currentObj.values.length; u++) {
				var newValueObj = GDatamapper.expandToObject(currentObj.values[u], "title", {
				slug: Slugify(currentObj.values[u]),
				_index: u,
				parent_id: optionsArray[i].id,
				gillian: "test"
			})
			newValueObj = GDataMapOptionValues.validate().parse(newValueObj);
			currentObj.values[u] = newValueObj;
		}
		currentObj.valueDictionary = GDatamapper.parseToDictionary(currentObj.values, "id");
	//	throw currentObj;
		newArray.push(currentObj);
	}
	//throw newArray;
	
	return newArray;//GDatamapper.parseToDictionary(newArray, "id")
}

const parseVariants=function(inVariants, inOptionsArr) {
	var optionCount = 3;
	let variantArr = inVariants;
	
	variantArr.forEach(function(item, key) {
		let newTargetArray = new Array();
		
		for (var u = 1; u < optionCount + 1; u++) {
			
			//make array with chosen optiosn.
			
			if (!item[`option${u}`]){
				continue;
			} else {
				let searchString = Slugify(item[`option${u}`]);
				var myArr = inOptionsArr[u - 1].values.filter(function(option) {
					
					if (option.slug == searchString){
						return true;
					} else {
						return false;
					}
				})
				
				//check to make sure there is only one
				if (myArr.length != 1){
					throw "ERROR OPTION NOT FOUND";
				} else {
					newTargetArray.push(myArr[0]);
				}
				//console.log("finsihed array",newTargetArray);}
				
			}
		}
		item.options = GDatamapper.parseToDictionary(newTargetArray, "parent_id");
	})
	
	//console.log("VARIANT length" , newTargetArray);
	return variantArr.slice(0);
}




Vue.use(Vuex)


const person1 = { name: 'David Walsh', age: 33 };
const person2 = { name: 'David Walsh Jr.', role: 'kid' };

const SHOPIFY = new Vuex.Store({
	...shopify
});
const BASESTORE = {
	state: {
		_products: [],
		_imagesDictionary:false,
		_optionsDictionary: false,
		_productDictionary:false,
		_variantsDictionary: false,
		_currentProduct: false,
		_currentVariant: {},
		count: 7,
	},
	getters: {
		Products: state => {
			return state._products;
		},
		Variants: state=>{
		//return state._variants;
			if ( !state._variantsDictionary ){
				return [];
			}else{
				return Array.from(state._variantsDictionary.values());
			}
		},
		ProductDictionary: state =>{
		return state._productDictionary;
		},
		CurrentProduct: state => {
			return state._currentProduct;
		},
		VariantDictionary: state =>{
			return state._variantsDictionary;
		},
		CurrentVariant: state => {
			return state._currentVariant;
		},
		OptionsDictionary: state => {
			return state._optionsDictionary;
		},
		Options: state => {
			//return state._optionsDictionary;
			if ( !state._optionsDictionary ){
				return [];
			}else{
				return Array.from(state._optionsDictionary.values());
			}
		},
		Images: state => {
			//return state._optionsDictionary;
			if ( !state._imagesDictionary ){
				return [];
			}else{
				return Array.from(state._imagesDictionary.values());
			}
		},
		ImagesDictionary: state => {
			return state._imagesDictionary;
		},
		CurrentVariantImage: state => {
			return state._currentVariant;
		},
		CurrentOptionsSelected: state => {
			return state._currentOptionsSelected;
		},
	},
	mutations: {...{
		increment(state) {
			state.count++
		},
		increment2(state) {
			state.count++
		},
		["PRODUCT_IMAGE_REQUESTED"](state) {
			let requestedImageID = this.state._currentVariant.image_id;
			var newImage = this.state._currentProduct.images.find(function(image) {
				
				if (requestedImageID == image.id){
					
					
					return true;
				}
			});
			console.log("CURRENT image IS ",newImage);
			
			this.commit('PRODUCT_IMAGE_CHANGED', {
				image: newImage
			});
		},
		["PRODUCT_IMAGE_CHANGED"](state, payload) {
		
		},
		[SINGLE_OPTION_SELECTED](state, payload) {
			//	console.log('option selected');
		},
		[SINGLE_OPTION_CHANGED](state, index, optionValue) {
		},
		[CURRENT_VARIANT_CHANGED](state, payload) {
			console.log('----VARIANT ' , payload);
			
			this.state._currentVariant = payload;
			//this.commit('PRODUCT_IMAGE_REQUESTED');
			
		},
		[SHOPIFY_DATA_READY](state, products) {
		
		},
		
		["SHOPIFY_DATA_INIT"](state,  payload) {
			
			//INIT PRODUCTS
			this.state._products =payload.products;
			this.state._productDictionary= GDatamapper.parseToDictionary(payload.products, "id");
			console.log("INITING DATA~!!!",this.state._productDictionary);
			
		},
		["PARSE_VARIANTS"](state,  payload) {
			//INIT PRODUCTS
			var parsedVariants =parseVariants(payload.currentProduct.variants, payload.parsedOptions);
			 this.state._variantsDictionary= GDatamapper.parseToDictionary(	parsedVariants , "id");
			console.log("VARIANTS STATE" , this.state)
			console.log("!!!!!!!!!!!!!!!!! VARIANTS" , this.getters.Variants);
		},
		["PARSE_OPTIONS"](state,  payload) {
			//INIT PRODUCTS
			var parsedOptions = parseOptions(payload.currentProduct.options)
			this.state._optionsDictionary = GDatamapper.parseToDictionary(parsedOptions, "id");
			
			console.log("STATE IS!" ,	payload.currentProduct )
			
			this.commit('PARSE_VARIANTS', {currentProduct: this.state._currentProduct, parsedOptions: parsedOptions });
			
		},
		["PARSE_IMAGES"](state,  payload) {
			this.state._imagesDictionary = GDatamapper.parseToDictionary(payload.currentProduct.images, "id");
		},
		["SET_CURRENT_PRODUCT"](state, payload ) {
			if (payload.productID && this.state._productDictionary.get(payload.productID ) ){
					this.state._currentProduct =  this.state._productDictionary.get(payload.productID );
				this.commit('PARSE_IMAGES', {currentProduct: this.state._currentProduct});
				this.commit('PARSE_OPTIONS', {currentProduct: this.state._currentProduct});
				
			}else{
				throw "PRODUCT ERROR";
			}
		
		},
		[SHOPIFY_DATA_COMPLETE](state) {
			//	console.log('data completed mutation');
		}
	}},
	actions: {
		GET_CURRENT_VARIANT_BY_ID({dispatch, commit}, id) {
			if (!this.state._variants){
				return false;
			}
			let variantID = id;
			var foundVariant = this.state._variants.filter(function(variant) {
				
				if (variant.id == variantID){
					return true;
				}
			})
			
			if (foundVariant.length == 1){
				return foundVariant[0];
			} else {
				throw `ERROR FINDING VARIANT${productID}`
			}
			return false;
		},
		GET_CURRENT_PRODUCT_BY_ID({dispatch, commit}, id) {
			if (!this.state._products){
				return false;
			}
			let productID = id;
			var foundProduct = this.state._products.filter(function(product) {
				if (product.id == productID){
					return true;
				}
			})
			
			if (foundProduct.length == 1){
				return foundProduct[0];
			} else {
				throw `ERROR FINDING PRODUCT${productID}`
			}
			return false;
		},
		increment(context) {
			context.commit('increment')
		},
		incrementAsync({commit}) {
			setTimeout(() => {
				commit('increment2')
			}, 10000)
		},
		"SET_CURRENT_PRODUCT"({commit,state},payload) {
			commit('SET_CURRENT_PRODUCT',payload);
		},
		
		"SET_CURRENT_VARIANT"({commit, state}, payload) {
			if (payload.variantID == "false"){
				payload.variantID = false;
			}
			
			if (!payload.variantID && !payload.selectedVariant){
				//set default
				commit('CURRENT_VARIANT_CHANGED', this.getters.Variants[0]);
				return;
			}
			
			//if there is an id
			if (payload.variantID && !payload.selectedVariant){
				
				if (this.state._variantsDictionary.get(payload.variantID)){
					commit('CURRENT_VARIANT_CHANGED', this.state._variantsDictionary.get(payload.variantID));
					return;
				}
				
			}
			
			if (payload.selectedVariant){
				///actual variant selected
				commit('CURRENT_VARIANT_CHANGED', payload.selectedVariant);
				return;
			}
		},
		"SHOPIFY_DATA_INIT"({commit,state},payload) {
			
			const PRODUCT_DATA_SCHEMA = schema(
				{
					//productID: {type: String, default: this.products[0].id},
					//variantID: {type: Number, default: this.products[0].variants[0].id},
					products: {type: Array, required: true},
				});
			if ( PRODUCT_DATA_SCHEMA.parse(payload) ){
				commit('SHOPIFY_DATA_INIT',payload);
			}
		},
		"IS_READY"({commit}) {
			//	console.log(payload);
			//	commit('SINGLE_OPTION_SELECTED');
			
		}
	},
}


 BASESTORE.mutations = {...BASESTORE.mutations, ...shopify.mutations}
  BASESTORE.actions = {...BASESTORE.actions, ...shopify.actions}
BASESTORE.state = {...BASESTORE.state, ...shopify.state}

console.log(BASESTORE);
export default new Vuex.Store(BASESTORE);
