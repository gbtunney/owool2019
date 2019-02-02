<template>
    <div >
        <h5>SELECTED VARIANT {{selectedVariant.title}} VARIANT ID: {{selectedVariant.id}}</h5>
        <h5>INVENTORY AVAILABLE {{selectedVariant.inventory_quantity}} : PRICE {{selectedVariant.price}}</h5>
        <div class="attribute-panel" v-for="option,index in Options">
        <h3> {{option.name}}</h3>
            <slot name="search-icon"></slot>

            <multiselect :options="option.values"
                         v-model="selectedOptions[index]"
                         @input="_getVariantFromOptions()"
                         :class="option.slug"
                         :optionid="option.id"
                         v-on:close="selectClosed"

                         :key="index"
                         :taggable="false"
                         label="title"
                         ref="optionselect"
                         :multiple="false"
                         track-by="title"
                         :closeOnSelect="false"
                         :searchable="_getSearchable(option)"
                         :allow-empty="false">

                <template slot="singleLabel"  slot-scope="props">
                    <div class="optionbutton" >{{ props.option.title }}</div>
                </template>
                <template slot="selection" slot-scope="{ values, searchable,search, isOpen }">SELECTION SLOT             <div v-if="option.name == 'Color'" class="testicon"><icon_search></icon_search></div>
                    <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>

                <template slot="option" class="" slot-scope="props">
                    <img class="option__image" :src="props.option.img">
                    <div class="option__swatch"  v-bind:style="{ backgroundColor: props.option.color}"  style=""></div>
                    <div class="option__desc"><span class="option__title">{{props.option.color}}{{_getIsDisabled(props.option)}} {{ props.option.title }}</span></div>
                </template>
            </multiselect>
        </div>



        <multiselect :options="Variants"
                     v-model="selectedVariant"
                     @input="variantSelectorChanged"
                     track-by="title"
                     label="title"
                     ref="multiselectmaster"
                     :taggable="false"
                     :multiple="false"
                     :closeOnSelect="false"
                     placeholder="Select one"
                     :searchable="searchable"
                     :allow-empty="false">

            <template slot="singleLabel" slot-scope="{ option }">
                <strong>{{ option.id }}</strong> ID:<strong>  {{ option.title }}</strong>
            </template>

        </multiselect>

        <pre class="language-json"><code>{{ selectedVariant  }}</code></pre>


    </div>
</template>

