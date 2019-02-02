<template>
	<div>
		<swiper :options="swiperOption" ref="mySwiper">
			<!-- slides -->
			<swiper-slide v-for="image,index in images" :key="index">
				<div class="swiper-zoom-container">
					<img class="slide-image" :src="image.src" :alt="image.alt">
				</div>
			</swiper-slide>

			<!-- Optional controls -->
			<div class="swiper-pagination"  slot="pagination"></div>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
			<div class="swiper-scrollbar"   slot="scrollbar"></div>
		</swiper>
	</div>
</template>

<script type="text/javascript">

	import Vue from 'vue';
	import store from '@/store'
	import {swiper, swiperSlide} from 'vue-awesome-swiper'
	import { mapGetters } from 'vuex'

	export default {
		name: 'ProductImages',
		components: {
			swiper,
			swiperSlide
		}, props: {
			images: Array,
			currentImage: {required: false}
		},
		methods: {
			SlideTo: function(image_id) {
				var currentImage = this.ImagesDictionary.get(image_id.toString());
				console.log("IMAGES", currentImage);
				this.swiper.slideTo(currentImage._index, 1000, false)
			},
			GetCurrentSlideIndex: function() {

				var index = this.state._currentProduct.images.findIndex(function(image) {
					if (requestedImageID == image.id){
						return true;
					}
				});
			},
		},
		watch: {
			CurrentVariant: function(val) {
				console.log("imagesCURRENTVARIANT", val);
				this.SlideTo(val.image_id);
			}
		},
		computed: {

			swiper: function() {
				return this.$refs.mySwiper.swiper;
			},
			CurrentImageIndex: function() {

			},
			...mapGetters([
				'CurrentProduct',
				'CurrentVariant',
				'Images',
				'ImagesDictionary'
				// ...
			])
		},
		data() {

			return {
				msg: 'Welcome to Your Vue.js App',
				_productImages: [],
				_currentImage: undefined,
				_currentSlideIndex: 0,
				_images: undefined,
				swiperOption: {
					zoom: true,
					speed: 1000,
					spaceBetween: 0,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					pagination: {
						el: '.swiper-pagination'
					}
				}
			}
		}
	}

</script>
<style src="swiper/dist/css/swiper.css"></style>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss"  >
	//@import "../assets/g-Patternlab/config/variables";
	// @import "../assets/g-Patternlab/config/";
	//@import "../assets/g-Patternlab-config.json";


	.slide-image{
		height: 100%;
		width: 100%;
	}
	.swiper-container {
		width: 100%;
		height: auto;
	}
	.swiper-slide {
		overflow: hidden;
	}
		.swiper-slide {
		/*text-align: center;
		font-size: 18px;
		background: #fff;
		!* Center slide text vertically *!
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;*/
	}


	$generate-swatch-classes: false!default;
	$generate-type-classes: true!default;
	$generate-scheme-classes:true!default;
	$generate-utility-padding: true!default;
	$generate-utility-static:true!default;
	$generate-components:FALSE!default;
</style>
