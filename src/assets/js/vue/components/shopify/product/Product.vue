<template>
		<div class="product-wrapper">

			<div>
				<ProductImages :images="Images"></ProductImages>
			</div>
			<div>
				<div class="current-product">{{CurrentProduct.title}}</div>
				<div class="quantity-selector">
					<vue-numeric-input class="quantity-selector__input"  v-model="selectedQuantity" :min="1" :max="QuantityMax" :step="1"></vue-numeric-input>
					<h6 class="quantity-selector__available">available: {{QuantityMax}}</h6>
				</div>
				<button>
					Add to cart
				</button>
				<productOptionSelect  :variants="Variants"  :selectedVariant="CurrentVariant" v-on:variant="variantChanged"></productOptionSelect>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

	import Vue from 'vue';
	import productOptionSelect from '@/components/shopify/product/ProductOptionSelector.vue'
	import ProductImages from '@/components/shopify/product/ProductImages.vue'
	import store from '@/store'
	import {mapState, mapActions} from "vuex";

	const schema = require("schm");
	import {Slugify, setQueryStringParameter, GDatamapper} from '@/gUtilities/main.js'
	import {mapGetters} from 'vuex'
	import VueNumericInput from 'vue-numeric-input';

	export default {
		name: 'Product',
		components: {
			productOptionSelect,
			ProductImages,
			VueNumericInput
		}, props: {
			producthandle: {
				type: String,
				default: 'not set'
			},
			productID: Number,
			currentproduct: Object,
			products: Array,
			variantID: {
				required: false,
			},
			currentvariant: Object,
		},

		data() {
			return {
				productDictionary: false,
				selectedQuantity: 1,
				selectedVariant: false,
			}
		},
		created: function() {
			const PRODUCT_SCHEMA = schema(
				{
					productID: {type: String},
					variantID: {type: String, default: false},
					products: {type: Array, required: true},
				});

			let payload = PRODUCT_SCHEMA.parse(this.$props);

			this.getProduct({params: {id: this.producthandle}}).then(function(res) {
				payload = Object.assign(payload);
				payload.products = [res.data.product]
				store.dispatch('SHOPIFY_DATA_INIT', payload).then(function(res) {
					if (payload.productID){
						store.dispatch('SET_CURRENT_PRODUCT', payload).then(function(res) {
							store.dispatch('SET_CURRENT_VARIANT', payload);
						});
					}
				})
			})

		},
		mounted: function() {

		}, computed: {
			QuantityMax: function() {
				//return 22;
				if (!this.CurrentVariant){
					return 1;
				} else {
					if (this.$data.selectedQuantity > this.CurrentVariant.inventory_quantity){
						this.$data.selectedQuantity = this.CurrentVariant.inventory_quantity;
					}
					return this.CurrentVariant.inventory_quantity;
				}
			},
			...mapGetters([
				'VariantDictionary',
				'Variants',
				'Options',
				'OptionsDictionary',
				'CurrentProduct',
				'CurrentVariant',
				'Images'
				// ...
			])
		},

		methods: {

			...mapActions([
				'getProduct'
				// ...
			]),
			variantChanged: function(variant) {
				console.log(">>>>>>>>>>>.NEW VARIANT", variant)

				if (variant != undefined){
					store.dispatch('SET_CURRENT_VARIANT', {selectedVariant: variant});
					setQueryStringParameter("variant", variant.id);
				}
			},
		}
	}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">

	//@import "../assets/g-Patternlab-config.json";
	.multiselect__tags {

	}

	.product-wrapper {
		display: grid;
		grid-template-columns: 500px 1fr;
	}

	.quantity-selector {
		display: flex;
		align-items: center;
		height: 100%;
		&____available {
			margin-left: 20px;
		}
		&__input {

		}
	}

	.multiselect__content-wrapper {
		display: block;
	}

	.optionbutton {
	}

	.option__swatch {
		border: 1px solid black;
		height: 50px;
		width: 50px;
	}


</style>
