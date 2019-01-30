/*eslint-disable */

import $ from 'jquery';
jQuery=window.jQuery = $;
window.$ = $;

export function Slugify(text) {
    // https://gist.github.com/mathewbyrne/1280286
    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
    .replace(/[\s_-]+/g, '-');
    
    
}
export function filterArrayByValue(_array,_value, _prop=false){
    if ( !_array || !_value  || _array.lengt <= 0 ) return;
    
    let prop = _prop , value =_value;
    return _array.filter(function(item){
        
        if (item.hasOwnProperty(prop) && item[prop] == value ) return true;
        return;
    })
    
    return;
    
}








