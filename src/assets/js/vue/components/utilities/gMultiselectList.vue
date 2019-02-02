<template>
	<div
		class="multiselect__content-wrapper multiselectlist"
		:class="DisplayMode"

		tabindex="-1"
		@mousedown.prevent
		:style="{ maxHeight: optimizedHeight + 'px' }"
		ref="list">
		<ul class="multiselect__content " :style="contentStyle">
			<slot name="beforeList"></slot>
			<li v-if="multiple && max === internalValue.length">
              <span class="multiselect__option">
                <slot name="maxElements">Maximum of {{ max }} options selected. First remove a selected option to select another.</slot>
              </span>
			</li>
			<template v-if="!max || internalValue.length < max">
				<li class="multiselect__element" v-for="(option, index) of filteredOptions" :key="index">
                <span
	                v-if="!(option && (option.$isLabel || option.$isDisabled))"
	                :class="optionHighlight(index, option)"
	                @click.stop="select(option)"
	                @mouseenter.self="pointerSet(index)"
	                :data-select="option && option.isTag ? tagPlaceholder : selectLabelText"
	                :data-selected="selectedLabelText"
	                :data-deselect="deselectLabelText"
	                class="multiselect__option">
                    <slot name="option" :option="option" :search="search">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
					<span
						v-if="option && (option.$isLabel || option.$isDisabled)"
						:data-select="groupSelect && selectGroupLabelText"
						:data-deselect="groupSelect && deselectGroupLabelText"
						:class="groupHighlight(index, option)"
						@mouseenter.self="groupSelect && pointerSet(index)"
						@mousedown.prevent="selectGroup(option)"
						class="multiselect__option">
                    <slot name="option" :option="option" :search="search">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
				</li>
			</template>
			<li v-show="showNoResults && (filteredOptions.length === 0 && search && !loading)">
              <span class="multiselect__option">
                <slot name="noResult">No elements found. Consider changing the search query.</slot>
              </span>
			</li>
			<li v-show="showNoOptions && (options.length === 0 && !search && !loading)">
              <span class="multiselect__option">
                <slot name="noOptions">List is empty.</slot>
              </span>
			</li>
			<slot name="afterList"></slot>
		</ul>
	</div>
</template>

<script>
	import multiselectMixin from 'vue-multiselect/src/multiselectMixin'
	import pointerMixin from 'vue-multiselect/src/pointerMixin'

	export default {
		name: 'vue-multiselectlist',
		mixins: [multiselectMixin, pointerMixin],
		props: {
			/**
			 * name attribute to match optional label element
			 * @default ''
			 * @type {String}
			 */
			name: {
				type: String,
				default: ''
			},
			/**
			 * String to show when pointing to an option
			 * @default 'Press enter to select'
			 * @type {String}
			 */
			selectLabel: {
				type: String,
				default: 'Press enter to select'
			},
			/**
			 * String to show when pointing to an option
			 * @default 'Press enter to select'
			 * @type {String}
			 */
			selectGroupLabel: {
				type: String,
				default: 'Press enter to select group'
			},
			/**
			 * String to show next to selected option
			 * @default 'Selected'
			 * @type {String}
			 */
			selectedLabel: {
				type: String,
				default: 'Selected'
			},
			/**
			 * String to show when pointing to an already selected option
			 * @default 'Press enter to remove'
			 * @type {String}
			 */
			deselectLabel: {
				type: String,
				default: 'Press enter to remove'
			},
			/**
			 * String to show when pointing to an already selected option
			 * @default 'Press enter to remove'
			 * @type {String}
			 */
			deselectGroupLabel: {
				type: String,
				default: 'Press enter to deselect group'
			},
			/**
			 * Decide whether to show pointer labels
			 * @default true
			 * @type {Boolean}
			 */
			showLabels: {
				type: Boolean,
				default: true
			},
			/**
			 * Limit the display of selected options. The rest will be hidden within the limitText string.
			 * @default 99999
			 * @type {Integer}
			 */
			limit: {
				type: Number,
				default: 99999
			},
			/**
			 * Sets maxHeight style value of the dropdown
			 * @default 300
			 * @type {Integer}
			 */
			maxHeight: {
				type: Number,
				default: 300
			},
			/**
			 * Function that process the message shown when selected
			 * elements pass the defined limit.
			 * @default 'and * more'
			 * @param {Int} count Number of elements more than limit
			 * @type {Function}
			 */
			limitText: {
				type: Function,
				default: count => `and ${count} more`
			},
			/**
			 * Set true to trigger the loading spinner.
			 * @default False
			 * @type {Boolean}
			 */
			loading: {
				type: Boolean,
				default: false
			},
			/**
			 * Disables the multiselect if true.
			 * @default false
			 * @type {Boolean}
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * Fixed opening direction
			 * @default ''
			 * @type {String}
			 */
			openDirection: {
				type: String,
				default: ''
			},
			/**
			 * Shows slot with message about empty options
			 * @default true
			 * @type {Boolean}
			 */
			showNoOptions: {
				type: Boolean,
				default: true
			},
			showNoResults: {
				type: Boolean,
				default: true
			},
			tabindex: {
				type: Number,
				default: 0
			},
		displayMode: {
			type: String,
			default: "horizontal"
		}
		},
		computed: {
			DisplayMode:function(){
			return 	`multiselectlist--${this.displayMode}`;
			},
			isSingleLabelVisible () {
				return (
					this.singleValue &&
					(!this.isOpen || !this.searchable) &&
					!this.visibleValues.length
				)
			},
			isPlaceholderVisible () {
				return !this.internalValue.length && (!this.searchable || !this.isOpen)
			},
			visibleValues () {
				return this.multiple ? this.internalValue.slice(0, this.limit) : []
			},
			singleValue () {
				return this.internalValue[0]
			},
			deselectLabelText () {
				return this.showLabels ? this.deselectLabel : ''
			},
			deselectGroupLabelText () {
				return this.showLabels ? this.deselectGroupLabel : ''
			},
			selectLabelText () {
				return this.showLabels ? this.selectLabel : ''
			},
			selectGroupLabelText () {
				return this.showLabels ? this.selectGroupLabel : ''
			},
			selectedLabelText () {
				return this.showLabels ? this.selectedLabel : ''
			},
			inputStyle () {
				if (
					this.searchable ||
					(this.multiple && this.value && this.value.length)
				) {
					// Hide input by setting the width to 0 allowing it to receive focus
					return this.isOpen
						? { width: 'auto' }
						: { width: '0', position: 'absolute', padding: '0' }
				}
			},
			contentStyle () {
			/*	return this.options.length
					? { display: 'inline-block' }
					: { display: 'block' }*/
			},
			isAbove () {
				if (this.openDirection === 'above' || this.openDirection === 'top') {
					return true
				} else if (
					this.openDirection === 'below' ||
					this.openDirection === 'bottom'
				) {
					return false
				} else {
					return this.prefferedOpenDirection === 'above'
				}
			},
			showSearchInput () {
				return (
					this.searchable &&
					(this.hasSingleSelectedSlot &&
					(this.visibleSingleValue || this.visibleSingleValue === 0)
						? this.isOpen
						: true)
				)
			}
		},
	created:function(){

		this.$data.isOpen=true;
	},
		mounted:function(){

		//	this.activate();
		},
		updated:function(){
			//console.log("updatedACTIVATING!!");
			//this.isOpen=true;
			//this.showPointer=false;
		}
	}
