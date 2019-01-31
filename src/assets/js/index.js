/*eslint-disable */

// Import main stylesheet
import '../sass/index.scss'

import $ from 'jquery';
jQuery=window.jQuery = $;
window.$ = $;

// Utilities
//import Foo from './utilities/foo'
import _ from 'lodash';
import {debounce} from 'lodash';
import handlebars from 'handlebars/dist/handlebars.js';
//import Variants from './utilities/foo';

import enquire from 'enquire-js/main.js';

import {theme,slickTheme} from './brooklyn/theme';
import {timber} from './brooklyn/timber';
import {ShopifyApi,ajaxCart} from './brooklyn/shopifyapi';
import {slate} from './brooklyn/slate';
import {Modernizer} from './utilities/modernizr.min';

//console.log("sdsds",theme.variables)


$(document).ready(function() {
    theme.init();
    var sections = new theme.Sections();
    sections.register('product-template', theme.Product);
    sections.register('collection-template', theme.Collection);
    sections.register('header-section', theme.HeaderSection);
    sections.register('featured-content-section', theme.FeaturedContentSection);
    sections.register('newsletter-section', theme.NewsletterSection);
    sections.register('slideshow-section', theme.SlideshowSection);
    sections.register('password-header', theme.PasswordHeader);
    sections.register('password-content', theme.PasswordContent);
    sections.register('map', theme.Maps);
    sections.register('search', theme.Search);
});
// Initialize Timber's JS on docready
//$(timber.init);
