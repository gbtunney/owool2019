/*eslint-disable */

// Import main stylesheet
import '../sass/index.scss'

import $ from 'jquery';
jQuery=window.jQuery = $;
window.$ = $;

import {mountVue} from "@vue/mountVue";
//import ExampleComponent from "@/components/ExampleComponent.vue";

mountVue('#theme-vue-wrapper', ExampleComponent);



// Utilities
//import Foo from './utilities/foo'
import _ from 'lodash';
import {debounce} from 'lodash';
import handlebars from 'handlebars/dist/handlebars.js';
import Modernizr from './utilities/modernizr.min';
//import modernizr from 'modernizr';
//window.Modernizr = Modernizr;

//import Variants from './utilities/foo';

import enquire from 'enquire-js/main.js';

//import {theme,slickTheme} from './brooklyn/theme';
import {timber} from './brooklyn/timber';
//import {slate} from './brooklyn/slate';
import  {theme} from './brooklyn/base';
import {ShopifyAPIbx,ajaxCart,attributeToString} from './brooklyn/shopifyapi';

//console.log("sdsds",theme.variables)
//import Modernizr from './utilities/modernizr.min.js';
const ShopifyAPI = ShopifyAPIbx;
window.timber = timber;

//console.log(theme,timber,ajaxCart);
//theme.init();
//const theme = window.theme;
$(document).ready(function() {
    //alert();
   
    $(timber.init);
    
    theme.init();
    var sections = new theme.Sections();
    
    console.log(theme,timber,sections);
    
  
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