<script type="text/javascript">

	import Vue from 'vue';
	import Multiselect from 'vue-multiselect'
	import { mapGetters } from 'vuex'
	import store from '@/store'


	export default {
		name: 'HelloWorld',
		components: {
			 Multiselect
		}, props: {
			searchable:{
				type: Boolean,
				default: false
			},
		},
        watch: {
	        selectedVariant: function (val) {
		       // this.$emit("variant", this.$data.selectedVariant);
                		        this.$emit("variant", this.$data.selectedVariant);

		        if ( val !=  this.$data.selectedVariant){
			       // this.$data.selectedVariant=val;

                    }
			},
	        CurrentVariant: function (val) {
	        	console.log("CURRENTVARIANT",val);
		        this.$data.selectedVariant = val;

		        //this is the first time thru only.
		        this._setSelectedOptions();
	        }
		},
		computed: {
			SelectedVariant:{
				get: function(){
					return this.$data.selectedVariant;
                },
                set: function (newVal){
					this.$data.selectedVariant = newVal;  ///this.Variants[this.CurrentVariant._index];
                }
            },
			SelectedOptions: function() {
				return this.$data.selectedOptions;
			},
			...mapGetters([
				'VariantDictionary',
				'Variants',
				'Options',
				'OptionsDictionary',
				'CurrentVariant'
				// ...
			])
		},
		methods: {
			selectClosed: function() {
				console.log("select was deactivated");
			},
			_getSearchable: function (option){
				return ( option.slug == "color") ? true : false;
            },
			_getIsDisabled: function(option) {
				var inverseMap = new Map(this.OptionsDictionary)  //.delete(option.id);
				inverseMap.delete(option.parent_id);

				let newFilteredArray = this.Variants;
				let optionSelf = option;

				newFilteredArray = newFilteredArray.filter(function(variant) {

					var foundArray = [];

					var optionID = optionSelf.parent_id;
					var optionValueID = optionSelf.id;

					if (optionValueID == variant.options.get(optionID).id){
						return true;
					}
				})

				let self = this;
				inverseMap.forEach(function(value, key, map) {
					let currentSelectedOption = self.$data.selectedOptions[value._index];
					if (currentSelectedOption){
						newFilteredArray = newFilteredArray.filter(function(variant) {

							var foundArray = [];

							var optionID = currentSelectedOption.parent_id;
							var optionValueID = currentSelectedOption.id;

							if (optionValueID == variant.options.get(optionID).id){
								return true;
							}
						})
					}
				});

				if (newFilteredArray.length < 1){
					Vue.set(option, '$isDisabled', true);
				} else {
					Vue.set(option, '$isDisabled', false);
				}
				return;

			},
			clickMe: function(){
				console.log("!!VARIANTS",this.Variants);
            },
			customLabel ({ title, desc }) {
				return `${title} – ${desc}`
			},
			_getVariantFromOptions: function() {
				let self = this;
				let mySelectedOptions = this.$data.selectedOptions;
				let newFilteredArray = this.Variants;

				for (let i = 0; i < mySelectedOptions.length; i++) {

					newFilteredArray = newFilteredArray.filter(function(variant) {

						var foundArray = [];

						var optionID = mySelectedOptions[i].parent_id;
						var optionValueID = mySelectedOptions[i].id;

						if (optionValueID == variant.options.get(optionID).id){
							return true;
						}
					})
				}
				var arrayAfterFilter = newFilteredArray;
				if (arrayAfterFilter.length == 1){
					console.log(" VARIANT THAT MEET CRITERIA FOUND ", this.$data.selectedOptions)
					console.log(arrayAfterFilter[0]);

					if (arrayAfterFilter[0] != this.SelectedVariant){
						this.SelectedVariant = arrayAfterFilter[0];

					}
				} else if (arrayAfterFilter.length >= 1){
					console.log(` ${arrayAfterFilter.length}MASTER VARIANT THAT MATCHES `, this.$data.selectedOptions)
				} else {
					console.log("NO MASTER VARIANT THAT MATCHES ", this.$data.selectedOptions)
					this._setSelectedOptions();
				}
			},
			_setSelectedOptions: function() {

				var selectedArr = new Array()

				if (this.$data.selectedVariant){
					this.$data.selectedOptions = [];
					for (var i = 0; i < this.Options.length; i++) {
						this.$data.selectedOptions.push(this.$data.selectedVariant.options.get(this.Options[i].id));
					}
				}
			},
			variantSelectorChanged: function() {
				console.log("VUEX ::VARIANT CHANGED!!! ", this.$data.selectedVariant);
				this._setSelectedOptions();
			}
		},
		filters: {
			toString: function (value) {
				if (!value) return ''
				value = value.toString()
				return value;
			}
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				totalOptions: 3,
				selectedOptions: [],
				selectedVariant:[],
			}
		}
	}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped >
    //@import "../assets/g-Patternlab/config/variables";
    // @import "../assets/g-Patternlab/config/";
    //@import "/assets/g-Patternlab-config.json";

    @import "@/assets/g-Patternlab-Project/_base.scss";

  //  @import "~@/assets/g-Patternlab/components/simple-component";

    @mixin aspect-ratio($width, $height) {
        position: relative;
        &:before {
            display: block;
            content: "";
            width: 100%;
            padding-top: ($height / $width) * 100%;
        }
        > .content {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }

    .multiselect__tags{

        @include g-new-simple-color-scheme(dark);


       // background: green;
    }
  /*  @mixin g-simple-icon($scheme:$chroma-active-scheme,$font:font-san-serif,$base-font-unit:1,$props:( background: true, foreground: true, accent:false,border:true,fill: foreground),$do-rhythm-spacing: true,$name: simple-component) {

        //has-unit
//todo: try to modify this so you can just pass in a map.. or add a temporary scheme? ??


        //TODO: Finish this.
        //  @include g-simple-color-scheme($scheme);
/*
        @if mixin-exists(dry) {
            @include dry($name, $DRY_ENABLED) {
                @include setType($base-font-unit, $font, 0);

                //todo : some sort of variable for this
                @if ($do-rhythm-spacing) {
                    @include rhythm-padding(.75, .75);
                }
                @content;
            }
        }
*/
  //  }

    /*SVG ICON SYSTEM*/
    .icon {
        display: inline-flex;
        align-self: center;
    }

    .icon svg, .icon img {
        height: 1em;
        width: 1em;
        fill: currentColor;
    }

    .icon.baseline svg, .icon img {
        top: .125em;
        position: relative;
    }

    .demo-button{


        $demo-obj: (
            color: (
                scheme: dark,
                props: (
                    background: true,
                    foreground: true,
                    accent:false,
                    border:true,
                    fill:foreground
                )
            ),
            font:(
                font-key: font-san-serif,
                scale-key:type,
                value: xxl
            ),
            spacing:(
                (css-prop: padding,
                    scale-key: button,
                    value: (
                        top: xl,
                        bottom: xl,
                        left: xl,
                        right: xl
                    ),
                ), (
                    css-prop: margin,
                    scale-key: button,
                    value: lg
                ),
            )
        );

       @include _base-component($demo-obj...){
         //   @include rhythm-spacing(padding,button,md,lg);
        }
    }

    /*-----------------*/
    /*-----------------*/
    /*-----------------*/
    /*PROTOTYPE EXAMPLE*/


    /*Red Lining*/
    h1:after, h2:after, h3:after, h4:after, h5:after, h6:after {
        width:100%;
        height:1px;
        content:"";
        position:absolute;
        bottom:.145833em;
        left:0;
        background-color:rgba(255, 0, 0, 0.23);
        z-index:-100;
    }
    h1:before, h2:before, h3:before, h4:before, h5:before, h6:before {
        width:100%;
        height:1px;
        content:"";
        position:absolute;
        top:.27em;
        left:0;
        background-color:rgba(255, 0, 0, 0.23);
        z-index:-100;
    }
    .newbutton{

        & > *{
           // background: green;
        }
    }

    .__icon-wrap{

        $font-size:get-font-size(map-get(get-font-map(font-serif-italic), size-scale), sm);

      //  @include  u-icon-svg(false,auto,$font-size);

        //@include rhythm(0,0,0,0,$font-size)
   //  @debug 'base-line-height  #{$base-line-height} $basefontsize#{ $base-font-size}   calc #{ (($base-line-height*1)/$base-font-size)} rhym #{ rhythm(1) }';
//
        //  padding: ( rhythm(( 2/ 1.2 ),$font-size))/2 0;
//padding: rhythm(3,  $font-size,$offset : ( $base-font-size - $font-size) ) * ($LINE_HEIGHT_RATIO* .1);
        ///rhythm(2,$font-size)
   //@debug 'LINE HEIGHT???#{rhythm(1,$font-size)- $font-size}';
    }
.__icon{
   // display: none;
//color:purple;

 //   content: 'hiiiiii';

}

.testgrid{
    display: grid;
    grid-template-columns: 1fr 3fr;
}

    .wrapper-with-intrinsic-ratio {
        position: relative;
        padding-bottom: 20%;
        height: 0;
    }
    .element-to-stretch {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: teal;
    }




    .testicon {
       // fill: green;
        @debug "THE SCHEME IS ";
     //   @debug $chroma-active-scheme;
    //    @include g-simple-icon();
      /*  @include g-simple-component(dark-accent-secondary,false,2,(background: true, foreground: true, fill: foreground,accent:true,border:true),false){

           // @include o-icon-svg(false, 2);
            width: ms(4);
            height: ms(4);
            padding: $base-leader;
            border-radius: 100%;
           //@include rhythm-padding(2, 2);


        }*/

    }



    .multiselect__content-wrapper{
        display: block;
       // background: yellow;
    }
    .optionbutton{
        border: 0px solid red;
    }

    .attribute-panel{
        background: #eeeeee;padding: 30px;
        margin-bottom: 20px;
    }
    .option__swatch{
       // background: yellow;
        border:1px solid black;
        height: 50px;width: 50px;
    }
    code{

    }
    .multiselect{
        .option__swatch{
            display: none;


        }
        &.color{
            .option__swatch{
                display: block;
            }
        }
    }

    //real
    .multiselect__tag{
background: red;
    }

    $generate-swatch-classes: false!default;
    $generate-type-classes: true!default;
    $generate-scheme-classes:true!default;
    $generate-utility-padding: true!default;
    $generate-utility-static:true!default;
    $generate-components:FALSE!default;
</style>
