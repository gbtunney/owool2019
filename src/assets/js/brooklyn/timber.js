export const timber = (function () {
    
    // Keep this variable private inside this closure scope
    
    // Expose these functions via an interface while hiding
    // the implementation of the module within the function() block
    
    return {
        
        
        initCache : function() {
            timber.cache = {
                // General
                $html: $('html'),
                $body: $('body'),
                $window: $(window),
                
                // Navigation
                $navigation: $('#AccessibleNav'),
                
                // Product Page
                $optionSelector: $('.single-option-selector'),
                
                // Customer Pages
                $recoverPasswordLink: $('#RecoverPassword'),
                $hideRecoverPasswordLink: $('#HideRecoverPasswordLink'),
                $recoverPasswordForm: $('#RecoverPasswordForm'),
                $customerLoginForm: $('#CustomerLoginForm'),
                $passwordResetSuccess: $('#ResetSuccess')
            };
        },
        
        init : function() {
            timber.initCache();
            timber.accessibleNav();
            timber.drawersInit();
            timber.responsiveVideos();
            timber.loginForms();
        },
        
        accessibleNav : function() {
            var classes = {
                active: 'nav-hover',
                focus: 'nav-focus',
                outside: 'nav-outside',
                hasDropdown: 'site-nav--has-dropdown',
                link: 'site-nav__link'
            };
            var selectors = {
                active: '.' + classes.active,
                hasDropdown: '.' + classes.hasDropdown,
                dropdown: '[data-meganav-dropdown]',
                link: 'a',
                nextLink: '> a',
                parentLink: '[data-meganav-type="parent"]',
                childLink: '[data-meganav-type="child"]'
            };
            
            var $nav = timber.cache.$navigation,
                $allLinks = $nav.find(selectors.link),
                $parents = $nav.find(selectors.hasDropdown),
                $childLinks = $nav.find(selectors.childLink),
                $topLevel = $parents.find(selectors.nextLink),
                $dropdowns = $nav.find(selectors.dropdown),
                $subMenuLinks = $dropdowns.find(selectors.link);
            
            // Mouseenter
            $parents.on('mouseenter touchstart', function(evt) {
                var $el = $(this);
                var evtType = evt.type;
                var $dropdowns = $nav.find(selectors.active);
                
                if (!$el.hasClass(classes.active)) {
                    // force stop the click from happening
                    evt.preventDefault();
                    evt.stopImmediatePropagation();
                }
                
                // Make sure we close any opened same level dropdown before opening a new one
                if (evtType === 'touchstart' && $dropdowns.length > 0) {
                    hideDropdown($el);
                }
                
                showDropdown($el);
            });
            
            $childLinks.on('touchstart', function(evt) {
                evt.stopImmediatePropagation();
            });
            
            $parents.on('mouseleave', function() {
                hideDropdown($(this));
            });
            
            $allLinks.on('focus', function() {
                handleFocus($(this));
            });
            
            $allLinks.on('blur', function() {
                removeFocus($topLevel);
            });
            
            // accessibleNav private methods
            function handleFocus($el) {
                var $newFocus = null,
                    $previousItem = $el.parent().prev();
                
                // Always put tabindex -1 on previous element just in case the user is going backward.
                // In that case, we want to focus on the previous parent and not the previous parent childs
                
                $allLinks.attr('tabindex', '');
                
                if ($previousItem.hasClass(classes.hasDropdown)) {
                    $previousItem.find(selectors.dropdown + ' a').attr('tabindex', -1);
                }
                
                $newFocus = $el.parents(selectors.hasDropdown).find('> a');
                addFocus($newFocus);
            }
            
            function showDropdown($el) {
                var $toplevel = $el.find(selectors.nextLink);
                
                $toplevel.attr('aria-expanded', true);
                
                $el.addClass(classes.active);
                
                setTimeout(function() {
                    timber.cache.$body.on('touchstart.MegaNav', function() {
                        hideDropdowns();
                    });
                }, 250);
            }
            
            function hideDropdown($el) {
                var $dropdowns = $el.parent().find(selectors.active);
                var $parentLink = $dropdowns.find(selectors.nextLink);
                
                $parentLink.attr('aria-expanded', false);
                
                $dropdowns.removeClass(classes.active);
                
                timber.cache.$body.off('touchstart.MegaNav');
            }
            
            function hideDropdowns() {
                var $dropdowns = $nav.find(selectors.active);
                $.each($dropdowns, function() {
                    hideDropdown($(this));
                });
            }
            
            function addFocus($el) {
                $el.addClass(classes.focus);
                
                if ($el.attr('aria-expanded') !== undefined) {
                    $el.attr('aria-expanded', true);
                }
            }
            
            function removeFocus($el) {
                $el.removeClass(classes.focus);
                
                $subMenuLinks.attr('tabindex', -1);
                
                if ($el.attr('aria-expanded') !== undefined) {
                    $el.attr('aria-expanded', false);
                }
            }
            
            // Check if dropdown is outside of viewport
            function handleDropdownOffset($dropdowns) {
                var viewportSize = $(window).width();
                $dropdowns.removeClass(classes.outside);
                
                $.each($dropdowns, function() {
                    var $dropdown = $(this);
                    var dropdownOffset = $dropdown.offset().left + $dropdown.width();
                    if (dropdownOffset > viewportSize) {
                        $dropdown.addClass(classes.outside);
                    }
                });
            }
            
            timber.cache.$window.load(function() {
                handleDropdownOffset($dropdowns);
            });
            
            timber.cache.$window.resize(function() {
                afterResize(function() {
                    handleDropdownOffset($dropdowns);
                }, 250);
            });
        },
        drawersInit : function() {
            timber.LeftDrawer = new timber.Drawers('NavDrawer', 'left');
            if (theme.settings.cartType === 'drawer') {
                timber.RightDrawer = new timber.Drawers('CartDrawer', 'right', {
                    onDrawerOpen: ajaxCart.load
                });
            }
        },
        
        getHash : function() {
            return window.location.hash;
        },
        
        responsiveVideos : function() {
            var $iframeVideo = $(
                'iframe[src*="youtube.com/embed"], iframe[src*="player.vimeo"]'
            );
            var $iframeReset = $iframeVideo.add('iframe#admin_bar_iframe');
            
            $iframeVideo.each(function() {
                // Add wrapper to make video responsive
                if (!$(this).parents('.video-wrapper').length) {
                    $(this).wrap('<div class="video-wrapper"></div>');
                }
            });
            
            $iframeReset.each(function() {
                // Re-set the src attribute on each iframe after page load
                // for Chrome's 'incorrect iFrame content on 'back'' bug.
                // https://code.google.com/p/chromium/issues/detail?id=395791
                // Need to specifically target video and admin bar
                this.src = this.src;
            });
        },
        
        loginForms : function() {
            function showRecoverPasswordForm() {
                timber.cache.$recoverPasswordForm.show();
                timber.cache.$customerLoginForm.hide();
            }
            
            function hideRecoverPasswordForm() {
                timber.cache.$recoverPasswordForm.hide();
                timber.cache.$customerLoginForm.show();
            }
            
            timber.cache.$recoverPasswordLink.on('click', function(evt) {
                evt.preventDefault();
                showRecoverPasswordForm();
            });
            
            timber.cache.$hideRecoverPasswordLink.on('click', function(evt) {
                evt.preventDefault();
                hideRecoverPasswordForm();
            });
            
            // Allow deep linking to recover password form
            if (timber.getHash() === '#recover') {
                showRecoverPasswordForm();
            }
        },
        
        resetPasswordSuccess : function() {
            timber.cache.$passwordResetSuccess.show();
        },
        
        /*============================================================================
          Drawer modules
          - Docs http://shopify.github.io/Timber/#drawers
        ==============================================================================*/
        Drawers :(function() {
            var Drawer = function(id, position, options) {
                var defaults = {
                    close: '.js-drawer-close',
                    open: '.js-drawer-open-button-' + position,
                    openButtonLeftClass: 'js-drawer-open-button-left',
                    drawerLeftClass: 'drawer--left',
                    drawerRightClass: 'drawer--right',
                    openClass: 'js-drawer-open',
                    dirOpenClass: 'js-drawer-open-' + position
                };
                
                this.nodes = {
                    $parent: $('body, html'),
                    $page: $('#PageContainer'),
                    $moved: $('.page-container')
                };
                
                this.config = $.extend(defaults, options);
                this.position = position;
                
                this.$drawer = $('#' + id);
                
                if (!this.$drawer.length) {
                    return false;
                }
                
                this.drawerIsOpen = false;
                this.init();
            };
            
            Drawer.prototype.init = function() {
                var $openBtn = $(this.config.open);
                
                // Add aria controls
                $openBtn.attr('aria-expanded', 'false');
                
                $openBtn.on('click', $.proxy(this.open, this));
                this.$drawer.find(this.config.close).on('click', $.proxy(this.close, this));
            };
            
            Drawer.prototype.open = function(evt) {
                // Keep track if drawer was opened from a click, or called by another function
                var externalCall = false;
                
                // Other drawers that might be open (will be closed later)
                var $otherDrawers = $('.drawer').not(this.$drawer);
                
                // don't open an opened drawer
                if (this.drawerIsOpen) {
                    if (evt) {
                        evt.preventDefault();
                    }
                    return;
                }
                
                // Close other drawers if they are open
                var self = this;
                $otherDrawers.each(function() {
                    if (!$(this).hasClass(self.config.openClass)) {
                        return;
                    }
                    
                    if ($(this).hasClass(self.config.drawerLeftClass)) {
                        timber.LeftDrawer.close();
                    }
                    
                    if ($(this).hasClass(self.config.drawerRightClass)) {
                        timber.RightDrawer.close();
                    }
                });
                
                // Prevent following href if link is clicked
                if (evt) {
                    evt.preventDefault();
                } else {
                    externalCall = true;
                }
                
                // Without this, the drawer opens, the click event bubbles up to $nodes.page
                // which closes the drawer.
                if (evt && evt.stopPropagation) {
                    evt.stopPropagation();
                    // save the source of the click, we'll focus to this on close
                    this.$activeSource = $(evt.currentTarget);
                }
                
                if (this.drawerIsOpen && !externalCall) {
                    return this.close();
                }
                
                // Add is-transitioning class to moved elements on open so drawer can have
                // transition for close animation
                this.nodes.$moved.addClass('is-transitioning');
                this.$drawer.prepareTransition();
                
                this.nodes.$parent.addClass(
                    this.config.openClass + ' ' + this.config.dirOpenClass
                );
                this.$drawer.addClass(this.config.openClass);
                
                this.drawerIsOpen = true;
                
                // Set focus on drawer
                Drawer.prototype.trapFocus({
                    $container: this.$drawer,
                    namespace: 'drawer_focus'
                });
                
                // Run function when drawer opens if set
                if (
                    this.config.onDrawerOpen &&
                    typeof this.config.onDrawerOpen === 'function'
                ) {
                    if (!externalCall) {
                        this.config.onDrawerOpen();
                    }
                }
                
                if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
                    this.$activeSource.attr('aria-expanded', 'true');
                }
                
                this.bindEvents();
            };
            
            Drawer.prototype.close = function(evt) {
                // don't close a closed drawer
                if (!this.drawerIsOpen) {
                    return;
                }
                
                if (evt.keyCode !== 27) {
                    evt.preventDefault();
                }
                // deselect any focused form elements
                $(document.activeElement).trigger('blur');
                
                // Ensure closing transition is applied to moved elements, like the nav
                this.nodes.$moved.prepareTransition({ disableExisting: true });
                this.$drawer.prepareTransition({ disableExisting: true });
                
                this.nodes.$parent.removeClass(
                    this.config.dirOpenClass + ' ' + this.config.openClass
                );
                this.$drawer.removeClass(this.config.openClass);
                
                this.drawerIsOpen = false;
                
                // Remove focus on drawer
                Drawer.prototype.removeTrapFocus({
                    $container: this.$drawer,
                    namespace: 'drawer_focus'
                });
                
                if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
                    this.$activeSource.attr('aria-expanded', 'false');
                }
                
                this.unbindEvents();
            };
            
            /**
             * Traps the focus in a particular container
             *
             * @param {object} options - Options to be used
             * @param {jQuery} options.$container - Container to trap focus within
             * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
             * @param {string} options.namespace - Namespace used for new focus event handler
             */
            Drawer.prototype.trapFocus = function(options) {
                var eventName = options.namespace
                    ? 'focusin.' + options.namespace
                    : 'focusin';
                
                if (!options.$elementToFocus) {
                    options.$elementToFocus = options.$container;
                    options.$container.attr('tabindex', '-1');
                }
                
                options.$elementToFocus.focus();
                
                $(document).on(eventName, function(evt) {
                    if (
                        options.$container[0] !== evt.target &&
                        !options.$container.has(evt.target).length
                    ) {
                        options.$container.focus();
                    }
                });
            };
            
            /**
             * Removes the trap of focus in a particular container
             *
             * @param {object} options - Options to be used
             * @param {jQuery} options.$container - Container to trap focus within
             * @param {string} options.namespace - Namespace used for new focus event handler
             */
            Drawer.prototype.removeTrapFocus = function(options) {
                var eventName = options.namespace
                    ? 'focusin.' + options.namespace
                    : 'focusin';
                
                if (options.$container && options.$container.length) {
                    options.$container.removeAttr('tabindex');
                }
                
                $(document).off(eventName);
            };
            
            Drawer.prototype.bindEvents = function() {
                // Lock scrolling on mobile
                this.nodes.$page.on('touchmove.drawer', function() {
                    return false;
                });
                
                this.$drawer.on('click.drawer', function(event) {
                    if ($(this).hasClass('drawer--left')) {
                        event.stopPropagation();
                    }
                });
                
                $('.page-container, .drawer__header-container').on(
                    'click.drawer',
                    this.close.bind(this)
                );
                
                // Pressing escape closes drawer
                this.nodes.$parent.on(
                    'keyup.drawer',
                    $.proxy(function(evt) {
                        // The hamburger 'open' button changes to a 'close' button when the drawer
                        // is open. Clicking on it will close the drawer.
                        if (this.$activeSource !== undefined) {
                            this.$activeSource.on(
                                'click.drawer',
                                $.proxy(function() {
                                    if (
                                        !this.$activeSource.hasClass(this.config.openButtonLeftClass)
                                    ) {
                                        return;
                                    }
                                    this.close();
                                }, this)
                            );
                        }
                        if (evt.keyCode === 27) {
                            this.close(evt);
                        }
                    }, this)
                );
            };
            
            Drawer.prototype.unbindEvents = function() {
                if (this.$activeSource !== undefined) {
                    this.$activeSource.off('.drawer');
                }
                this.nodes.$page.off('.drawer');
                this.nodes.$parent.off('.drawer');
            };
            
            return Drawer;
        })()
    }
})();
