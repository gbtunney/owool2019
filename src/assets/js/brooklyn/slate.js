/*eslint-disable */

import $ from 'jquery';
jQuery=window.jQuery = $;
window.$ = $;

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist.  Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */


export const slate = (function () {
    
    // Keep this variable private inside this closure scope
    
    // Expose these functions via an interface while hiding
    // the implementation of the module within the function() block
    
    return {
    
        Variants : (function() {
            /**
             * Variant constructor
             *
             * @param {object} options - Settings from `product.js`
             */
            function Variants(options={}) {
                
                
                this.prototype = _.assignIn({}, this.prototype, {
                    /**
                     * Get the currently selected options from add-to-cart form. Works with all
                     * form input elements.
                     *
                     * @return {array} options - Values of currently selected variants
                     */
                    _getCurrentOptions: function() {
                        var currentOptions = _.map(
                            $(this.singleOptionSelector, this.$container),
                            function(element) {
                                var $element = $(element);
                                var type = $element.attr('type');
                                var currentOption = {};
                
                                if (type === 'radio' || type === 'checkbox') {
                                    if ($element[0].checked) {
                                        currentOption.value = $element.val();
                                        currentOption.index = $element.data('index');
                        
                                        return currentOption;
                                    } else {
                                        return false;
                                    }
                                } else {
                                    currentOption.value = $element.val();
                                    currentOption.index = $element.data('index');
                    
                                    return currentOption;
                                }
                            }
                        );
        
                        // remove any unchecked input values if using radio buttons or checkboxes
                        currentOptions = _.compact(currentOptions);
        
                        return currentOptions;
                    },
    
                    /**
                     * Find variant based on selected values.
                     *
                     * @param  {array} selectedValues - Values of variant inputs
                     * @return {object || undefined} found - Variant object from product.variants
                     */
                    _getVariantFromOptions: function() {
                        var selectedValues = this._getCurrentOptions();
                        var variants = this.product.variants;
        
                        var found = _.find(variants, function(variant) {
                            return selectedValues.every(function(values) {
                                return _.isEqual(variant[values.index], values.value);
                            });
                        });
        
                        return found;
                    },
    
                    /**
                     * Event handler for when a variant input changes.
                     */
                    _onSelectChange: function() {
                        var variant = this._getVariantFromOptions();
        
                        this.$container.trigger({
                            type: 'variantChange',
                            variant: variant
                        });
        
                        if (!variant) {
                            return;
                        }
        
                        this._updateMasterSelect(variant);
                        this._updateImages(variant);
                        this._updatePrice(variant);
                        this._updateSKU(variant);
                        this.currentVariant = variant;
        
                        if (this.enableHistoryState) {
                            this._updateHistoryState(variant);
                        }
                    },
    
                    /**
                     * Trigger event when variant image changes
                     *
                     * @param  {object} variant - Currently selected variant
                     * @return {event}  variantImageChange
                     */
                    _updateImages: function(variant) {
                        var variantImage = variant.featured_image || {};
                        var currentVariantImage = this.currentVariant.featured_image || {};
        
                        if (
                            !variant.featured_image ||
                            variantImage.src === currentVariantImage.src
                        ) {
                            return;
                        }
        
                        this.$container.trigger({
                            type: 'variantImageChange',
                            variant: variant
                        });
                    },
    
                    /**
                     * Trigger event when variant price changes.
                     *
                     * @param  {object} variant - Currently selected variant
                     * @return {event} variantPriceChange
                     */
                    _updatePrice: function(variant) {
                        if (
                            variant.price === this.currentVariant.price &&
                            variant.compare_at_price === this.currentVariant.compare_at_price
                        ) {
                            return;
                        }
        
                        this.$container.trigger({
                            type: 'variantPriceChange',
                            variant: variant
                        });
                    },
    
                    /**
                     * Trigger event when variant SKU changes.
                     *
                     * @param  {object} variant - Currently selected variant
                     * @return {event} variantSKUChange
                     */
                    _updateSKU: function(variant) {
                        if (variant.sku === this.currentVariant.sku) {
                            return;
                        }
        
                        this.$container.trigger({
                            type: 'variantSKUChange',
                            variant: variant
                        });
                    },
    
                    /**
                     * Update history state for product deeplinking
                     *
                     * @param  {variant} variant - Currently selected variant
                     * @return {k}         [description]
                     */
                    _updateHistoryState: function(variant) {
                        if (!history.replaceState || !variant) {
                            return;
                        }
        
                        var newurl =
                            window.location.protocol +
                            '//' +
                            window.location.host +
                            window.location.pathname +
                            '?variant=' +
                            variant.id;
                        window.history.replaceState({ path: newurl }, '', newurl);
                    },
    
                    /**
                     * Update hidden master select of variant change
                     *
                     * @param  {variant} variant - Currently selected variant
                     */
                    _updateMasterSelect: function(variant) {
                        $(this.originalSelectorId, this.$container).val(variant.id);
                    }
                });
                this.$container = options.$container;
                this.product = options.product;
                this.singleOptionSelector = options.singleOptionSelector;
                this.originalSelectorId = options.originalSelectorId;
                this.enableHistoryState = options.enableHistoryState;
               // this.currentVariant = this._getVariantFromOptions();
            
                $(this.singleOptionSelector, this.$container).on(
                    'change',
                  //  this._onSelectChange.bind(this)
                );
            }
        
            return Variants;
        })(),
      
    }
})();





