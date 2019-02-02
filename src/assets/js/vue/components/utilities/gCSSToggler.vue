<template>
	<div class="gCSSToggler">
		THE list


		<h5 id="testelement">CSS TOGGLER</h5>
		<h5>Filter Panel</h5>
		<multiselectList :showPointer=false ref="filterPanel"  v-model="scfilters[0].value"
		                 @input="filterChange"
		                 :searchable="false"
		                 :multiple="true"
		                 :options="scfilters[0].options">

		</multiselectList>
		<button @click="groupSelect(true)">select all</button><button @click="groupSelect(false)">select</button>
		<button @click="clearSearch()">Clear SEARCH x</button><multiselect
			:close-on-select="false"
			:clear-on-select="false"
			:preserve-search="true"
			placeholder="Pick some"
			label="selector"
			track-by="selector"
		             :options="options"
		             v-model="value"
		             @input="_updateStyle"
		             :taggable="false"
		             ref="optionselect"
		             :multiple="true"
		             :searchable="true"
			:internal-search="false"
			:clearOnSelect=true

			:show-no-results="false"
			@search-change="fuseFind"

		             :allow-empty="true">
		</multiselect>

		<div><textarea rows="4" cols="50">
			{{cssClassesString}}</textarea>
		</div>
	</div>
</template>

<script>

	import multiselect from 'vue-multiselect'
	import multiselectList from '@/components/utilities/gMultiselectList.vue'

	import Fuse from 'fuse.js';

	import {filterArrayByValue} from '@/gUtilities/main.js';

	//import css_data from '@/assets/pattern-lab-style-audit.json';
	import css_data from '@/assets/tachyons-style-audit.json';

	import Vue from 'vue';

