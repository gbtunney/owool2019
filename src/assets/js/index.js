/*eslint-disable */

// Import main stylesheet
import '../sass/index.scss'

import $ from 'jquery';
jQuery=window.jQuery = $;
window.$ = $;

// Utilities
//import Foo from './utilities/foo'
import _ from 'lodash';
import handlebars from 'handlebars/dist/handlebars.js';
//import Variants from './utilities/foo';

import {Slugify,filterArrayByValue} from './brooklyn/slate';

import {theme,timber} from './brooklyn/theme';

console.log(Slugify('heheheehTTTTTT'));

console.log("sdsds",theme,timber)