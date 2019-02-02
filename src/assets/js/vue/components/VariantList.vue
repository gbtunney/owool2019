<template>

  <div class="product option selector">
   <h2>Product Single Option Selector</h2>

    <div>{{ProductOptionName}}</div>
    <div>Selected Count {{SelectedOptionCount }}</div>
    <gButtonGroup ref="productOptionSelector" v-on:changed="productOptionChanged" v-bind:items="Options" class="properButtonGroup" :maxSelected="6">

    </gButtonGroup>

  </div>

</template>

<script type="text/javascript">

	import Vue from 'vue';
	import VueNumericInput from 'vue-numeric-input'
    import gButtonGroup from '@/components/gButtonGroup.vue';

	 function getRandomInt(min = 0, max = 999999999999) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	export default {
  name: 'ProductOptionSelector',
		components: {
			gButtonGroup,
			VueNumericInput
		},
		created: function (evt) {
  	//INITIALIZE SELECTOR
			 this.Options = this.values.map(function (item) {
			 	var _guid =  getRandomInt()
				return {dataObj: {label: item,guid:_guid }, guid: _guid };
			});
		},
		computed: {
			ProductOptionName:function (){
				return this.$data._optionName;
            },
			ProductOptionKey:function (){
				return `option${this.$data.position}`;
			},
			Options: {
				get: function () {
					return this.$data._options ;
				},
				// setter
				set: function (newValue) {
					this.$data._options = newValue;
				}
			},
			SelectedOptions: {

				get: function () {
					return this.$data._selectedOptions ;
				},
				// setter
				set: function (newValue) {
						this.$data._selectedOptions= newValue;
				}
			},SelectedOptionCount: function () {
				return this.$data._selectedOptions.length;
			}
  },
	methods: {
		productOptionChanged: function (data) {
			// `this` inside methods points to the Vue instance
			console.log('******SINGLE OPTION CHANGE'+data)
            this.SelectedOptions = data;
			this.$emit("optionchanged", this.$data, data);
		}
	},
  data () {
    return {
	    id: 2643071074422,
	    product_id: 1919179161718,
	    _optionName: "Color",
        _options:[],
        _selectedOptions:[],
	    position: 1,
	    values: [
		    "Alumroot",
		    "Ash",
		    "Basswood",
		    "Bee-Balm",
		    "Bluebell",
		    "Cresheim Creek",
		    "Cedar Berry",
		    "Fringetree",
		    "Ganoga Falls",
		    "Gingko Nut",
		    "Gray Birch",
		    "Juneberry",
		    "Pachysandra",
		    "Porcupine",
		    "Purple Loosestrife",
		    "Red Squirrel",
		    "River Oat",
		    "Scarlet Oak",
		    "Steelhead",
		    "Wild Geranium",
		    "Wissahickon",
		    "Wood Dove",
		    "Wood Fern"
	    ],

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss"  scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
div{
  background: red;
}

$generate-swatch-classes: false!default;
$generate-type-classes: true!default;
$generate-scheme-classes:true!default;
$generate-utility-padding: true!default;
$generate-utility-static:true!default;
$generate-components:FALSE!default;
</style>