</script>

<style lang="scss" type="text/scss" scoped>
	@import "~@/assets/g-Patternlab-Project/_base.scss";

	@import "~@/assets/g-Patternlab/components/simple-component";


	%quick-button{
		//needs to include color, type, padding
		//@include g-color-scheme(dark);
		//@include setType(2, font-san-serif, 0);
		///@include rhythm-padding(1,2);
	}
	fieldset[disabled] .multiselect {
		pointer-events: none;
	}



	.multiselect__spinner {
		position: absolute;
		right: 1px;
		top: 1px;
		width: 48px;
		height: 35px;
		background: #fff;
		display: block;
	}

	.multiselect__spinner:before,
	.multiselect__spinner:after {
		position: absolute;
		content: "";
		top: 50%;
		left: 50%;
		margin: -8px 0 0 -8px;
		width: 16px;
		height: 16px;
		border-radius: 100%;
		border-color: #41b883 transparent transparent;
		border-style: solid;
		border-width: 2px;
		box-shadow: 0 0 0 1px transparent;
	}

	.multiselect__spinner:before {
		animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
		animation-iteration-count: infinite;
	}

	.multiselect__spinner:after {
		animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
		animation-iteration-count: infinite;
	}

	.multiselect__loading-enter-active,
	.multiselect__loading-leave-active {
		transition: opacity 0.4s ease-in-out;
		opacity: 1;
	}

	.multiselect__loading-enter,
	.multiselect__loading-leave-active {
		opacity: 0;
	}

	.multiselect,
	.multiselect__input,
	.multiselect__single {

		//font-family: inherit;
		touch-action: manipulation;
	}

	.multiselect {
		border:1px solid grey;
		box-sizing: content-box;
		display: block;
		position: relative;
		width: 100%;
		min-height: 40px;
		text-align: left;
		color: #35495e;
	}

	.multiselect * {
		box-sizing: border-box;
	}

	.multiselect:focus {
		outline: none;
	}

	.multiselect--disabled {
		pointer-events: none;
		opacity: 0.6;
	}

	.multiselect--active {
		z-index: 0;
	}

	.multiselect--active:not(.multiselect--above) .multiselect__current,
	.multiselect--active:not(.multiselect--above) .multiselect__input,
	.multiselect--active:not(.multiselect--above) .multiselect__tags {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.multiselect--active .multiselect__select {
		transform: rotateZ(180deg);
	}


	.multiselect__current {
		line-height: 16px;
		min-height: 40px;
		box-sizing: border-box;
		display: block;
		overflow: hidden;
		padding: 8px 12px 0;
		padding-right: 30px;
		white-space: nowrap;
		margin: 0;
		text-decoration: none;
		border-radius: 5px;
		border: 1px solid #e8e8e8;
		cursor: pointer;

	}

	.multiselect__select {
		line-height: 16px;
		display: block;
		position: absolute;
		box-sizing: border-box;
		width: 40px;
		height: 38px;
		right: 1px;
		top: 1px;
		padding: 4px 8px;
		margin: 0;
		text-decoration: none;
		text-align: center;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.multiselect__select:before {
		position: relative;
		right: 0;
		top: 65%;
		color: #999;
		margin-top: 4px;
		border-style: solid;
		border-width: 5px 5px 0 5px;
		border-color: #999999 transparent transparent transparent;
		content: "";
	}

	.multiselect__placeholder {
		color: #adadad;
		display: inline-block;
		margin-bottom: 10px;
		padding-top: 2px;
	}

	.multiselect--active .multiselect__placeholder {
		display: none;
	}

	.multiselect__content-wrapper {
		position: relative;
		display: block;
		background: #fff;
		width: 100%;
		max-height: 240px;
		overflow: auto;
		border: 1px solid #e8e8e8;
		border-top: none;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		z-index: 0;
		-webkit-overflow-scrolling: touch;


	}
	.multiselectlist--horizontal{
		width: fit-content;
		.multiselect__content{
			display: flex;
			justify-content: space-between;
		}
	}

	.multiselect__content {
		list-style: none;
	//	display: inline-block;
		padding: 0;
		margin: 0;
		//min-width: 100%;
		vertical-align: top;
	}

	.multiselect--above .multiselect__content-wrapper {
		bottom: 100%;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		border-bottom: none;
		border-top: 1px solid #e8e8e8;
	}

	.multiselect__content::webkit-scrollbar {
		display: none;
	}

	.multiselect__element {
		display: block;
	}

	.multiselect__option {
		display: block;
		//padding: 12px;
		//min-height: 40px;
		//line-height: 16px;
		//text-decoration: none;
		//text-transform: none;
	//	vertical-align: middle;
		position: relative;
		cursor: pointer;
		white-space: nowrap;

		@include g-simple-component(accent-secondary,font-san-serif,1);
	}

	.multiselect__option:after {
		display: none;
		/*	top: 0;
		right: 0;
		position: absolute;
		line-height: 40px;
		padding-right: 12px;
		padding-left: 20px;
		font-size: 13px;*/
	}

	.multiselect__option--highlight {
		background: #41b883;
		outline: none;
		color: white;
	}

	.multiselect__option--highlight:after {
		content: attr(data-select);
		background: #41b883;
		color: white;
	}

	.multiselect__option--selected {


		//@include c-button(dark-accent-default);

	}

	.multiselect__option--selected:after {
		content: attr(data-selected);
		color: silver;
	}

	.multiselect__option--selected.multiselect__option--highlight {
		background: #ff6a6a;
		color: #fff;
	}

	.multiselect__option--selected.multiselect__option--highlight:after {
		background: #ff6a6a;
		content: attr(data-deselect);
		color: #fff;
	}

	.multiselect--disabled {
		background: #ededed;
		pointer-events: none;
	}

	.multiselect--disabled .multiselect__current,
	.multiselect--disabled .multiselect__select {
		background: #ededed;
		color: #a6a6a6;
	}

	.multiselect__option--disabled {
		background: #ededed !important;
		color: #a6a6a6 !important;
		cursor: text;
		pointer-events: none;
	}

	.multiselect__option--group {
		background: #ededed;
		color: #35495e;
	}

	.multiselect__option--group.multiselect__option--highlight {
		background: #35495e;
		color: #fff;
	}

	.multiselect__option--group.multiselect__option--highlight:after {
		background: #35495e;
	}

	.multiselect__option--disabled.multiselect__option--highlight {
		background: #dedede;
	}

	.multiselect__option--group-selected.multiselect__option--highlight {
		background: #ff6a6a;
		color: #fff;
	}

	.multiselect__option--group-selected.multiselect__option--highlight:after {
		background: #ff6a6a;
		content: attr(data-deselect);
		color: #fff;
	}

	.multiselect-enter-active,
	.multiselect-leave-active {
		transition: all 0.15s ease;
	}

	.multiselect-enter,
	.multiselect-leave-active {
		opacity: 0;
	}

	.multiselect__strong {
		margin-bottom: 8px;
		line-height: 20px;
		display: inline-block;
		vertical-align: top;
	}

	*[dir="rtl"] .multiselect {
		text-align: right;
	}

	*[dir="rtl"] .multiselect__select {
		right: auto;
		left: 1px;
	}

	*[dir="rtl"] .multiselect__tags {
		padding: 8px 8px 0px 40px;
	}

	*[dir="rtl"] .multiselect__content {
		text-align: right;
	}

	*[dir="rtl"] .multiselect__option:after {
		right: auto;
		left: 0;
	}

	*[dir="rtl"] .multiselect__clear {
		right: auto;
		left: 12px;
	}

	*[dir="rtl"] .multiselect__spinner {
		right: auto;
		left: 1px;
	}

	@keyframes spinning {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(2turn);
		}
	}
</style>
