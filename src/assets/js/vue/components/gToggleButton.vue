<template>
	<div v-on:click="isActive = !isActive" ref="gToggleButton"
	     v-bind:class="{ active: isActive, 'disabled': isDisabled }" class="g-Button">
		<slot>
			<div class="inner">

				<a v-if="Data.link" class="g-Button__link" v-bind:href="Data.link">{{activeMessage}}
					gillian{{Data.myMessage}}</a>
				<button v-else>{{disabledMessage}}: {{activeMessage}}:{{Data.label}}</button>
			</div>
		</slot>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue';

	let self = this;

	export default {
		name: 'gToggleButton',
		props: {
			message: {
				type: String
			},
			active: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			guid: {
				type: String
			},
			dataObj: {}
		},
		data: function() {
			return {
				_active: false,
				_disabled: false,
				_data: {}
			}
		},
		computed: {
			activeMessage: function() {
				if (this.$data._active){
					return 'active';
				} else {
					return 'notactive';
				}
			},
			disabledMessage: function() {
				// `this` points to the vm instance
				if (this.$data._disabled){
					return 'disabled';
				} else {
					return 'enabled';
				}
			},
			Guid: function() {
				return this.Data.guid;
			}
			,
			isActive: {
				// getter
				get: function() {
					return this.$data._active;
				},
				// setter
				set: function(newValue) {
					if (!this.$data._disabled){
						this.$data._active = newValue;
					}
				}
			},
			isDisabled: {
				// getter
				get: function() {
					return this.$data._disabled;
				},
				// setter
				set: function(newValue) {
					this.$data._disabled = newValue;
				}
			},
			Data: {
				// getter
				get: function() {
					return this.$data._data;
				},
				// setter
				set: function(newValue) {

					if ((typeof newValue == 'string') && (typeof JSON.parse(newValue) == 'object')){
						this.Data = JSON.parse(this.dataObj);
						this.$data._data = JSON.parse(newValue);

					} else {
						this.$data._data = newValue;
					}
				}
			},
			MyData: {
				// getter
				get: function() {
					return this.$data._data;
				},
				// setter
				set: function(newValue) {

					if ((typeof newValue == 'string') && (typeof JSON.parse(newValue) == 'object')){
						this.Data = JSON.parse(this.dataObj);
						this.$data._data = JSON.parse(newValue);

					} else {
						this.$data._data = newValue;
					}
				}
			}
		},
		created: function() {
			this.Data = this.dataObj;
			this.Message = this.message;
			this.isActive = this.active;
			this.isDisabled = this.disabled;
		},
		updated: function() {
			this.Data.active = this.isActive;
			console.log(this);

			var newData = new Object();
			newData = {
				active: this.isActive,
				disabled: this.isDisabled,
				dataObj: this.Data
			}

			var key = this.$vnode.key;
			this.$emit("changed", newData, key);
		}
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
