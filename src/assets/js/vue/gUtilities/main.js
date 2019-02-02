import math from 'mathjs'
import isColor from 'is-color';
import randomColor from 'randomcolor';

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

export function setQueryStringParameter(name, value) {
	const params = new URLSearchParams(location.search);
	params.set(name, value);
	window.history.replaceState({}, "", decodeURIComponent(`${location.pathname}?${params}`));
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


export const GDatamapper = {
	mapData : function(obj,map,merge =true){
		let data_map = map;
		let Obj= Object.assign(obj);
		Object.keys(obj).forEach(function(key) {
			console.log(`key ${ key} ,${data_map.hasOwnProperty(key)}map   ${Obj.hasOwnProperty(key) } obj`);
			
			if (data_map.hasOwnProperty(key) && (typeof data_map[key]=='function') ){
				Obj[key] = (data_map[key]).call(data_map[key],Obj,key);
			}else{
				if (Obj.hasOwnProperty(key) ){
					if ( merge ){
						console.log("key for this being creeated",key);
						
						Obj[key] = Obj[key] ;
					}else{
						console.log("key for this being deleted", key);
						
						delete Obj[key];
					}
					
				}else{
				
				}
			}
		});
		return Obj;
	},
	expandToObject: function(_value ,_newprop=false,_addprops={} ){
		if( typeof _value == "string" ||  typeof _value == "number"  ){
			if ( _newprop){
				return	Object.assign({[_newprop.toString()] :_value  }, _addprops);
			}else{
				return	Object.assign({} , _addprops);
			}
		}else{
			return _value;
		}
	},
	parseToDictionary : function( _array ,_keyprop,_addprops ={}){
		var _dictionary = new Map();
		
		if ( typeof _array == "object" ){
			for ( var i = 0 ; i < _array.length; i++){
				var _currObject = _array[i];
				
				//if ( typeof _currObject != "object" ){
					///this is when the value
					//throw "its an array need to map";
					
			//	}else{
					var _newObject = Object.assign({_index: i }, _currObject);
					if (_newObject && _currObject[_keyprop] ){
					_dictionary.set(_currObject[_keyprop].toString(), _newObject);
					
				}
				//}
				
			}
		}else{
			return false;
		}
		
		return _dictionary;
	}
};
export default {
	// Some data...
};