/*eslint-disable */

import $ from 'jquery';
import handlebars from 'handlebars/dist/handlebars.js';
import  {testVar,theme} from '../brooklyn/base';

jQuery = window.jQuery = $;
window.$ = $;

//import {ShopifyAPIbx,ajaxCart,attributeToString} from '../brooklyn/shopifyapi';
const Handlebars=handlebars;




export const ShopifyAPIbx = (function() {
    
    
    // Expose these functions via an interface while hiding
    // the implementation of the module within the function() block
    
    return {
        
        /*============================================================================
  API Functions
==============================================================================*/
        onCartUpdate: function() {
            // alert('There are now ' + cart.item_count + ' items in the cart.');
        },
        
        updateCartNote: function(note, callback) {
            var params = {
                type: 'POST',
                url: '/cart/update.js',
                data: 'note=' + attributeToString(note),
                dataType: 'json',
                success: function(cart) {
                    if (typeof callback === 'function'){
                        callback(cart);
                    } else {
                        ShopifyAPI.onCartUpdate(cart);
                    }
                },
                error: function(XMLHttpRequest, textStatus) {
                    ShopifyAPI.onError(XMLHttpRequest, textStatus);
                }
            };
            jQuery.ajax(params);
        },
        
        onError: function(XMLHttpRequest) {
            var data = eval('(' + XMLHttpRequest.responseText + ')');
            if (data.message){
                alert(data.message + '(' + data.status + '): ' + data.description);
            }
        },
        
        /*============================================================================
          POST to cart/add.js returns the JSON of the cart
            - Allow use of form element instead of just id
            - Allow custom error callback
        ==============================================================================*/
        addItemFromForm: function(form, callback, errorCallback) {
            var params = {
                type: 'POST',
                url: '/cart/add.js',
                data: jQuery(form).serialize(),
                dataType: 'json',
                success: function(line_item) {
                    if (typeof callback === 'function'){
                        callback(line_item, form);
                    } else {
                        ShopifyAPI.onItemAdded(line_item, form);
                    }
                },
                error: function(XMLHttpRequest, textStatus) {
                    if (typeof errorCallback === 'function'){
                        errorCallback(XMLHttpRequest, textStatus);
                    } else {
                        ShopifyAPI.onError(XMLHttpRequest, textStatus);
                    }
                }
            };
            jQuery.ajax(params);
        },

// Get from cart.js returns the cart in JSON
        getCart: function(callback) {
            jQuery.getJSON('/cart.js', function(cart) {
                if (typeof callback === 'function'){
                    callback(cart);
                } else {
                    ShopifyAPI.onCartUpdate(cart);
                }
            });
        },

// POST to cart/change.js returns the cart in JSON
        changeItem: function(line, quantity, callback) {
            var params = {
                type: 'POST',
                url: '/cart/change.js',
                data: 'quantity=' + quantity + '&line=' + line,
                dataType: 'json',
                success: function(cart) {
                    if (typeof callback === 'function'){
                        callback(cart);
                    } else {
                        ShopifyAPI.onCartUpdate(cart);
                    }
                },
                error: function(XMLHttpRequest, textStatus) {
                    ShopifyAPI.onError(XMLHttpRequest, textStatus);
                }
            };
            jQuery.ajax(params);
        }
    }
})();

const ShopifyAPI = ShopifyAPIbx;
/*============================================================================
  API Helper Functions
==============================================================================*/
export const attributeToString = function(attribute) {
    if (typeof attribute !== 'string'){
        attribute += '';
        if (attribute === 'undefined'){
            attribute = '';
        }
    }
    return jQuery.trim(attribute);
}

