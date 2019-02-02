<template>
	<div class="gButtonGroup" v-bind:maxSelected="MaxSelected">
		I AM BUTTON GROUP
		<gToggleButton ref="gToggleButton" v-for="item in Items" v-bind:key="getRandomInt()"
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
			items: Array
		},
		updated: function(evt) {

		},
		created: function(evt) {
			this.MaxSelected = this.maxSelected;
			this.Items = this.items;
			this.$nextTick(function() {
				//this.updateSelectedStatus();

			})
		},
		computed: {
			SelectedCount: function() {
				return this.Items.filter(item => item.active).length;
				//	return this.$data.selected.length;
			},
			isMaxSelected: function() {
				if (this.$data.selected.length >= this.$data._maxSelected){
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
					this.$data._maxSelected = _buttons;
				}
			},
			Selected: {
				get: function() {
					return this.$data.selected;
				},
				// setter
				set: function(newValue) {
					this.$data.selected = newValue;
				}
			}
		},
		methods: {
			getRandomInt: function(min = 0, max = 999999999999) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			getItemByGuid: function(guid) {

				return this.Items.filter(item => item.guid == guid);
			},
			updateSelected: function(vo, vm, data2) {
				this.Selected = this.$refs.gToggleButton.filter(item => item.isActive);
				this.$emit("changed", this.Selected.map(item => item.Data), "hello");

				for (var i = 0; i < this.$refs.gToggleButton.length; i++) {

					var button = this.$refs.gToggleButton[i];
					if (this.isMaxSelected){
						if (!button.isActive){
							button.isDisabled = true;

						} else {
							button.isDisabled = false;

						}
					} else {
						if (!button.isActive){
							button.isDisabled = false;

						} else {
							button.isDisabled = false;
						}
					}
				}
			}
		},
		data() {
			return {
				_items: false,
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