const FUSE_FILTER_MODE_OR =  {
				shouldSort: false,
				threshold: 0.4,
				location: 0,
				distance: 100,
				matchAllTokens: false,
				findAllMatches: true,
				tokenize: true,

				maxPatternLength: 32,
				minMatchCharLength: 1,
				keys: [
					"selector"
				]
			};

	const FUSE_FILTER_MODE_AND=	 {
				threshold: 0.4,
				location: 0,
				distance: 100,
				findAllMatches: true,
				maxPatternLength: 32,
				minMatchCharLength: 1,
				keys: [
					"selector"
				]
			};


	const SEARCH_FILTER_MODE  = "AND"; //or OR


	//throw fuse.search('old')

	export default {
		name: 'gCSSToggler',
		data: function() {
			return {
				isLoading: false,
				value: false,
				baseoptions:[],
				scfilters:[{
				options: [ 'accent' , 'dark', 'san serif','u-reset-rhythm'],
					value:false
				}],
				options: [],

						greeting:['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched'],

			}
		},
		components: {multiselect,multiselectList},
		props: {
			targetEl: {
				type: String, Boolean,
				default: false,
				required: false
			},
		},
		created:function(){
			console.log("hello");
			this.$data.baseoptions = Array.from(css_data.simpleSelectors.classes, function(selector){
				 return {$isDisabled :false,
					 $isSelected : false,
					 selector : ( selector.startsWith('.') ) ? selector.substr(1,selector.length) : selector,
					 title: "Old Man's War"
				 }
			 } );
			this.Options = this.$data.baseoptions;
			var fuseoptions = {
				keys: ['selector']
			}




			//	throw fuse.search('san  serif lg')
		},
		mounted:function(){
			this.$refs.filterPanel.isOpen=true;
			this._updateStyle();
		},
		methods: {
			filterChange:function() {
				console.log("FILTER CHANGEDQ" ,this.$data.scfilters, this.filterStr());
				this.fuseFind(this.SearchQuery);
			},
			_updateStyle:function(){

				console.log("HIHIHI",this.TokenClassList)
				if ( this.targetEl && this.TokenClassList)
				{
					document.querySelectorAll(this.targetEl).forEach(el => {
						el.className="";
						el.classList.add(...this.TokenClassList);
					});
				}

			},
			fuseFindPreset () {

				if ( this.filterStr() ){
					var query = this.filterStr();
					var _fuse = new Fuse(Array.from(this.$data.baseoptions), FUSE_FILTER_MODE_OR)
					var searchResults= _fuse.search(query);

					this.$data.options = searchResults;
					console.log("SEARCHING total slectors" , this.$data.baseoptions.length, 'query ',query,"results ", searchResults.length );

				}else{
					this.$data.options = this.$data.baseoptions;
					console.log("NO filter items selected")
				}

			},
			_fuseSearch( _query= this.filterStr(), _options = this.$data.baseoptions, _fuse_options = FUSE_FILTER_MODE_OR ){
				if (!_query){
					console.log("BUSTED")
					return;
				}
				return	 ( _query && _query.length > 0 ) ? new Fuse(Array.from(_options), _fuse_options).search(_query) : false;
			},
			fuseFind (query) {
				this.isLoading = true

				//SEARCH_FILTER_MODE
				var currentOptions = Array.from(this.$data.baseoptions);

				if ( SEARCH_FILTER_MODE == "AND"){
					//use only options that match filters.
					//throw "DOING FILREE", this.filterStr();
					currentOptions= 	( this.filterStr() ) ? this._fuseSearch(this.filterStr(),currentOptions,FUSE_FILTER_MODE_OR)  : currentOptions;
				}else if (SEARCH_FILTER_MODE == "OR"){
					///do something??
				}

				if (query && query.length>2){

					var searchResults= 	this._fuseSearch(query,currentOptions,FUSE_FILTER_MODE_AND);

					if (searchResults && searchResults.length>1 ){
						this.$data.options = searchResults;
						console.log("SEARCHING total slectors" , currentOptions.length, 'query ',query,"results ", searchResults.length );
					}
				}else{
console.log('NO QUERY', currentOptions.length);
					if (currentOptions && currentOptions.length>1 ){

						this.$data.options = currentOptions;
					}
				}
			},
		groupDisable:function (bool){
			let _bool = bool;
				this.$data.options.forEach(function(option) {
				console.log(option)

				//	Vue.set(option, '$isDisabled', _bool);
					Vue.set(option, '$isSelected', _bool);
				});
		},
			groupSelect:function (bool){
				let _bool = bool;

				if ( bool ){
					this.$data.value=this.$data.options.slice(0);
				}else{
					this.$data.value=[];
				}

			},
			clearSearch:function( newVal=  this.$data.baseoptions){
				this.Options =newVal;

			},
			filterStr:function(  ){

				let str="" ;
				this.$data.scfilters.forEach(function(scfilter){
					if (scfilter.value &&  scfilter.value.join ){
						str += scfilter.value.join(" ");
					}
				})
				return (str.length>3) ? str : false;
			}
		},
		computed: {
			SearchQuery:function(){
				return this.$refs.optionselect.search;
			},
			PresetFilteredOptions:function() {

			},
			TokenClassList:function(){
				if ( this.$data.value ){
					//return Array.from( );

					return Array.from( this.$data.value, function(selectorObj){

						if ( selectorObj.selector ){
							return  selectorObj.selector;
						}else{
							return false;
						}

					} );
						}


			},
			Options: {
				get: function() {
					return Array.from(this.$data.options);
				},
				set: function(newVal) {
					//=newVal;
					this.$data.options = Array.from(newVal);
				}
			},
			cssClassesString: function() {
				if (!this.$data.value){
					return;
				}
				let str = ""
				if ( this.$data.value.length>0){
					 this.$data.value.forEach( function (item){
						str += `${item.selector} `
					})
				}
				return str;

			}
		}
	}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style src="tachyons/css/tachyons.min.css"></style>


		<style lang="scss" type="text/scss">

			.gCSSToggler{
				background: blue;
				margin: 10px;
			}

			.panelOpen{
background: red;
				.multiselect__content-wrapper{
					position: relative;
					height:100%;
				}
			}

			p {
		font-size: 2em;
		text-align: center;
	}
</style>