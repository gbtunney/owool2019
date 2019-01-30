/*eslint-disable */

import $ from 'jquery';

jQuery = window.jQuery = $;
window.$ = $;

export const theme = (function() {
    
    // Keep this variable private inside this closure scope
    var myGrades = [93, 95, 88, 0, 55, 91];
    
    let variables = {
        productPageLoad: false,
        productPageSticky: true,
        
        // Breakpoints from src/stylesheets/global/variables.scss.liquid
        mediaQuerySmall: 'screen and (max-width: 590px)',
        mediaQueryMedium: 'screen and (min-width: 591px) and (max-width: 768px)',
        mediaQueryMediumUp: 'screen and (min-width: 591px)',
        mediaQueryLarge: 'screen and (min-width: 769px)',
        bpSmall: false
    };
    // Expose these functions via an interface while hiding
    // the implementation of the module within the function() block
    
    return {
        Product: (function() {
            function Product(container) {
                var $window = $(window);
                
                this.settings = {
                    productPageLoad: false,
                    preloadImage: false,
                    enableHistoryState: true,
                    namespace: '.productSection'
                };
                
                this.selectors = {
                    productImageWrapper: '.product-single__photo-wrapper',
                    productImages: '.product-single__photos',
                    productImagePhoto: '.product-single__photo',
                    productImagePhotoFlexWrapper: '.product-single__photo--flex-wrapper',
                    productThumbnail: '.product-single__thumbnail',
                    productImagePhotoContainer: '.product-single__photo--container',
                    productFullDetails: '.product-single__full-details',
                    productForm: '.add-to-cart__form',
                    addToCart: '.btn--add-to-cart',
                    addToCartText: '.btn__text',
                    priceContainer: '[data-price-container]',
                    productPrice: '#ProductPrice',
                    SKU: '.variant-sku',
                    priceA11y: '#PriceA11y',
                    comparePrice: '#ComparePrice',
                    comparePriceA11y: '#ComparePriceA11y',
                    comparePriceWrapper: '.product-single__price--wrapper',
                    quantityElements: '.js-quantity-selector, label + .js-qty',
                    originalSelectorId: '#ProductSelect',
                    singleOptionSelector: '.single-option-selector__radio',
                    radioWrapper: '.radio-wrapper',
                    meta: '.product-single__meta',
                    productWrapper: '.product-single',
                    shopifyPaymentButton: '.shopify-payment-button'
                };
                
                var $container = (this.$container = $(container));
                var sectionId = $container.attr('data-section-id');
                
                if (!$('#ProductJson-' + sectionId).html()){
                    return;
                }
                
                this.productSingleObject = JSON.parse(
                    document.getElementById('ProductJson-' + sectionId).innerHTML
                );
                this.zoomType = $container.data('image-zoom-type');
                
                this.initBreakpoints();
                this.stringOverrides();
                this.initProductVariant();
                this.initStickyProductMeta();
                this.productThumbnailSwitch();
                
                if (this.zoomType){
                    this.productImageZoom();
                }
                
                if (theme.settings.cartType === 'drawer'){
                    ajaxCart.init({
                        formSelector: '#AddToCartForm--' + sectionId,
                        cartContainer: '#CartContainer',
                        addToCartSelector: '#AddToCart--' + sectionId,
                        enableQtySelectors: true,
                        moneyFormat: theme.strings.moneyFormat
                    });
                }
                
                $window
                .on('load' + this.settings.namespace, theme.initStickyProductMeta)
                .on(
                    'resize' + this.settings.namespace,
                    theme.debounce(this.initStickyProductMeta, 150).bind(this)
                );
            }
            
            Product.prototype = _.assignIn({}, Product.prototype, {
                initProductVariant: function() {
                    var options = {
                        $container: this.$container,
                        enableHistoryState:
                        this.$container.data('enable-history-state') || false,
                        singleOptionSelector: this.selectors.singleOptionSelector,
                        originalSelectorId: this.selectors.originalSelectorId,
                        product: this.productSingleObject
                    };
                    
                    this.variants = new slate.Variants(options);
                    this.$container.on(
                        'variantChange' + this.settings.namespace,
                        this.productPage.bind(this)
                    );
                    this.$container.on(
                        'variantImageChange' + this.settings.namespace,
                        this.showVariantImage.bind(this)
                    );
                },
                
                initBreakpoints: function() {
                    var self = this;
                    var $container = self.$container;
                    self.zoomType = $container.data('image-zoom-type');
                    
                    enquire.register(theme.variables.mediaQuerySmall, {
                        match: function() {
                            self.createImageCarousel();
                            if (self.zoomType){
                                if ($(self.selectors.productImagePhoto).length){
                                    // remove event handlers for product zoom on mobile
                                    $(self.selectors.productImagePhoto).off();
                                }
                            }
                        },
                        unmatch: function() {
                            self.destroyImageCarousel();
                            self.reorderImages();
                            if (self.zoomType){
                                // reinit product zoom
                                self.productImageZoom();
                            }
                        }
                    });
                },
                
                stringOverrides: function() {
                    // Override defaults in theme.strings with potential
                    // template overrides
                    
                    theme.productStrings = theme.productStrings || {};
                    $.extend(theme.strings, theme.productStrings);
                },
                
                resizeElements: function() {
                    $(
                        this.selectors.productGridImages,
                        this.$container
                    ).imagesLoaded(function() {
                        $(this.selectors.productGridImages, this.$container)
                        .css('height', 'auto')
                        .equalHeights();
                    });
                },
                
                showVariantImage: function(evt) {
                    var variant = evt.variant;
                    var $newImage = $(
                        '.product-single__photo[data-image-id="' +
                        variant.featured_image.id +
                        '"]'
                    );
                    var imageIndex;
                    
                    if (variant && variant.featured_image){
                        this.setActiveThumbnail(variant.featured_image.id);
                    }
                    
                    if (theme.variables.bpSmall){
                        // Switch carousel slide, unless it's the first photo on load
                        imageIndex = $newImage.closest('.slick-slide').attr('index');
                        // Navigate to slide unless it's the first photo on load
                        // If there is no index, slider is not initalized.
                        if (_.isUndefined(imageIndex)){
                            return;
                        }
                        
                        if (imageIndex !== 0 || theme.variables.productPageLoad){
                            $(this.selectors.productImages, this.$container).slickGoTo(
                                imageIndex
                            );
                        }
                        // Switch image variant on thumbnail layout for desktop view;
                        // When a image variant is updated on mobile view, update the
                        // desktop view also.
                        if (!this.$container.data('scroll-to-image')){
                            this.switchImage(variant.featured_image.id);
                        }
                    } else {
                        if (this.$container.data('scroll-to-image')){
                            imageIndex = $newImage.closest('.slick-slide').index();
                            // Scroll to/reorder image unless it's the first photo on load
                            if (imageIndex !== 0 || theme.variables.productPageLoad){
                                if (theme.variables.productPageSticky){
                                    // Scroll to variant image
                                    $('html, body').animate(
                                        {
                                            scrollTop: $newImage.offset().top
                                        },
                                        250
                                    );
                                } else {
                                    // Move selected variant image to top, preventing scrolling
                                    var currentScroll = $(document).scrollTop();
                                    $newImage
                                    .closest(
                                        $(
                                            this.selectors.productImagePhotoFlexWrapper,
                                            this.$container
                                        )
                                    )
                                    .prependTo($(this.selectors.productImages, this.$container));
                                    $(document).scrollTop(currentScroll);
                                }
                            }
                        } else {
                            // Thumbnail layout
                            // Move selected variant image to top
                            $newImage
                            .closest(
                                $(this.selectors.productImagePhotoFlexWrapper, this.$container)
                            )
                            .prependTo($(this.selectors.productImages, this.$container));
                            // Switch image variant for thumnail layout
                            this.switchImage(variant.featured_image.id);
                        }
                    }
                    
                    if (!theme.variables.productPageLoad){
                        theme.variables.productPageLoad = true;
                    }
                },
                
                switchImage: function(imageId) {
                    $(this.selectors.productImagePhotoContainer, this.$container).addClass(
                        'hide'
                    );
                    $(this.selectors.productImagePhotoContainer, this.$container)
                    .filter('#ProductImageWrapper-' + imageId)
                    .removeClass('hide');
                },
                
                reorderImages: function() {
                    if (this.$container.data('scroll-to-image')) return;
                    var $newImage = $(
                        this.selectors.productImagePhotoContainer,
                        this.$container
                    ).not('.hide');
                    $newImage
                    .closest(
                        $(this.selectors.productImagePhotoFlexWrapper, this.$container)
                    )
                    .prependTo($(this.selectors.productImages, this.$container));
                },
                
                productThumbnailSwitch: function() {
                    var self = this;
                    var $productThumbnails = $('#ProductThumbs', this.$container).find(
                        this.selectors.productThumbnail
                    );
                    
                    if ($productThumbnails.length){
                        // Switch the main image with one of the thumbnails
                        // Note: this does not change the variant selected, just the image
                        $productThumbnails.on('click', function(evt) {
                            evt.preventDefault();
                            var newImageId = $(this).attr('data-image-id');
                            var $newImage = $(
                                '.product-single__photo[data-image-id="' + newImageId + '"]'
                            );
                            
                            self.switchImage(newImageId);
                            self.setActiveThumbnail(newImageId);
                            
                            // Thumbnail layout
                            // Move selected featured image to top
                            $newImage
                            .closest(
                                $(self.selectors.productImagePhotoFlexWrapper, self.$container)
                            )
                            .prependTo($(self.selectors.productImages, self.$container));
                        });
                    }
                },
                
                setActiveThumbnail: function(imageId) {
                    var $productThumbnails = $('#ProductThumbs', this.$container).find(
                        this.selectors.productThumbnail
                    );
                    
                    if ($productThumbnails.length){
                        var activeClass = 'active-thumb';
                        var $thumbnail = $(
                            this.selectors.productThumbnail + "[data-image-id='" + imageId + "']",
                            this.$container
                        );
                        
                        $productThumbnails.removeClass(activeClass);
                        $thumbnail.addClass(activeClass);
                    }
                },
                
                productImageZoom: function() {
                    if (
                        !$(this.selectors.productImagePhoto, this.$container).length ||
                        theme.variables.bpSmall
                    ){
                        return;
                    }
                    
                    $(this.selectors.productImagePhoto, this.$container).magnificPopup({
                        type: 'image',
                        mainClass: 'mfp-fade',
                        closeOnBgClick: true,
                        closeBtnInside: false,
                        closeOnContentClick: true,
                        tClose: theme.strings.zoomClose,
                        removalDelay: 500,
                        gallery: {
                            enabled: true,
                            navigateByImgClick: false,
                            arrowMarkup:
                                '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><span class="mfp-chevron mfp-chevron-%dir%"></span></button>',
                            tPrev: theme.strings.zoomPrev,
                            tNext: theme.strings.zoomNext
                        }
                    });
                },
                
                createImageCarousel: function() {
                    var self = this;
                    
                    if (
                        !$(this.selectors.productImages, this.$container).length ||
                        $(this.selectors.productImagePhoto, this.$container).length < 2
                    ){
                        return;
                    }
                    
                    $(this.selectors.productImages, this.$container).slick({
                        arrows: false,
                        dots: true,
                        adaptiveHeight: true,
                        onAfterChange: function() {
                            // Let's do this after changing slides
                            // Update featured image and active thumbnail on desktop
                            // when changing slides
                            self.setFeaturedImage();
                        }
                    });
                },
                
                setFeaturedImage: function() {
                    // Thumbnail layout only
                    if (this.$container.data('scroll-to-image')) return;
                    var imageId = $(this.selectors.productImages, this.$container)
                    .find('.slick-slide.slick-active .product-single__photo')
                    .attr('data-image-id');
                    
                    this.switchImage(imageId);
                    this.setActiveThumbnail(imageId);
                },
                
                destroyImageCarousel: function() {
                    if (!$(this.selectors.productImages, this.$container).length){
                        return;
                    }
                    $(this.selectors.productImages, this.$container).unslick();
                },
                
                productPage: function(evt) {
                    var moneyFormat = theme.strings.moneyFormat;
                    var variant = evt.variant;
                    var translations = theme.strings;
                    
                    if (variant){
                        // Display variant image on featured product
                        if (!$('body').hasClass('template-product')){
                            if (variant.featured_image){
                                var $newImage = $(
                                    this.selectors.productImageWrapper +
                                    '[data-image-id="' +
                                    variant.featured_image.id +
                                    '"]',
                                    this.$container
                                );
                                var $otherImages = $(
                                    this.selectors.productImageWrapper +
                                    ':not([data-image-id="' +
                                    variant.featured_image.id +
                                    '"])',
                                    this.$container
                                );
                                
                                $newImage.removeClass('hide');
                                $otherImages.addClass('hide');
                            }
                        }
                        
                        $(this.selectors.priceContainer, this.$container).removeClass(
                            'visibility-hidden'
                        );
                        $(this.selectors.productPrice, this.$container).attr(
                            'aria-hidden',
                            'false'
                        );
                        $(this.selectors.priceA11y, this.$container).attr(
                            'aria-hidden',
                            'false'
                        );
                        
                        // Select a valid variant if available
                        if (variant.available){
                            // Available, enable the submit button, change text, show quantity elements
                            $(this.selectors.addToCart, this.$container)
                            .removeClass('disabled')
                            .prop('disabled', false);
                            $(this.selectors.addToCartText, this.$container).html(
                                translations.addToCart
                            );
                            $(this.selectors.quantityElements, this.$container).show();
                            $(this.selectors.shopifyPaymentButton, this.$container).show();
                            
                            // Update the full details link
                            var $link = $(this.selectors.productFullDetails, this.$container);
                            if ($link.length){
                                $link.attr(
                                    'href',
                                    this.updateUrlParameter($link.attr('href'), 'variant', variant.id)
                                );
                            }
                        } else {
                            // Sold out, disable the submit button, change text, hide quantity elements
                            $(this.selectors.addToCart, this.$container)
                            .addClass('disabled')
                            .prop('disabled', true);
                            $(this.selectors.addToCartText, this.$container).html(
                                translations.soldOut
                            );
                            $(this.selectors.quantityElements, this.$container).hide();
                            $(this.selectors.shopifyPaymentButton, this.$container).hide();
                        }
                        
                        $(this.selectors.productPrice, this.$container)
                        .html(theme.Currency.formatMoney(variant.price, moneyFormat))
                        .show();
                        
                        // Also update and show the product's compare price if necessary
                        if (variant.compare_at_price > variant.price){
                            $(this.selectors.comparePrice, this.$container).html(
                                theme.Currency.formatMoney(variant.compare_at_price, moneyFormat)
                            );
                            $(this.selectors.comparePriceWrapper, this.$container).removeClass(
                                'hide'
                            );
                            $(this.selectors.productPrice, this.$container).addClass('on-sale');
                            $(this.selectors.comparePriceWrapper, this.$container).attr(
                                'aria-hidden',
                                'false'
                            );
                            $(this.selectors.comparePriceA11y, this.$container).attr(
                                'aria-hidden',
                                'false'
                            );
                        } else {
                            $(this.selectors.comparePriceWrapper, this.$container)
                            .addClass('hide')
                            .attr('aria-hidden', 'true');
                            $(this.selectors.productPrice, this.$container).removeClass(
                                'on-sale'
                            );
                            $(this.selectors.comparePrice, this.$container).html('');
                            $(this.selectors.comparePriceA11y, this.$container).attr(
                                'aria-hidden',
                                'true'
                            );
                        }
                        
                        // Also Show SKU
                        $(this.selectors.SKU).html(variant.sku);
                    } else {
                        // The variant doesn't exist, disable submit button.
                        // This may be an error or notice that a specific variant is not available.
                        // To only show available variants, implement linked product options:
                        //   - http://docs.shopify.com/manual/configuration/store-customization/advanced-navigation/linked-product-options
                        $(this.selectors.addToCart, this.$container)
                        .addClass('disabled')
                        .prop('disabled', true);
                        $(this.selectors.addToCartText, this.$container).html(
                            translations.unavailable
                        );
                        $(this.selectors.quantityElements, this.$container).hide();
                        $(this.selectors.shopifyPaymentButton, this.$container).hide();
                        
                        $(this.selectors.priceContainer, this.$container).addClass(
                            'visibility-hidden'
                        );
                        $(this.selectors.productPrice, this.$container).attr(
                            'aria-hidden',
                            'true'
                        );
                        $(this.selectors.priceA11y, this.$container).attr(
                            'aria-hidden',
                            'true'
                        );
                        $(this.selectors.comparePriceWrapper, this.$container).attr(
                            'aria-hidden',
                            'true'
                        );
                        $(this.selectors.comparePriceA11y, this.$container).attr(
                            'aria-hidden',
                            'true'
                        );
                    }
                },
                
                updateUrlParameter: function(url, key, value) {
                    var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
                    var separator = url.indexOf('?') === -1 ? '?' : '&';
                    
                    if (url.match(re)){
                        return url.replace(re, '$1' + key + '=' + value + '$2');
                    } else {
                        return url + separator + key + '=' + value;
                    }
                },
                
                initStickyProductMeta: function() {
                    var $meta = $(this.selectors.meta, this.$container);
                    var $wrapper = $(this.selectors.productWrapper, this.$container);
                    
                    if ($meta.find('#shopify-product-reviews').length){
                        theme.variables.productPageSticky = false;
                        return;
                    }
                    
                    if (
                        !$meta.length ||
                        $(this.selectors.productImagePhoto, this.$container).length < 2
                    ){
                        return;
                    }
                    
                    // Force detatch if already detached. Prevent layout issues.
                    $meta.trigger('detach.ScrollToFixed');
                    
                    // Detach and stop if on mobile breakpoint
                    if (theme.variables.bpSmall){
                        return;
                    }
                    
                    var productCopyHeight = $meta.outerHeight();
                    var productImagesHeight = $(
                        this.selectors.productImages,
                        this.$container
                    ).height();
                    
                    /*============================================================================
                      Calculate when to detach fixed element to avoid content overlap.
                      Subtract product copy height from the limit because plugin uses offset().top
                    ==============================================================================*/
                    var calcLimit = $wrapper.offset().top + $wrapper.height();
                    calcLimit -= productCopyHeight;
                    
                    // Init sticky if desc shorter than images and fits in viewport
                    if (
                        productCopyHeight < productImagesHeight &&
                        productCopyHeight < $(window).height()
                    ){
                        theme.variables.productPageSticky = true;
                        $meta.scrollToFixed({
                            limit: calcLimit
                        });
                    } else {
                        theme.variables.productPageSticky = false;
                    }
                },
                
                onUnload: function() {
                    this.$container.off(this.settings.namespace);
                    this.destroyImageCarousel();
                }
            });
            
            return Product;
        })(),
        
        HeaderSection: (function() {
            function Header(container) {
                timber.drawersInit();
                theme.initCache();
                theme.fitNav();
                theme.resizeLogo();
                theme.searchModal();
                
                var $container = (this.$container = $(container));
                this.template = $container.attr('data-template');
                
                // ajaxCart.init will run from Product.prototype when on the product page
                if (
                    theme.settings.cartType === 'drawer' &&
                    this.template.indexOf('product') === -1
                ){
                    ajaxCart.init({
                        formSelector: '.add-to-cart__form',
                        cartContainer: '#CartContainer',
                        addToCartSelector: '.add-to-cart',
                        enableQtySelectors: true,
                        moneyFormat: theme.strings.moneyFormat
                    });
                }
                
                theme.cache.$window.on('load', theme.resizeLogo);
                theme.cache.$window.on('resize', theme.debounce(theme.resizeLogo, 150));
                
                // Check for header absolute position
                if ($('#Hero').hasClass('hero')){
                    $('.header-wrapper').addClass('hero__header');
                } else {
                    $('.header-wrapper').removeClass('hero__header');
                }
                
                this.initSideBarDropDowns();
            }
            
            Header.prototype = _.assignIn({}, Header.prototype, {
                onSelect: function() {
                    this.handleDrawerOpenInEditor(event);
                },
                
                onDeselect: function() {
                    timber.LeftDrawer.close(event);
                },
                
                handleDrawerOpenInEditor: function(event) {
                    if (
                        theme.cache.$siteNav.hasClass('site-nav--compress') ||
                        theme.variables.bpSmall
                    ){
                        setTimeout(function() {
                            timber.LeftDrawer.drawerIsOpen = false;
                            timber.LeftDrawer.open();
                        }, 500);
                    } else if (!theme.cache.$siteNav.hasClass('site-nav--compress')){
                        timber.LeftDrawer.drawerIsOpen = true;
                        timber.LeftDrawer.close(event);
                    }
                },
                
                initSideBarDropDowns: function() {
                    var $toggleBtns = $('.mobile-nav__toggle-btn');
                    // Setup aria attributes
                    $toggleBtns.attr('aria-expanded', 'false');
                    
                    $toggleBtns.each(function() {
                        var $button = $(this);
                        $button.attr('aria-controls', $button.attr('data-aria-controls'));
                    });
                    
                    $toggleBtns.on('click', function() {
                        var $button = $(this);
                        var currentlyExpanded = $button.attr('aria-expanded');
                        var toggleState = false;
                        // Updated aria-expanded value based on state pre-click
                        if (currentlyExpanded === 'true'){
                            $button.attr('aria-expanded', 'false');
                        } else {
                            $button.attr('aria-expanded', 'true');
                            toggleState = true;
                        }
                        
                        // Toggle that expands/collapses sublist
                        $button
                        .closest('.mobile-nav__has-sublist')
                        .toggleClass('mobile-nav--expanded', toggleState)
                        .next()
                        .slideToggle();
                    });
                }
            });
            
            return Header;
        })(),
        
        FeaturedContentSection: (function() {
            function FeaturedContent() {
                theme.styleTextLinks();
            }
            
            return FeaturedContent;
        })(),
        
        NewsletterSection: (function() {
            function Newsletter() {
                theme.styleTextLinks();
            }
            
            return Newsletter;
        })(),
        //TODO: FIGURE OUT THE ASSIGN IN THING
        SlideshowSection: (function() {
            function SlideshowSection() {
                theme.initCache();
                
                var slideshow = (this.slideshow = '#Hero');
                //var autoplay = $(this.slideshow).attr('data-autoplay');
                //var autoplay = $(this.slideshow).attr('data-autoplayspeed');
                
                slickTheme.init({
                    $element: $(slideshow),
                    fullscreen: $(slideshow).data('fullscreen'),
                    parallax: $(slideshow).data('parallax'),
                    autoplay: $(slideshow).data('autoplay'),
                    autoplaySpeed: $(slideshow).data('autoplayspeed')
                });
                
                // remove header absolute display if slideshow is empty
                if (!$(this.slideshow).hasClass('hero')){
                    $('.header-wrapper').removeClass('hero__header');
                }
            }
            
            return SlideshowSection;
        })(),
        
        Collection: (function() {
            function Collection(container) {
                this.selectors = {
                    productGridImages: '.grid-uniform .grid-product__image-wrapper',
                    $productGridRows: $('.collage-grid__row'),
                    productGridPhotosLarge: '.grid__item--large .grid-product__image-link',
                    $collectionImage: $('.collection-hero__image'),
                    filterDropdowns: '.filter-dropdown',
                    filterSelect: '.filter-dropdown__select',
                    filterLabel: '.filter-dropdown__label',
                    sortDropdown: '#sortBy'
                };
                
                var $container = (this.$container = $(container));
                this.gridType = $container.data('grid-type');
                
                this.selectors.$collectionImage.addClass('is-init');
                
                // Enable parallax effect if 3d transforms are supported
                if (!Modernizr.csstransforms3d){
                    return;
                }
                
                theme.cache.$window.on('scroll', function() {
                    var scrolled = theme.cache.$window.scrollTop();
                    theme.cache.$collectionImage.css({
                        transform: 'translate3d(0, ' + scrolled / 4.5 + 'px, 0)'
                    });
                });
                
                this.init();
            }
            
            Collection.prototype = _.assignIn({}, Collection.prototype, {
                init: function() {
                    this.cacheSelectors();
                    this.setQueryParams();
                    
                    this.cache.$sortDropdown.on('change', this.sortCollection.bind(this));
                    
                    if (this.gridType === 'collage'){
                        this.initCollageGrid();
                    } else if (this.gridType === 'grid'){
                        theme.equalHeights.call(this);
                    }
                },
                
                updateFilterLabel: function(evt, element) {
                    var $select = evt ? $(evt.target) : $(element);
                    var $label = $select
                    .prev('.filter-dropdown__label')
                    .find('.filter-dropdown__label--active');
                    var selectedVariant = $select.find('option:selected').text();
                    
                    $label.html(' ' + selectedVariant);
                    this.cache.$filterDropdowns.addClass('loaded');
                },
                
                cacheSelectors: function() {
                    this.cache = {
                        $html: $('html'),
                        $window: $(window),
                        $productGridImages: $(this.selectors.productGridImages),
                        $productGridRows: $(this.selectors.productGridRows),
                        $productGridPhotosLarge: $(this.selectors.productGridPhotosLarge),
                        $filterDropdowns: $(this.selectors.filterDropdowns),
                        $filterSelect: $(this.selectors.filterSelect),
                        $filterLabel: $(this.selectors.filterLabel),
                        $sortDropdown: $(this.selectors.sortDropdown)
                    };
                },
                
                setQueryParams: function() {
                    //don't execute if sort dropdown is not present.
                    if (!this.cache.$sortDropdown.length){
                        return;
                    }
                    
                    Shopify.queryParams = this.parseQueryString();
                },
                
                parseQueryString: function() {
                    if (!location.search.length){
                        return {};
                    }
                    
                    var params = {};
                    
                    for (
                        var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&');
                        i < aCouples.length;
                        i++
                    ) {
                        aKeyValue = aCouples[i].split('=');
                        if (aKeyValue.length > 1){
                            params[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(
                                aKeyValue[1]
                            );
                        }
                    }
                    return params;
                },
                
                initCollageGrid: function() {
                    if (!this.cache.$productGridRows.length){
                        return;
                    }
                    
                    this.collageGridHeights();
                    
                    theme.cache.$window.on(
                        'resize',
                        theme.debounce(this.collageGridHeights, 500)
                    );
                },
                
                collageGridHeights: function() {
                    if (theme.variables.bpSmall || !this.cache.$productGridRows.length){
                        return;
                    }
                    
                    // calculate image heights for each row of grid images
                    for (var i = this.cache.$productGridRows.length - 1; i >= 0; i--) {
                        var $currentRow = $(this.cache.$productGridRows[i]);
                        var $smallImages = $currentRow.find(
                            '.grid__item--small .grid-product__image-wrapper'
                        );
                        var $largeImageWrapper = $currentRow.find(
                            '.grid__item--large .grid-product__image-wrapper'
                        );
                        var $largeImage = $largeImageWrapper.find('.grid-product__image-link');
                        
                        // calculate the bottom edge of the small image
                        var smallImageOffset =
                            $smallImages[1].offsetTop + $smallImages[1].offsetHeight;
                        
                        // calculate the bottom edge of the large image for the row
                        var largeImageOffset =
                            $largeImageWrapper[0].offsetTop + $largeImageWrapper[0].offsetHeight;
                        
                        var largeImageHeight = 0;
                        
                        // Depending on which image is lower, increase or decrease the large
                        // image size
                        if (smallImageOffset > largeImageOffset){
                            largeImageHeight =
                                $largeImage.height() + (smallImageOffset - largeImageOffset);
                        } else {
                            largeImageHeight =
                                $largeImage.height() - (largeImageOffset - smallImageOffset);
                        }
                        
                        $largeImage.css('height', largeImageHeight);
                    }
                },
                
                clearCollageGridHeights: function() {
                    if (!this.cache.$productGridRows.length){
                        return;
                    }
                    
                    this.cache.$productGridPhotosLarge.removeAttr('style');
                },
                
                collectionSorting: function() {
                    if (!this.cache.$tagList.length){
                        return;
                    }
                    
                    this.cache.$tagList.on('change', function() {
                        window.location.href = $(this).val();
                    });
                },
                
                sortCollection: function() {
                    if (!this.cache.$sortDropdown.length){
                        return;
                    }
                    
                    if (Shopify.queryParams.page){
                        delete Shopify.queryParams.page;
                    }
                    Shopify.queryParams.sort_by = this.cache.$sortDropdown.val();
                    location.search = jQuery.param(Shopify.queryParams);
                }
            });
            
            return Collection;
        })(),
        PasswordHeader: (function() {
            function PasswordHeader() {
                this.init();
            }
            
            PasswordHeader.prototype = _.assignIn({}, PasswordHeader.prototype, {
                init: function() {
                    $('.js-toggle-login-modal').magnificPopup({
                        type: 'inline',
                        mainClass: 'mfp-fade',
                        closeOnBgClick: false,
                        closeBtnInside: false,
                        closeOnContentClick: false,
                        tClose: password.strings.pageClose,
                        removalDelay: 500,
                        callbacks: {
                            open: function() {
                                window.setTimeout(function() {
                                    document.getElementById('password').focus();
                                }, 50);
                            },
                            close: function() {
                                window.setTimeout(function() {
                                    document.getElementById('email').focus();
                                }, 50);
                            }
                        }
                    });
                    if ($('.storefront-password-form .errors').size()){
                        $('.js-toggle-login-modal').click();
                    }
                }
            });
            
            return PasswordHeader;
        })(),
        
        PasswordContent: (function() {
            function PasswordContent() {
                theme.styleTextLinks();
            }
            
            return PasswordContent;
        })(),
        
        Maps: (function() {
            var config = {
                zoom: 14
            };
            var apiStatus = null;
            var mapsToLoad = [];
            
            var errors = {
                addressNoResults: theme.strings.addressNoResults,
                addressQueryLimit: theme.strings.addressQueryLimit,
                addressError: theme.strings.addressError,
                authError: theme.strings.authError
            };
            
            var selectors = {
                section: '[data-section-type="map"]',
                map: '[data-map]',
                mapOverlay: '[data-map-overlay]'
            };
            
            var classes = {
                mapError: 'map-section--load-error',
                errorMsg: 'map-section__error errors text-center'
            };
            
            // Global function called by Google on auth errors.
            // Show an auto error message on all map instances.
            // eslint-disable-next-line camelcase, no-unused-vars
            window.gm_authFailure = function() {
                if (!Shopify.designMode) return;
                
                if (Shopify.designMode){
                    $(selectors.section).addClass(classes.mapError);
                    $(selectors.map).remove();
                    $(selectors.mapOverlay).after(
                        '<div class="' +
                        classes.errorMsg +
                        '">' +
                        theme.strings.authError +
                        '</div>'
                    );
                }
            };
            
            function Map(container) {
                this.$container = $(container);
                this.$map = this.$container.find(selectors.map);
                this.key = this.$map.data('api-key');
                
                if (typeof this.key !== 'string' || this.key === ''){
                    return;
                }
                
                if (apiStatus === 'loaded'){
                    var self = this;
                    
                    // Check if the script has previously been loaded with this key
                    var $script = $('script[src*="' + this.key + '&"]');
                    if ($script.length === 0){
                        $.getScript(
                            'https://maps.googleapis.com/maps/api/js?key=' + this.key
                        ).then(function() {
                            apiStatus = 'loaded';
                            self.createMap();
                        });
                    } else {
                        this.createMap();
                    }
                } else {
                    mapsToLoad.push(this);
                    
                    if (apiStatus !== 'loading'){
                        apiStatus = 'loading';
                        if (typeof window.google === 'undefined'){
                            $.getScript(
                                'https://maps.googleapis.com/maps/api/js?key=' + this.key
                            ).then(function() {
                                apiStatus = 'loaded';
                                initAllMaps();
                            });
                        }
                    }
                }
            }
            
            function initAllMaps() {
                // API has loaded, load all Map instances in queue
                $.each(mapsToLoad, function(index, instance) {
                    instance.createMap();
                });
            }
            
            function geolocate($map) {
                var deferred = $.Deferred();
                var geocoder = new google.maps.Geocoder();
                var address = $map.data('address-setting');
                
                geocoder.geocode({address: address}, function(results, status) {
                    if (status !== google.maps.GeocoderStatus.OK){
                        deferred.reject(status);
                    }
                    
                    deferred.resolve(results);
                });
                
                return deferred;
            }
            
            Map.prototype = _.assignIn({}, Map.prototype, {
                createMap: function() {
                    var $map = this.$map;
                    
                    return geolocate($map)
                    .then(
                        function(results) {
                            var mapOptions = {
                                zoom: config.zoom,
                                center: results[0].geometry.location,
                                draggable: false,
                                clickableIcons: false,
                                scrollwheel: false,
                                disableDoubleClickZoom: true,
                                disableDefaultUI: true
                            };
                            
                            var map = (this.map = new google.maps.Map($map[0], mapOptions));
                            var center = (this.center = map.getCenter());
                            
                            //eslint-disable-next-line no-unused-vars
                            var marker = new google.maps.Marker({
                                map: map,
                                position: map.getCenter()
                            });
                            
                            google.maps.event.addDomListener(window, 'resize', function() {
                                google.maps.event.trigger(map, 'resize');
                                map.setCenter(center);
                                $map.removeAttr('style');
                            });
                        }.bind(this)
                    )
                    .fail(function() {
                        var errorMessage;
                        
                        switch (status) {
                            case 'ZERO_RESULTS':
                                errorMessage = errors.addressNoResults;
                                break;
                            case 'OVER_QUERY_LIMIT':
                                errorMessage = errors.addressQueryLimit;
                                break;
                            case 'REQUEST_DENIED':
                                errorMessage = errors.authError;
                                break;
                            default:
                                errorMessage = errors.addressError;
                                break;
                        }
                        
                        // Show errors only to merchant in the editor.
                        if (Shopify.designMode){
                            $map
                            .parent()
                            .addClass(classes.mapError)
                            .html(
                                '<div class="' +
                                classes.errorMsg +
                                '">' +
                                errorMessage +
                                '</div>'
                            );
                        }
                    });
                },
                
                onUnload: function() {
                    if (this.$map.length === 0){
                        return;
                    }
                    google.maps.event.clearListeners(this.map, 'resize');
                }
            });
            
            return Map;
        })(),
        Search: (function() {
            function Search() {
                theme.equalHeights();
            }
            
            return Search;
        })(),
        initCache: function() {
            theme.cache = {
                $window: $(window),
                $html: $('html'),
                $body: $('body'),
                $drawerRight: $('.drawer--right'),
                
                $hero: $('#Hero'),
                $customSelect: $('.js-selector'),
                
                $collectionImage: $('.collection-hero__image'),
                
                $siteNav: $('.site-nav'),
                $siteNavOpen: $('.site-nav--open'),
                $cartBuggle: $('.cart-link__bubble'),
                $logoWrapper: $('.site-header__logo'),
                $logo: $('.site-header__logo img'),
                $toggleSearchModal: $('.js-toggle-search-modal'),
                $searchBox: $('.site-nav--search__bar'),
                
                $productImages: $('.product-single__photos'),
                $productImagePhoto: $('.product-single__photo'),
                
                $indentedRteImages: $('.rte--indented-images'),
                
                $productGridRows: $('.collage-grid__row'),
                $productGridPhotosLarge: $('.grid__item--large .grid-product__image-link'),
                
                // Equal height elements
                $productGridImages: $('.grid-uniform .grid-product__image-wrapper'),
                
                $returnLink: $('.return-link')
            };
        },
        
        init: function() {
            theme.initCache();
            theme.setBreakpoints();
            theme.fitNav();
            theme.cartInit();
            theme.afterCartLoad();
            theme.checkoutIndicator();
            theme.returnLink();
            theme.styleTextLinks();
            theme.searchModal();
            
            // Functions to run on load so image sizes can be calculated
            theme.cache.$window.on('load', theme.resizeLogo);
            theme.cache.$window.on('load', theme.articleImages);
            
            // Functions to re-run on resize
            theme.cache.$window.on('resize', theme.debounce(theme.resizeLogo, 150));
        },
        
        returnLink: function() {
            if (!document.referrer || !theme.cache.$returnLink.length || !window.history.length){
                return;
            }
            
            theme.cache.$returnLink.on('click', theme.backButton);
        },
        
        backButton: function() {
            var referrerDomain = urlDomain(document.referrer);
            var shopDomain = urlDomain(document.url);
            
            if (shopDomain === referrerDomain){
                history.back();
                return false;
            }
            
            function urlDomain(url) {
                var a = document.createElement('a');
                a.href = url;
                return a.hostname;
            }
        },
        
        setBreakpoints: function() {
            enquire.register(theme.variables.mediaQuerySmall, {
                match: function() {
                    if (theme.settings.gridType === 'collage'){
                        theme.clearCollageGridHeights();
                    }
                    
                    theme.variables.bpSmall = true;
                },
                unmatch: function() {
                    theme.variables.bpSmall = false;
                }
            });
            
        },
        fitNav: function() {
            // Measure children of site nav on load and resize.
            // If wider than parent, switch to mobile nav.
            controlNav();
            theme.cache.$window.on('load', controlNav);
            theme.cache.$window.on('resize', theme.debounce(controlNav, 150));
            
            function controlNav() {
                // Subtract 20 from width to account for inline-block spacing
                var navWidth = theme.cache.$siteNav.parent().outerWidth() - 20;
                var navItemWidth = 0;
                theme.cache.$siteNav.find('> li').each(function() {
                    var $el = $(this);
                    // Round up to be safe
                    navItemWidth += Math.ceil($(this).width());
                });
                
                if (navItemWidth > navWidth){
                    theme.cache.$siteNav.addClass('site-nav--compress');
                    theme.cache.$siteNav.parent().removeClass('large--two-thirds').addClass('large--one-sixth');
                    theme.cache.$siteNavOpen.addClass('site-nav--open__display');
                    theme.cache.$siteNavOpen.parent().removeClass('large--hide');
                    theme.cache.$logoWrapper.parent().removeClass('large--one-third').addClass('large--two-thirds');
                    theme.cache.$logoWrapper.removeClass('large--left').addClass('text-center');
                    theme.cache.$searchBox.hide();
                } else {
                    theme.cache.$siteNav.removeClass('site-nav--compress');
                    theme.cache.$siteNavOpen.removeClass('site-nav--open__display');
                    theme.cache.$siteNavOpen.parent().addClass('large--hide');
                    theme.cache.$searchBox.show();
                }
                
                theme.cache.$siteNav.addClass('site-nav--init');
                theme.cache.$siteNavOpen.addClass('site-nav--init');
            }
        },
        
        resizeLogo: function() {
            // Using .each() as there can be a reversed logo too
            theme.cache.$logo.each(function() {
                var $el = $(this),
                    logoWidthOnScreen = $el.width(),
                    containerWidth = $el.closest('.grid__item').width();
                // If image exceeds container, let's make it smaller
                if (logoWidthOnScreen > containerWidth){
                    $el.css('maxWidth', containerWidth);
                }
                else {
                    $el.removeAttr('style');
                }
            });
        },
        
        sizeCartDrawerFooter: function() {
            // Stop if our drawer doesn't have a fixed footer
            if (!theme.cache.$drawerRight.hasClass('drawer--has-fixed-footer')){
                return;
            }
            
            // Elements are reprinted regularly so selectors are not cached
            var $cartFooter = $('.ajaxcart__footer').removeAttr('style');
            var $cartInner = $('.ajaxcart__inner').removeAttr('style');
            var cartFooterHeight = $cartFooter.outerHeight();
            var cartDrawerTitleHeight = $('.drawer--right .drawer__header').outerHeight();
            var $cartDrawerInner = $('.drawer--right .drawer__inner');
            
            if (cartDrawerTitleHeight != 80){
                $cartDrawerInner.css('top', cartDrawerTitleHeight);
            }
            
            $cartInner.css('bottom', cartFooterHeight);
            $cartFooter.css('height', cartFooterHeight);
        },
        
        afterCartLoad: function() {
            theme.cache.$body.on('ajaxCart.afterCartLoad', function(evt, cart) {
                // Open cart drawer
                timber.RightDrawer.open();
                
                // Size the cart's fixed footer
                theme.sizeCartDrawerFooter();
                
                // Show cart bubble in nav if items exist
                if (cart.items.length > 0){
                    theme.cache.$cartBuggle.addClass('cart-link__bubble--visible');
                } else {
                    theme.cache.$cartBuggle.removeClass('cart-link__bubble--visible');
                }
            });
        },
        
        checkoutIndicator: function() {
            // Add a loading indicator on the cart checkout button (/cart and drawer)
            theme.cache.$body.on('click', '.cart__checkout', function() {
                $(this).addClass('btn--loading');
            });
        },
        searchModal: function() {
            if (!theme.cache.$toggleSearchModal.length){
                return;
            }
            
            theme.cache.$toggleSearchModal.magnificPopup({
                type: 'inline',
                mainClass: 'mfp-fade',
                closeOnBgClick: true,
                closeBtnInside: false,
                closeOnContentClick: false,
                tClose: theme.strings.zoomClose,
                alignTop: true,
                removalDelay: 500
            });
        },
        
        clearCollageGridHeights: function() {
            if (!theme.cache.$productGridRows.length){
                return;
            }
            ;
            
            theme.cache.$productGridPhotosLarge.removeAttr('style');
        },
        
        articleImages: function() {
            if (!theme.cache.$indentedRteImages.length){
                return;
            }
            
            theme.cache.$indentedRteImages.find('img').each(function() {
                var $el = $(this);
                var attr = $el.attr('style');
                
                // Check if undefined or float: none
                if (!attr || attr == 'float: none;'){
                    // Remove grid-breaking styles if image isn't wider than parent
                    if ($el.width() < theme.cache.$indentedRteImages.width()){
                        $el.addClass('rte__no-indent');
                    }
                }
            });
        },
        
        styleTextLinks: function() {
            $('.rte').find('a:not(:has(img))').addClass('text-link');
        },
        
        equalHeights: function() {
            var self = this;
            theme.cache.$window.on('load', resizeElements());
            
            theme.cache.$window.on(
                'resize',
                afterResize(
                    function() {
                        resizeElements();
                    },
                    250,
                    'equal-heights'
                )
            );
            
            function resizeElements() {
                self.cache.$productGridImages.css('height', 'auto').equalHeights();
            }
        },
        
        cartInit: function() {
            if (!theme.cookiesEnabled()){
                theme.cache.$body.addClass('cart--no-cookies');
            }
        },
        
        cookiesEnabled: function() {
            var cookieEnabled = navigator.cookieEnabled;
            
            if (!cookieEnabled){
                document.cookie = 'testcookie';
                cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
            }
            return cookieEnabled;
        },
        _createInit: function() {
            
            return "GILLIAN WAS HERE";
        }
    }
})();


