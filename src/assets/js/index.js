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

import {slickTheme} from './brooklyn/theme';
import {timber} from './brooklyn/timber';
import {ShopifyApi,ajaxCart} from './brooklyn/shopifyapi';
import {slate} from './brooklyn/slate';


//console.log("sdsds",theme.variables)


$(document).ready(function() {

});
// Initialize Timber's JS on docready
//$(timber.init);
