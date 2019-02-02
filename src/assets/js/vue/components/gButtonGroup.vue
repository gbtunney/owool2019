<template>

	<div class="gButtonGroup" v-bind:maxSelected="MaxSelected">
		<gToggleButton ref="gToggleButton" v-for="item,key in Buttons" v-bind:key="key"
		               v-on:changed="updateSelected"
		               v-bind:guid="item.id" v-bind:active="item.active" v-bind:disabled="item.disabled"
		               v-bind:dataObj="item.dataObj" message="GILLIAN CHILD COMPONENT"></gToggleButton>

	</div>
</template>


</template>

<script type="text/javascript">

	import Vue from 'vue';
	import gToggleButton from '@/components/gToggleButton.vue';

	export default {
		name: 'gButtonGroup',
		components: {
			gToggleButton
		}, props: {
			maxSelected: Number,
			items: Array,
			mutuallyExclusive:Boolean
		},
		updated: function(evt) {

		},
		created: function(evt) {
			this.MaxSelected = this.maxSelected;
			this.Buttons = this.items;

			this.$on('maxSelectionReached', () => {
				console.log('maxSelectionReached event listened'); // It'a never fired

				for (var i =0; i<this.Buttons.length;i++){
					Vue.set(this.Buttons[i], "disabled", !this.Buttons[i].active);

				} ;
			});
		},
		computed: {
			SelectedCount: function() {
				return this.Selected.length;
			},
			isMaxSelected: function() {

				if (this.SelectedCount >= this.$data._maxSelected){
					return true;
				} else {
					return false;
				}
			},
			MaxSelected: {
				get: function() {
					return this.$data._maxSelected;
				},
				// setter
				set: function(newValue) {
					this.$data._maxSelected = newValue;
				}
			}, Buttons: {

				get: function() {
					return this.$data._buttons;
				},
				// setter
				set: function(newValue) {
					this.$data._buttons = newValue;
				}
			},
			Selected: function(){
				return this.$data._buttons.filter(item => item.active);
			}
			,
			SelectedCount: function(){
				return this.$data._buttons.filter(item => item.active).length;
			}

		},
		methods: {
			getRandomInt: function(min = 0, max = 999999999999) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			getItemByGuid: function(guid) {

				return this.Buttons.filter(item => item.guid == guid);
			},
			getIndex: function(guid){

				return this.Buttons.findIndex(button => button.guid == guid);
			},
			updateByIndex(index){
				if ( this.$data._buttons[index] ){
					Vue.set(this.$data._buttons[index], "disabled", true);
					console.log(this.Selected );
				}
			},
			updateSelected: function( newData, key ) {


				console.log(key);

				console.log(this.$data._buttons);

				var oldArray = this.Buttons.slice(0);

				oldArray[key] =newData;
				this.Buttons = oldArray;



				//this.$data._buttons.$set(0, newData);

				//	Vue.set(this.$data._buttons, key, newData);

				//	Vue.set(this.Buttons[2], "disabled", true);


				//	this.$emit("changed", this.Selected);


				//if (newData.active != this.getItemByGuid(newData.dataObj.guid).active ){

				//console.log("SELECTED COUNT " + this.SelectedCount)
				//	var index = this.getIndex( newData.dataObj.guid );
				//Vue.set(this.$data._buttons[index], "active", true);
				/*if (!this.mutuallyExclusive){
					if ( this.isMaxSelected ){

												for ( var i =0; i< this.Buttons.length; i++) {
													var button = this.Buttons[i];
													console.log(button);

													if (this.isMaxSelected){
														if (!button.active){
															//button.disabled = true;
															Vue.set(button, "disabled", true);

														} else {
															//..button.disabled = false;
															console.log('SETTING MAX ACTIVE AGAIN');
															Vue.set(button, "disabled", false);

														}
													} else {


														if (!button.active){
															//button.disabled = false;
															Vue.set(button, "disabled", false);


														} else {
															//button.disabled = false;
															Vue.set(button, "disabled", false);

														}
													}

													this.$data._buttons[i] = button;

												}


						this.$emit("maxSelectionReached", this.Selected);

					}else{
						//if ( this.$data._buttons[index] ){
						for (var i =0; i<this.Buttons.length;i++){
							Vue.set(this.Buttons[i], "disabled", false);
						}

					}
				}*/

				//}
			}
		},
		data() {
			return {
				selected: false,
				testString: "none here",
				counter: 1,
				_selectedCount: 0,
				_maxSelected: 0,
				_buttons: [{
					dataObj: {
						label: 'Todo A'
					},
					active: true,
					disabled: false
				}, {
					dataObj: {
						label: 'Todo A'
					},
					active: true,
					disabled: false
				}, {
					dataObj: {
						label: 'Todo A'
					},
					active: true,
					disabled: false
				}, {
					dataObj: {
						label: 'Todo A'
					},
					active: true,
					disabled: false
				}
				],
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
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

	div {
		background: red;
	}

	$generate-swatch-classes: false !default;
	$generate-type-classes: true !default;
	$generate-scheme-classes: true !default;
	$generate-utility-padding: true !default;
	$generate-utility-static: true !default;
	$generate-components: FALSE !default;
</style>
