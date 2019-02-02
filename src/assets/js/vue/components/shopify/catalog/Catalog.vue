<template>
<div>
	Catalog
	<button @click="getProducts()">get products</button>
	<br>
	<code>{{ `${products.length} products fetched yet!` }}</code>
	<br>
	<br>
	<button @click="getProduct({ params: { id: 12 } })">get post with id 12</button>
	<br>

</div>
</template>
<script type="text/javascript">
	import Vue from 'vue';

	import store from '@/store'
	import { mapState, mapActions } from "vuex";


	let self = this;

	export default {
		name: 'shopify-catalog',
		props: {
		},
		computed: mapState({
			products: state => state._products,
		}),
		created:function(){
		},
		methods: {
			...mapActions([
				"getProduct",
				"getProducts",
			])
		},
		data: function() {
			return {}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>

	.g-Button {
		background: yellow;
		&.active {
			background: green;
		}
	}
</style>