/*============================================================================
  Ajax Shopify Add To Cart
==============================================================================*/
export const ajaxCart = (function(module, $) {
    'use strict';
    
    // Public functions
    var init, loadCart;
    
    // Private general variables
    var settings, isUpdating, $body;
    
    // Private plugin variables
    var $formContainer,
        $addToCart,
        $cartCountSelector,
        $cartCostSelector,
        $cartContainer;
    
    // Private functions
    var updateCountPrice,
        formOverride,
        itemAddedCallback,
        itemErrorCallback,
        cartUpdateCallback,
        buildCart,
        cartCallback,
        adjustCart,
        adjustCartCallback,
        qtySelectors,
        validateQty;
    
    /*============================================================================
      Initialise the plugin and define global options
    ==============================================================================*/
    init = function(options) {
        // Default settings
        settings = {
            formSelector: 'form[action^="/cart/add"]',
            cartContainer: '#CartContainer',
            addToCartSelector: 'input[type="submit"]',
            cartCountSelector: null,
            cartCostSelector: null,
            moneyFormat: '$',
            disableAjaxCart: false,
            enableQtySelectors: true
        };
        
        // Override defaults with arguments
        $.extend(settings, options);
        
        // Select DOM elements
        $formContainer = $(settings.formSelector);
        $cartContainer = $(settings.cartContainer);
        $addToCart = $formContainer.find(settings.addToCartSelector);
        $cartCountSelector = $(settings.cartCountSelector);
        $cartCostSelector = $(settings.cartCostSelector);
        
        // General Selectors
        $body = $('body');
        
        // Track cart activity status
        isUpdating = false;
        
        // Setup ajax quantity selectors on the any template if enableQtySelectors is true
        if (settings.enableQtySelectors){
            qtySelectors();
        }
        
        // Take over the add to cart form submit action if ajax enabled
        if (!settings.disableAjaxCart && $addToCart.length){
            formOverride();
        }
        
        // Run this function in case we're using the quantity selector outside of the cart
        adjustCart();
    };
    
    loadCart = function() {
        $body.addClass('drawer--is-loading');
        ShopifyAPI.getCart(cartUpdateCallback);
    };
    
    updateCountPrice = function(cart) {
        if ($cartCountSelector){
            $cartCountSelector.html(cart.item_count).removeClass('hidden-count');
            
            if (cart.item_count === 0){
                $cartCountSelector.addClass('hidden-count');
            }
        }
        if ($cartCostSelector){
            $cartCostSelector.html(
                theme.Currency.formatMoney(cart.total_price, settings.moneyFormat)
            );
        }
    };
    
    formOverride = function() {
        $formContainer.on('submit', function(evt) {
            evt.preventDefault();
            
            // Add class to be styled if desired
            $addToCart.removeClass('is-added').addClass('is-adding');
            
            // Remove any previous quantity errors
            $('.qty-error').remove();
            
            ShopifyAPI.addItemFromForm(
                evt.target,
                itemAddedCallback,
                itemErrorCallback
            );
        });
    };
    
    itemAddedCallback = function() {
        $addToCart.removeClass('is-adding').addClass('is-added');
        
        ShopifyAPI.getCart(cartUpdateCallback);
    };
    
    itemErrorCallback = function(XMLHttpRequest) {
        var data = eval('(' + XMLHttpRequest.responseText + ')');
        $addToCart.removeClass('is-adding is-added');
        
        if (data.message){
            if (data.status === 422){
                $formContainer.after(
                    '<div class="errors qty-error">' + data.description + '</div>'
                );
            }
        }
    };
    
    cartUpdateCallback = function(cart) {
        // Update quantity and price
        updateCountPrice(cart);
        buildCart(cart);
    };
    
    buildCart = function(cart) {
        // Start with a fresh cart div
        $cartContainer.empty();
        
        // Show empty cart
        if (cart.item_count === 0){
            $cartContainer.append(
                '<p class="cart--empty-message">' +
                theme.strings.cartEmpty +
                '</p>\n' +
                '<p class="cookie-message">' +
                theme.strings.cartCookies +
                '</p>'
            );
            cartCallback(cart);
            return;
        }
        
        // Handlebars.js cart layout
        var items = [],
            item = {},
            data = {},
            source = $('#CartTemplate').html(),
            template = Handlebars.compile(source);
    
        console.log("compile",Handlebars.compile(source));
    
        // Add each item to our handlebars.js data
        $.each(cart.items, function(index, cartItem) {
            /* Hack to get product image thumbnail
             *   - If image is not null
             *     - Remove file extension, add _small, and re-add extension
             *     - Create server relative link
             *   - A hard-coded url of no-image
            */
            var prodImg;
            if (cartItem.image !== null){
                prodImg = cartItem.image
                .replace(/(\.[^.]*)$/, '_small$1')
                .replace('http:', '');
            } else {
                prodImg =
                    '//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif';
            }
            
            if (cartItem.properties !== null){
                $.each(cartItem.properties, function(key, value) {
                    if (key.charAt(0) === '_' || !value){
                        delete cartItem.properties[key];
                    }
                });
            }
            
            // Create item's data object and add to 'items' array
            item = {
                key: cartItem.key,
                line: index + 1, // Shopify uses a 1+ index in the API
                url: cartItem.url,
                img: prodImg,
                name: cartItem.product_title,
                variation: cartItem.variant_title,
                properties: cartItem.properties,
                itemAdd: cartItem.quantity + 1,
                itemMinus: cartItem.quantity - 1,
                itemQty: cartItem.quantity,
                price: theme.Currency.formatMoney(cartItem.price, settings.moneyFormat),
                discountedPrice: theme.Currency.formatMoney(
                    cartItem.price - cartItem.total_discount / cartItem.quantity,
                    settings.moneyFormat
                ),
                discounts: cartItem.discounts,
                discountsApplied:
                    cartItem.price === cartItem.price - cartItem.total_discount
                        ? false
                        : true,
                vendor: cartItem.vendor
            };
            
            items.push(item);
        });
        
        // Gather all cart data and add to DOM
        data = {
            items: items,
            note: cart.note,
            totalPrice: theme.Currency.formatMoney(
                cart.total_price,
                settings.moneyFormat
            ),
            totalCartDiscount:
                cart.total_discount === 0
                    ? 0
                    : theme.strings.cartSavings.replace(
                    '[savings]',
                    theme.Currency.formatMoney(
                        cart.total_discount,
                        settings.moneyFormat
                    )
                    )
        };
        
        $cartContainer.append(template(data));
        
        cartCallback(cart);
    };
    
    cartCallback = function(cart) {
        $body.removeClass('drawer--is-loading');
        $body.trigger('ajaxCart.afterCartLoad', cart);
        
        if (window.Shopify && Shopify.StorefrontExpressButtons){
            Shopify.StorefrontExpressButtons.initialize();
        }
    };
    
    adjustCart = function() {
        // Delegate all events because elements reload with the cart
        
        // Add or remove from the quantity
        $body.on('click', '.ajaxcart__qty-adjust', function() {
            if (isUpdating){
                return;
            }
            var $el = $(this),
                line = $el.data('line'),
                $qtySelector = $el.siblings('.ajaxcart__qty-num'),
                qty = parseInt($qtySelector.val().replace(/\D/g, ''));
            
            qty = validateQty(qty);
            
            // Add or subtract from the current quantity
            if ($el.hasClass('ajaxcart__qty--plus')){
                qty += 1;
            } else {
                qty -= 1;
                if (qty <= 0) qty = 0;
            }
            
            // If it has a data-line, update the cart.
            // Otherwise, just update the input's number
            if (line){
                updateQuantity(line, qty);
            } else {
                $qtySelector.val(qty);
            }
        });
        
        // Update quantity based on input on change
        $body.on('change', '.ajaxcart__qty-num', function() {
            if (isUpdating){
                return;
            }
            var $el = $(this),
                line = $el.data('line'),
                qty = parseInt($el.val().replace(/\D/g, ''));
            
            qty = validateQty(qty);
            
            // If it has a data-line, update the cart
            if (line){
                updateQuantity(line, qty);
            }
        });
        
        // Prevent cart from being submitted while quantities are changing
        $body.on('submit', 'form.ajaxcart', function(evt) {
            if (isUpdating){
                evt.preventDefault();
            }
        });
        
        // Highlight the text when focused
        $body.on('focus', '.ajaxcart__qty-adjust', function() {
            var $el = $(this);
            setTimeout(function() {
                $el.select();
            }, 50);
        });
        
        function updateQuantity(line, qty) {
            isUpdating = true;
            
            // Add activity classes when changing cart quantities
            var $row = $('.ajaxcart__row[data-line="' + line + '"]').addClass(
                'is-loading'
            );
            
            if (qty === 0){
                $row.parent().addClass('is-removed');
            }
            
            // Slight delay to make sure removed animation is done
            setTimeout(function() {
                ShopifyAPI.changeItem(line, qty, adjustCartCallback);
            }, 250);
        }
        
        // Save note anytime it's changed
        $body.on('change', 'textarea[name="note"]', function() {
            var newNote = $(this).val();
            
            // Update the cart note in case they don't click update/checkout
            ShopifyAPI.updateCartNote(newNote, function() {
            });
        });
    };
    
    adjustCartCallback = function(cart) {
        // Update quantity and price
        updateCountPrice(cart);
        
        // Reprint cart on short timeout so you don't see the content being removed
        setTimeout(function() {
            ShopifyAPI.getCart(buildCart);
            isUpdating = false;
        }, 150);
    };
    
    qtySelectors = function() {
        // Change number inputs to JS ones, similar to ajax cart but without API integration.
        // Make sure to add the existing name and id to the new input element
        var $numInputs = $('input[type="number"]');
        
        if ($numInputs.length){
            $numInputs.each(function() {
                
                var $el = $(this),
                    currentQty = $el.val(),
                    inputName = $el.attr('name'),
                    inputId = $el.attr('id');
                
                var itemAdd = currentQty + 1,
                    itemMinus = currentQty - 1,
                    itemQty = currentQty;
                
                var source = $('#JsQty').html(),
                    template = Handlebars.compile(source),
                    data = {
                        key: $el.data('id'),
                        itemQty: itemQty,
                        itemAdd: itemAdd,
                        itemMinus: itemMinus,
                        inputName: inputName,
                        inputId: inputId
                    };
                
                // Append new quantity selector then remove original
                $el.after(template(data)).remove();
            });
            
            // Setup listeners to add/subtract from the input
            $('.js-qty__adjust').on('click', function() {
                var $el = $(this),
                    $qtySelector = $el.siblings('.js-qty__num'),
                    qty = parseInt($qtySelector.val().replace(/\D/g, ''));
                
                qty = validateQty(qty);
                
                // Add or subtract from the current quantity
                if ($el.hasClass('js-qty__adjust--plus')){
                    qty += 1;
                } else {
                    qty -= 1;
                    if (qty <= 1) qty = 1;
                }
                
                // Update the input's number
                $qtySelector.val(qty);
            });
        }
    };
    
    validateQty = function(qty) {
        if (parseFloat(qty) === parseInt(qty) && !isNaN(qty)){
            // We have a valid number!
        } else {
            // Not a number. Default to 1.
            qty = 1;
        }
        return qty;
    };
    
    module = {
        init: init,
        load: loadCart
    };
    
    return module;
})(ajaxCart || {}, jQuery);

window.ajaxCart= ajaxCart;
