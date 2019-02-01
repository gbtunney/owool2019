/*eslint-disable */

import $ from 'jquery';
jQuery=window.jQuery = $;
window.$ = $;

// Utilities
//import Foo from './utilities/foo'
import _ from 'lodash';
import {debounce} from 'lodash';
import enquire from 'enquire-js/main.js';
import {ShopifyAPIbx,ajaxCart,attributeToString} from '../brooklyn/shopifyapi';
import handlebars from 'handlebars/dist/handlebars.js';
import {timber} from '../brooklyn/timber';

const ShopifyApi = ShopifyAPIbx;

//import {ShopifyAPIbx,ajaxCart,attributeToString} from '../brooklyn/shopifyapi';
const Handlebars=handlebars;

//const ShopifyAPI = ShopifyAPIbx;


//window.Modernizr = Modernizr;
window.theme = window.theme || {};
window.slate = window.slate || {};

/* ================ VENDORS ================ */
/* Simple jQuery Equal Heights @version 1.5.1. Copyright (c) 2013 Matt Banks. Dual licensed under the MIT and GPL licenses. */
!function(a){a.fn.equalHeights=function(){var b=0,c=a(this);return c.each(function(){var c=a(this).innerHeight();c>b&&(b=c)}),c.css("height",b)},a("[data-equal]").each(function(){var b=a(this),c=b.data("equal");b.find(c).equalHeights()})}(jQuery);

/*! Magnific Popup - v1.0.0 - 2015-03-30
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2015 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isIE7=-1!==c.indexOf("MSIE 7."),b.isIE8=-1!==c.indexOf("MSIE 8."),b.isLowIE=b.isIE7||b.isIE8,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",b.ev=c.mainEl&&c.mainEl.length?c.mainEl.eq(0):d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.wrap.css(b.fixedContentPos?{overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}:{top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),b.currTemplate[d]=f?a(f):!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||2!==c.which&&!c.ctrlKey&&!c.metaKey){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(a,c){if(void 0===c||c===!1)return!0;if(e=a.split("_"),e.length>1){var d=b.find(p+"-"+e[0]);if(d.length>0){var f=e[1];"replaceWith"===f?d[0]!==c[0]&&d.replaceWith(c):"img"===f?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(p+"-"+a).html(c)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery",g=Boolean(a.fn.mfpFastClick);return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s),h=g?"mfpFastClick":"click";e[h](function(){b.prev()}),f[h](function(){b.next()}),b.isIE7&&(x("b",e[0],!1,!0),x("a",e[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowLeft&&g&&b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){v.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g,h=a(this);if(c){var i,j,k,l,m,n;h.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,v.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0],(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)&&(l=!0,d())}).on("touchend"+f,function(a){d(),l||n>1||(g=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){g=!1},b),e())})})}h.on("click"+f,function(){g||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&v.off("touchmove"+f+" touchend"+f)}}(),A()});
/*
 * ScrollToFixed
 * https://github.com/bigspotteddog/ScrollToFixed
 *
 * Copyright (c) 2011 Joseph Cava-Lynch
 * MIT license
 */
(function(a){a.isScrollToFixed=function(b){return !!a(b).data("ScrollToFixed")};a.ScrollToFixed=function(d,i){var l=this;l.$el=a(d);l.el=d;l.$el.data("ScrollToFixed",l);var c=false;var G=l.$el;var H;var E;var e;var y;var D=0;var q=0;var j=-1;var f=-1;var t=null;var z;var g;function u(){G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");f=-1;D=G.offset().top;q=G.offset().left;if(l.options.offsets){q+=(G.offset().left-G.position().left)}if(j==-1){j=q}H=G.css("position");c=true;if(l.options.bottom!=-1){G.trigger("preFixed.ScrollToFixed");w();G.trigger("fixed.ScrollToFixed")}}function n(){var I=l.options.limit;if(!I){return 0}if(typeof(I)==="function"){return I.apply(G)}return I}function p(){return H==="fixed"}function x(){return H==="absolute"}function h(){return !(p()||x())}function w(){if(!p()){t.css({display:G.css("display"),width:G.outerWidth(true),height:G.outerHeight(true),"float":G.css("float")});cssOptions={"z-index":l.options.zIndex,position:"fixed",top:l.options.bottom==-1?s():"",bottom:l.options.bottom==-1?"":l.options.bottom,"margin-left":"0px"};if(!l.options.dontSetWidth){cssOptions.width=G.width()}G.css(cssOptions);G.addClass(l.options.baseClassName);if(l.options.className){G.addClass(l.options.className)}H="fixed"}}function b(){var J=n();var I=q;if(l.options.removeOffsets){I="";J=J-D}cssOptions={position:"absolute",top:J,left:I,"margin-left":"0px",bottom:""};if(!l.options.dontSetWidth){cssOptions.width=G.width()}G.css(cssOptions);H="absolute"}function k(){if(!h()){f=-1;t.css("display","none");G.css({"z-index":y,width:"",position:E,left:"",top:e,"margin-left":""});G.removeClass("scroll-to-fixed-fixed");if(l.options.className){G.removeClass(l.options.className)}H=null}}function v(I){if(I!=f){G.css("left",q-I);f=I}}function s(){var I=l.options.marginTop;if(!I){return 0}if(typeof(I)==="function"){return I.apply(G)}return I}function A(){if(!a.isScrollToFixed(G)){return}var K=c;if(!c){u()}else{if(h()){D=G.offset().top;q=G.offset().left}}var I=a(window).scrollLeft();var L=a(window).scrollTop();var J=n();if(l.options.minWidth&&a(window).width()<l.options.minWidth){if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}else{if(l.options.maxWidth&&a(window).width()>l.options.maxWidth){if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}else{if(l.options.bottom==-1){if(J>0&&L>=J-s()){if(!x()||!K){o();G.trigger("preAbsolute.ScrollToFixed");b();G.trigger("unfixed.ScrollToFixed")}}else{if(L>=D-s()){if(!p()||!K){o();G.trigger("preFixed.ScrollToFixed");w();f=-1;G.trigger("fixed.ScrollToFixed")}v(I)}else{if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}}}else{if(J>0){if(L+a(window).height()-G.outerHeight(true)>=J-(s()||-m())){if(p()){o();G.trigger("preUnfixed.ScrollToFixed");if(E==="absolute"){b()}else{k()}G.trigger("unfixed.ScrollToFixed")}}else{if(!p()){o();G.trigger("preFixed.ScrollToFixed");w()}v(I);G.trigger("fixed.ScrollToFixed")}}else{v(I)}}}}}function m(){if(!l.options.bottom){return 0}return l.options.bottom}function o(){var I=G.css("position");if(I=="absolute"){G.trigger("postAbsolute.ScrollToFixed")}else{if(I=="fixed"){G.trigger("postFixed.ScrollToFixed")}else{G.trigger("postUnfixed.ScrollToFixed")}}}var C=function(I){if(G.is(":visible")){c=false;A()}};var F=function(I){(!!window.requestAnimationFrame)?requestAnimationFrame(A):A()};var B=function(){var J=document.body;if(document.createElement&&J&&J.appendChild&&J.removeChild){var L=document.createElement("div");if(!L.getBoundingClientRect){return null}L.innerHTML="x";L.style.cssText="position:fixed;top:100px;";J.appendChild(L);var M=J.style.height,N=J.scrollTop;J.style.height="3000px";J.scrollTop=500;var I=L.getBoundingClientRect().top;J.style.height=M;var K=(I===100);J.removeChild(L);J.scrollTop=N;return K}return null};var r=function(I){I=I||window.event;if(I.preventDefault){I.preventDefault()}I.returnValue=false};l.init=function(){l.options=a.extend({},a.ScrollToFixed.defaultOptions,i);y=G.css("z-index");l.$el.css("z-index",l.options.zIndex);t=a("<div />");H=G.css("position");E=G.css("position");e=G.css("top");if(h()){l.$el.after(t)}a(window).bind("resize.ScrollToFixed",C);a(window).bind("scroll.ScrollToFixed",F);if("ontouchmove" in window){a(window).bind("touchmove.ScrollToFixed",A)}if(l.options.preFixed){G.bind("preFixed.ScrollToFixed",l.options.preFixed)}if(l.options.postFixed){G.bind("postFixed.ScrollToFixed",l.options.postFixed)}if(l.options.preUnfixed){G.bind("preUnfixed.ScrollToFixed",l.options.preUnfixed)}if(l.options.postUnfixed){G.bind("postUnfixed.ScrollToFixed",l.options.postUnfixed)}if(l.options.preAbsolute){G.bind("preAbsolute.ScrollToFixed",l.options.preAbsolute)}if(l.options.postAbsolute){G.bind("postAbsolute.ScrollToFixed",l.options.postAbsolute)}if(l.options.fixed){G.bind("fixed.ScrollToFixed",l.options.fixed)}if(l.options.unfixed){G.bind("unfixed.ScrollToFixed",l.options.unfixed)}if(l.options.spacerClass){t.addClass(l.options.spacerClass)}G.bind("resize.ScrollToFixed",function(){t.height(G.height())});G.bind("scroll.ScrollToFixed",function(){G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");A()});G.bind("detach.ScrollToFixed",function(I){r(I);G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");a(window).unbind("resize.ScrollToFixed",C);a(window).unbind("scroll.ScrollToFixed",F);G.unbind(".ScrollToFixed");t.remove();l.$el.removeData("ScrollToFixed")});C()};l.init()};a.ScrollToFixed.defaultOptions={marginTop:0,limit:0,bottom:-1,zIndex:1000,baseClassName:"scroll-to-fixed-fixed"};a.fn.scrollToFixed=function(b){return this.each(function(){(new a.ScrollToFixed(this,b))})}})(jQuery);

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.3.15
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,g,e=this;if(e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",onBeforeChange:null,onAfterChange:null,onInit:null,onReInit:null,onSetPosition:null,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rtl:!1,slide:"div",slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,waitForAnimate:!0},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.paused=!1,e.positionProp=null,e.respondTo=null,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.windowWidth=0,e.windowTimer=null,e.options=a.extend({},e.defaults,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,f=e.options.responsive||null,f&&f.length>-1){e.respondTo=e.options.respondTo||"window";for(g in f)f.hasOwnProperty(g)&&(e.breakpoints.push(f[g].breakpoint),e.breakpointSettings[f[g].breakpoint]=f[g].settings);e.breakpoints.sort(function(a,b){return b-a})}e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.init(),e.checkResponsive()}var b=0;return c}(),b.prototype.addSlide=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateSlide=function(b,c){var d={},e=this;if(1===e.options.slidesToShow&&e.options.adaptiveHeight===!0&&e.options.vertical===!1){var f=e.$slides.eq(e.currentSlide).outerHeight(!0);e.$list.animate({height:f},e.options.speed)}e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}}):(e.applyTransition(),d[e.animType]=e.options.vertical===!1?"translate3d("+b+"px, 0px, 0px)":"translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=null!=c.options.asNavFor?a(c.options.asNavFor).getSlick():null;null!=d&&d.slideHandler(b,!0)},b.prototype.applyTransition=function(a){var b=this,c={};c[b.transitionType]=b.options.fade===!1?b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:"opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(0===a.currentSlide-1&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow=a(b.options.prevArrow),b.$nextArrow=a(b.options.nextArrow),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.appendTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled"))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("index",b)}),b.$slidesCache=b.$slides,b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),b.options.centerMode===!0&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.options.accessibility===!0&&b.$list.prop("tabIndex",0),b.setSlideClasses("number"==typeof this.currentSlide?this.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.checkResponsive=function(){var c,d,e,b=this,f=b.$slider.width(),g=window.innerWidth||a(window).width();if("window"===b.respondTo?e=g:"slider"===b.respondTo?e=f:"min"===b.respondTo&&(e=Math.min(g,f)),b.originalSettings.responsive&&b.originalSettings.responsive.length>-1&&null!==b.originalSettings.responsive){d=null;for(c in b.breakpoints)b.breakpoints.hasOwnProperty(c)&&e<b.breakpoints[c]&&(d=b.breakpoints[c]);null!==d?null!==b.activeBreakpoint?d!==b.activeBreakpoint&&(b.activeBreakpoint=d,b.options=a.extend({},b.originalSettings,b.breakpointSettings[d]),b.refresh()):(b.activeBreakpoint=d,b.options=a.extend({},b.originalSettings,b.breakpointSettings[d]),b.refresh()):null!==b.activeBreakpoint&&(b.activeBreakpoint=null,b.options=b.originalSettings,b.refresh())}},b.prototype.changeSlide=function(b,c){var f,g,h,i,j,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),h=0!==d.slideCount%d.options.slidesToScroll,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var k=0===b.data.index?0:b.data.index||a(b.target).parent().index()*d.options.slidesToScroll;if(i=d.getNavigableIndexes(),j=0,i[k]&&i[k]===k)if(k>i[i.length-1])k=i[i.length-1];else for(var l in i){if(k<i[l]){k=j;break}j=i[l]}d.slideHandler(k,!1,c);default:return}},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(){var b=this;b.autoPlayClear(),b.touchObject={},a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&"object"!=typeof b.options.prevArrow&&b.$prevArrow.remove(),b.$nextArrow&&"object"!=typeof b.options.nextArrow&&b.$nextArrow.remove(),b.$slides.parent().hasClass("slick-track")&&b.$slides.unwrap().unwrap(),b.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("index").css({position:"",left:"",top:"",zIndex:"",opacity:"",width:""}),b.$slider.removeClass("slick-slider"),b.$slider.removeClass("slick-initialized"),b.$list.off(".slick"),a(window).off(".slick-"+b.instanceUid),a(document).off(".slick-"+b.instanceUid)},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b,c){var d=this;d.cssTransitions===!1?(d.$slides.eq(b).css({zIndex:1e3}),d.$slides.eq(b).animate({opacity:1},d.options.speed,d.options.easing,c),d.$slides.eq(a).animate({opacity:0},d.options.speed,d.options.easing)):(d.applyTransition(b),d.applyTransition(a),d.$slides.eq(b).css({opacity:1,zIndex:1e3}),d.$slides.eq(a).css({opacity:0}),c&&setTimeout(function(){d.disableTransition(b),d.disableTransition(a),c.call()},d.options.speed))},b.prototype.filterSlides=function(a){var b=this;null!==a&&(b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)d=Math.ceil(a.slideCount/a.options.slidesToScroll);else for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,g,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideWidth*b.options.slidesToShow,e=-1*d*b.options.slidesToShow),0!==b.slideCount%b.options.slidesToScroll&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=-1*(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth,e=-1*(b.options.slidesToShow-(a-b.slideCount))*d):(b.slideOffset=-1*b.slideCount%b.options.slidesToScroll*b.slideWidth,e=-1*b.slideCount%b.options.slidesToScroll*d))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?-1*a*b.slideWidth+b.slideOffset:-1*a*d+e,b.options.variableWidth===!0&&(g=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=g[0]?-1*g[0].offsetLeft:0,b.options.centerMode===!0&&(g=b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=g[0]?-1*g[0].offsetLeft:0,c+=(b.$list.width()-g.outerWidth())/2)),c},b.prototype.getNavigableIndexes=function(){for(var a=this,b=0,c=0,d=[];b<a.slideCount;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlideCount=function(){var c,b=this;if(b.options.swipeToSlide===!0){var d=null;return b.$slideTrack.find(".slick-slide").each(function(c,e){return e.offsetLeft+a(e).outerWidth()/2>-1*b.swipeLeft?(d=e,!1):void 0}),c=Math.abs(a(d).attr("index")-b.currentSlide)}return b.options.slidesToScroll},b.prototype.init=function(){var b=this;a(b.$slider).hasClass("slick-initialized")||(a(b.$slider).addClass("slick-initialized"),b.buildOut(),b.setProps(),b.startLoad(),b.loadSlider(),b.initializeEvents(),b.updateArrows(),b.updateDots()),null!==b.options.onInit&&b.options.onInit.call(this,b)},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",function(){b.paused=!0,b.autoPlayClear()}).on("mouseleave.slick",function(){b.paused=!1,b.autoPlay()})},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),b.options.pauseOnHover===!0&&b.options.autoplay===!0&&(b.$list.on("mouseenter.slick",function(){b.paused=!0,b.autoPlayClear()}),b.$list.on("mouseleave.slick",function(){b.paused=!1,b.autoPlay()})),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.options.slide,b.$slideTrack).on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,function(){b.checkResponsive(),b.setPosition()}),a(window).on("resize.slick.slick-"+b.instanceUid,function(){a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.setPosition()},50))}),a("*[draggable!=true]",b.$slideTrack).on("dragstart",function(a){a.preventDefault()}),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}})},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy");b.load(function(){b.animate({opacity:1},200)}).css({opacity:0}).attr("src",c).removeAttr("data-lazy").removeClass("slick-loading")})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.postSlide=function(a){var b=this;null!==b.options.onAfterChange&&b.options.onAfterChange.call(this,b,a),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(){var b=this,c=b.currentSlide;b.destroy(),a.extend(b,b.initials),b.init(),b.changeSlide({data:{message:"index",index:c}},!0)},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.options.focusOnSelect===!0&&a(b.options.slide,b.$slideTrack).on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),null!==b.options.onReInit&&b.options.onReInit.call(this,b)},b.prototype.removeSlide=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,d.reinit(),void 0)},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?a+"px":"0px",e="top"==b.positionProp?a+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var b=this;if(b.options.vertical===!1?b.options.centerMode===!0&&b.$list.css({padding:"0px "+b.options.centerPadding}):(b.$list.height(b.$slides.first().outerHeight(!0)*b.options.slidesToShow),b.options.centerMode===!0&&b.$list.css({padding:b.options.centerPadding+" 0px"})),b.listWidth=b.$list.width(),b.listHeight=b.$list.height(),b.options.vertical===!1&&b.options.variableWidth===!1)b.slideWidth=Math.ceil(b.listWidth/b.options.slidesToShow),b.$slideTrack.width(Math.ceil(b.slideWidth*b.$slideTrack.children(".slick-slide").length));else if(b.options.variableWidth===!0){var c=0;b.slideWidth=Math.ceil(b.listWidth/b.options.slidesToShow),b.$slideTrack.children(".slick-slide").each(function(){c+=Math.ceil(a(this).outerWidth(!0))}),b.$slideTrack.width(Math.ceil(c)+1)}else b.slideWidth=Math.ceil(b.listWidth),b.$slideTrack.height(Math.ceil(b.$slides.first().outerHeight(!0)*b.$slideTrack.children(".slick-slide").length));var d=b.$slides.first().outerWidth(!0)-b.$slides.first().width();b.options.variableWidth===!1&&b.$slideTrack.children(".slick-slide").width(b.slideWidth-d)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=-1*b.slideWidth*d,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:800,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:800,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:900,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),null!==a.options.onSetPosition&&a.options.onSetPosition.call(this,a)},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;b.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"),d=b.$slider.find(".slick-slide"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active"):d.length<=b.options.slidesToShow?d.addClass("slick-active"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.selectHandler=function(b){var c=this,d=parseInt(a(b.target).parents(".slick-slide").attr("index"));return d||(d=0),c.slideCount<=c.options.slidesToShow?(c.$slider.find(".slick-slide").removeClass("slick-active"),c.$slides.eq(d).addClass("slick-active"),c.options.centerMode===!0&&(c.$slider.find(".slick-slide").removeClass("slick-center"),c.$slides.eq(d).addClass("slick-center")),c.asNavFor(d),void 0):(c.slideHandler(d),void 0)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,i=null,j=this;return b=b||!1,j.animating===!0&&j.options.waitForAnimate===!0||j.options.fade===!0&&j.currentSlide===a||j.slideCount<=j.options.slidesToShow?void 0:(b===!1&&j.asNavFor(a),d=a,i=j.getLeft(d),g=j.getLeft(j.currentSlide),j.currentLeft=null===j.swipeLeft?g:j.swipeLeft,j.options.infinite===!1&&j.options.centerMode===!1&&(0>a||a>j.getDotCount()*j.options.slidesToScroll)?(j.options.fade===!1&&(d=j.currentSlide,c!==!0?j.animateSlide(g,function(){j.postSlide(d)}):j.postSlide(d)),void 0):j.options.infinite===!1&&j.options.centerMode===!0&&(0>a||a>j.slideCount-j.options.slidesToScroll)?(j.options.fade===!1&&(d=j.currentSlide,c!==!0?j.animateSlide(g,function(){j.postSlide(d)}):j.postSlide(d)),void 0):(j.options.autoplay===!0&&clearInterval(j.autoPlayTimer),e=0>d?0!==j.slideCount%j.options.slidesToScroll?j.slideCount-j.slideCount%j.options.slidesToScroll:j.slideCount+d:d>=j.slideCount?0!==j.slideCount%j.options.slidesToScroll?0:d-j.slideCount:d,j.animating=!0,null!==j.options.onBeforeChange&&a!==j.currentSlide&&j.options.onBeforeChange.call(this,j,j.currentSlide,e),f=j.currentSlide,j.currentSlide=e,j.setSlideClasses(j.currentSlide),j.updateDots(),j.updateArrows(),j.options.fade===!0?(c!==!0?j.fadeSlide(f,e,function(){j.postSlide(e)}):j.postSlide(e),void 0):(c!==!0?j.animateSlide(i,function(){j.postSlide(e)}):j.postSlide(e),void 0)))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":"vertical"},b.prototype.swipeEnd=function(){var b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":b.slideHandler(b.currentSlide+b.getSlideCount()),b.currentDirection=0,b.touchObject={};break;case"right":b.slideHandler(b.currentSlide-b.getSlideCount()),b.currentDirection=1,b.touchObject={}}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var c,d,e,f,b=this;return f=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||f&&1!==f.length?!1:(c=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==f?f[0].pageX:a.clientX,b.touchObject.curY=void 0!==f?f[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),d=b.swipeDirection(),"vertical"!==d?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),e=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.swipeLeft=b.options.vertical===!1?c+b.touchObject.swipeLength*e:c+b.touchObject.swipeLength*(b.$list.height()/b.listWidth)*e,b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):(b.setCSS(b.swipeLeft),void 0)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,b.dragging=!0,void 0)},b.prototype.unfilterSlides=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&"object"!=typeof b.options.prevArrow&&b.$prevArrow.remove(),b.$nextArrow&&"object"!=typeof b.options.nextArrow&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible").css("width","")},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.options.infinite!==!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.removeClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled"),a.$prevArrow.removeClass("slick-disabled")):a.currentSlide>a.slideCount-a.options.slidesToShow+b&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled"),a.$prevArrow.removeClass("slick-disabled")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active"))},a.fn.slick=function(a){var c=this;return c.each(function(c,d){d.slick=new b(d,a)})},a.fn.slickAdd=function(a,b,c){var d=this;return d.each(function(d,e){e.slick.addSlide(a,b,c)})},a.fn.slickCurrentSlide=function(){var a=this;return a.get(0).slick.getCurrent()},a.fn.slickFilter=function(a){var b=this;return b.each(function(b,c){c.slick.filterSlides(a)})},a.fn.slickGoTo=function(a,b){var c=this;return c.each(function(c,d){d.slick.changeSlide({data:{message:"index",index:parseInt(a)}},b)})},a.fn.slickNext=function(){var a=this;return a.each(function(a,b){b.slick.changeSlide({data:{message:"next"}})})},a.fn.slickPause=function(){var a=this;return a.each(function(a,b){b.slick.autoPlayClear(),b.slick.paused=!0})},a.fn.slickPlay=function(){var a=this;return a.each(function(a,b){b.slick.paused=!1,b.slick.autoPlay()})},a.fn.slickPrev=function(){var a=this;return a.each(function(a,b){b.slick.changeSlide({data:{message:"previous"}})})},a.fn.slickRemove=function(a,b){var c=this;return c.each(function(c,d){d.slick.removeSlide(a,b)})},a.fn.slickRemoveAll=function(){var a=this;return a.each(function(a,b){b.slick.removeSlide(null,null,!0)})},a.fn.slickGetOption=function(a){var b=this;return b.get(0).slick.options[a]},a.fn.slickSetOption=function(a,b,c){var d=this;return d.each(function(d,e){e.slick.options[a]=b,c===!0&&(e.slick.unload(),e.slick.reinit())})},a.fn.slickUnfilter=function(){var a=this;return a.each(function(a,b){b.slick.unfilterSlides()})},a.fn.unslick=function(){var a=this;return a.each(function(a,b){b.slick&&b.slick.destroy()})},a.fn.getSlick=function(){var a=null,b=this;return b.each(function(b,c){a=c.slick}),a}});
/* Jonathan Snook - MIT License - https://github.com/snookca/prepareTransition */
!(function(a){a.fn.prepareTransition=function(){return this.each(function(){var b=a(this);b.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",function(){b.removeClass("is-transitioning")});var c=["transition-duration","-moz-transition-duration","-webkit-transition-duration","-o-transition-duration"];var d=0;a.each(c,function(a,c){d=parseFloat(b.css(c))||d});if(d!=0){b.addClass("is-transitioning");b[0].offsetWidth}})}})(jQuery);

/* replaceUrlParam - http://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery */
function replaceUrlParam(e,r,a){var n=new RegExp("("+r+"=).*?(&|$)"),c=e;return c=e.search(n)>=0?e.replace(n,"$1"+a+"$2"):c+(c.indexOf("?")>0?"&":"?")+r+"="+a};


/*
 * Debounce function
 * based on unminified version from http://davidwalsh.name/javascript-debounce-function
 */


/* ================ SLATE ================ */
window.theme = window.theme || {};



export const theme = Object.assign({}, window.themeSettings);

theme.debounce = function(n,t,u){var e;return function(){var a=this,r=arguments,i=function(){e=null,u||n.apply(a,r)},o=u&&!e;clearTimeout(e),e=setTimeout(i,t),o&&n.apply(a,r)}};


theme.Sections = function Sections() {
    this.constructors = {};
    this.instances = [];
    
    $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
    _createInstance: function(container, constructor) {
        var $container = $(container);
        var id = $container.attr('data-section-id');
        var type = $container.attr('data-section-type');
        
        constructor = constructor || this.constructors[type];
        
        if (_.isUndefined(constructor)) {
            return;
        }
        
        var instance = _.assignIn(new constructor(container), {
            id: id,
            type: type,
            container: container
        });
        
        this.instances.push(instance);
    },
    
    _onSectionLoad: function(evt) {
        var container = $('[data-section-id]', evt.target)[0];
        if (container) {
            this._createInstance(container);
        }
    },
    
    _onSectionUnload: function(evt) {
        this.instances = _.filter(this.instances, function(instance) {
            var isEventInstance = instance.id === evt.originalEvent.detail.sectionId;
            
            if (isEventInstance) {
                if (_.isFunction(instance.onUnload)) {
                    instance.onUnload(evt);
                }
            }
            
            return !isEventInstance;
        });
    },
    
    _onSelect: function(evt) {
        // eslint-disable-next-line no-shadow
        var instance = _.find(this.instances, function(instance) {
            return instance.id === evt.originalEvent.detail.sectionId;
        });
        
        if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
            instance.onSelect(evt);
        }
    },
    
    _onDeselect: function(evt) {
        // eslint-disable-next-line no-shadow
        var instance = _.find(this.instances, function(instance) {
            return instance.id === evt.originalEvent.detail.sectionId;
        });
        
        if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
            instance.onDeselect(evt);
        }
    },
    
    _onBlockSelect: function(evt) {
        // eslint-disable-next-line no-shadow
        var instance = _.find(this.instances, function(instance) {
            return instance.id === evt.originalEvent.detail.sectionId;
        });
        
        if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
            instance.onBlockSelect(evt);
        }
    },
    
    _onBlockDeselect: function(evt) {
        // eslint-disable-next-line no-shadow
        var instance = _.find(this.instances, function(instance) {
            return instance.id === evt.originalEvent.detail.sectionId;
        });
        
        if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
            instance.onBlockDeselect(evt);
        }
    },
    
    register: function(type, constructor) {
        this.constructors[type] = constructor;
        
        $('[data-section-type=' + type + ']').each(
            function(index, container) {
                this._createInstance(container, constructor);
            }.bind(this)
        );
    }
});

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 * Alternatives
 * - Accounting.js - http://openexchangerates.github.io/accounting.js/
 *
 */

theme.Currency = (function() {
    var moneyFormat = '$';
    
    function formatMoney(cents, format) {
        if (typeof cents === 'string') {
            cents = cents.replace('.', '');
        }
        var value = '';
        var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
        var formatString = format || moneyFormat;
        
        function formatWithDelimiters(number, precision, thousands, decimal) {
            thousands = thousands || ',';
            decimal = decimal || '.';
            
            if (isNaN(number) || number === null) {
                return 0;
            }
            
            number = (number / 100.0).toFixed(precision);
            
            var parts = number.split('.');
            var dollarsAmount = parts[0].replace(
                /(\d)(?=(\d\d\d)+(?!\d))/g,
                '$1' + thousands
            );
            var centsAmount = parts[1] ? decimal + parts[1] : '';
            
            return dollarsAmount + centsAmount;
        }
        
        switch (formatString.match(placeholderRegex)[1]) {
            case 'amount':
                value = formatWithDelimiters(cents, 2);
                break;
            case 'amount_no_decimals':
                value = formatWithDelimiters(cents, 0);
                break;
            case 'amount_with_comma_separator':
                value = formatWithDelimiters(cents, 2, '.', ',');
                break;
            case 'amount_no_decimals_with_comma_separator':
                value = formatWithDelimiters(cents, 0, '.', ',');
                break;
            case 'amount_no_decimals_with_space_separator':
                value = formatWithDelimiters(cents, 0, ' ');
                break;
            case 'amount_with_apostrophe_separator':
                value = formatWithDelimiters(cents, 2, "'");
                break;
        }
        
        return formatString.replace(placeholderRegex, value);
    }
    
    return {
        formatMoney: formatMoney
    };
})();

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

theme.Images = (function() {
    /**
     * Preloads an image in memory and uses the browsers cache to store it until needed.
     *
     * @param {Array} images - A list of image urls
     * @param {String} size - A shopify image size attribute
     */
    
    function preload(images, size) {
        if (typeof images === 'string') {
            images = [images];
        }
        
        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            this.loadImage(this.getSizedImageUrl(image, size));
        }
    }
    
    /**
     * Loads and caches an image in the browsers cache.
     * @param {string} path - An image url
     */
    function loadImage(path) {
        new Image().src = path;
    }
    
    /**
     * Swaps the src of an image for another OR returns the imageURL to the callback function
     * @param image
     * @param element
     * @param callback
     */
    function switchImage(image, element, callback) {
        var size = this.imageSize(element.src);
        var imageUrl = this.getSizedImageUrl(image.src, size);
        
        if (callback) {
            callback(imageUrl, image, element); // eslint-disable-line callback-return
        } else {
            element.src = imageUrl;
        }
    }
    
    /**
     * +++ Useful
     * Find the Shopify image attribute size
     *
     * @param {string} src
     * @returns {null}
     */
    function imageSize(src) {
        var match = src.match(
            /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[.@]/
        );
        
        if (match !== null) {
            return match[1];
        } else {
            return null;
        }
    }
    
    /**
     * +++ Useful
     * Adds a Shopify size attribute to a URL
     *
     * @param src
     * @param size
     * @returns {*}
     */
    function getSizedImageUrl(src, size) {
        if (size === null) {
            return src;
        }
        
        if (size === 'master') {
            return this.removeProtocol(src);
        }
        
        var match = src.match(
            /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
        );
        
        if (match !== null) {
            var prefix = src.split(match[0]);
            var suffix = match[0];
            
            return this.removeProtocol(prefix[0] + '_' + size + suffix);
        }
        
        return null;
    }
    
    function removeProtocol(path) {
        return path.replace(/http(s)?:/, '');
    }
    
    return {
        preload: preload,
        loadImage: loadImage,
        switchImage: switchImage,
        imageSize: imageSize,
        getSizedImageUrl: getSizedImageUrl,
        removeProtocol: removeProtocol
    };
})();

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

slate.Variants = (function() {
    /**
     * Variant constructor
     *
     * @param {object} options - Settings from `product.js`
     */
    function Variants(options) {
        this.$container = options.$container;
        this.product = options.product;
        this.singleOptionSelector = options.singleOptionSelector;
        this.originalSelectorId = options.originalSelectorId;
        this.enableHistoryState = options.enableHistoryState;
        this.currentVariant = this._getVariantFromOptions();
        
        console.log ('VAARIANT S', options);
        $(this.singleOptionSelector, this.$container).on(
            'change',
            this._onSelectChange.bind(this)
        );
    }
    
    Variants.prototype = _.assignIn({}, Variants.prototype, {
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
    
    return Variants;
})();


/* ================ MODULES ================ */

/*!
handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/*============================================================================
  Ajax the add to cart experience by revealing it in a side drawer
  Plugin Documentation - http://shopify.github.io/Timber/#ajax-cart
  (c) Copyright 2015 Shopify Inc. Author: Carson Shold (@cshold). All Rights Reserved.

  This file includes:
    - Basic Shopify Ajax API calls
    - Ajax cart plugin

  This requires:
    - jQuery 1.8+
    - handlebars.min.js (for cart template)
    - modernizer.min.js
    - snippet/ajax-cart-template.liquid

  Customized version of Shopify's jQuery API
  (c) Copyright 2009-2015 Shopify Inc. Author: Caroline Schnapp. All Rights Reserved.
==============================================================================*/



/*============================================================================
  API Helper Functions
==============================================================================*/


/*============================================================================
  Money Format
  - Shopify.format money is defined in option_selection.js.
    If that file is not included, it is redefined here.
==============================================================================*/

/*
 * Run function after window resize
 * http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
 */
var afterResize = (function() {
    var t = {};
    return function(callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (t[uniqueId]) {
            clearTimeout(t[uniqueId]);
        }
        t[uniqueId] = setTimeout(callback, ms);
    };
})();

var slickTheme = (function(module, $) {
    'use strict';
    
    // Public functions
    var init, onInit, beforeChange, afterChange;
    
    // Private variables
    var settings,
        $slider,
        $allSlides,
        $activeSlide,
        windowHeight,
        scrolled,
        $heroText,
        $heroImage;
    var currentActiveSlide = 0;
    
    // Private functions
    var cacheObjects,
        checkFirstOnIndex,
        setFullScreen,
        sizeFullScreen,
        setParallax,
        calculateParallax;
    /*============================================================================
     Initialise the plugin and define global options
    ==============================================================================*/
    cacheObjects = function() {
        slickTheme.cache = {
            $html: $('html'),
            $window: $(window),
            $hero: $('#Hero'),
            $heroImage: $('.hero__image'),
            $headerWrapper: $('.header-wrapper')
        };
        
        slickTheme.vars = {
            slideClass: 'slick-slide',
            activeClass: 'slick-active',
            hiddenClass: 'hero__slide--hidden',
            heroHeaderClass: 'hero__header'
        };
    };
    
    init = function(options) {
        cacheObjects();
        
        // Default settings
        settings = {
            // User options
            $element: null,
            fullscreen: false,
            parallax: false,
            
            // Private settings
            isTouch: true,//Modernizr.touch ? true : false,
            
            // Slick options
            accessibility: true,
            arrows: false,
            dots: true,
            focusOnChange: true,
            adaptiveHeight: true
        };
        
        // Override defaults with arguments
        $.extend(settings, options);
        
        // Check if this hero is the first one on the home page
        settings.isFirstOnIndex = checkFirstOnIndex();
        
        // Absolutely position header over hero as soon as possible
        if (settings.isFirstOnIndex) {
            slickTheme.cache.$headerWrapper.addClass(slickTheme.vars.heroHeaderClass);
        }
        
        /*
         * Init slick slider
         *   - Add any additional option changes here
         *   - https://github.com/kenwheeler/slick/#options
         */
        settings.$element.slick({
            accessibility: settings.accessibility,
            arrows: settings.arrows,
            dots: settings.dots,
            adaptiveHeight: settings.fullscreen ? false : settings.adaptiveHeight,
            draggable: false,
            fade: true,
            focusOnChange: settings.focusOnChange,
            //autoplay       : theme.strings.slickAuto,
            //autoplaySpeed  : theme.strings.slickAutoSpeed,
            autoplay: slickTheme.cache.$hero.data('autoplay'),
            autoplaySpeed: slickTheme.cache.$hero.data('autoplayspeed'),
            onInit: this.onInit,
            onBeforeChange: this.beforeChange,
            onAfterChange: this.afterChange
        });
    };
    
    checkFirstOnIndex = function() {
        if (settings.$element.hasClass('hero--first')) {
            return true;
        }
        
        return false;
    };
    
    onInit = function(obj) {
        $slider = obj.$slider;
        $allSlides = $slider.find('.' + slickTheme.vars.slideClass);
        $activeSlide = $slider.find('.' + slickTheme.vars.activeClass);
        
        if (!settings.isTouch) {
            $allSlides.addClass(slickTheme.vars.hiddenClass);
            $activeSlide.removeClass(slickTheme.vars.hiddenClass);
        }
        
        if (settings.fullscreen) {
            setFullScreen();
        }
        
        if (settings.parallax && Modernizr.csstransforms3d) {
            setParallax();
        }
    };
    
    beforeChange = function(evt, currentSlide, nextSlide) {
        if (!settings.isTouch) {
            $allSlides.removeClass(slickTheme.vars.hiddenClass);
        }
        
        // Set upcoming slide as index
        currentActiveSlide = nextSlide;
        
        // Set new active slide to proper parallax position
        if (settings.parallax && Modernizr.csstransforms3d) {
            calculateParallax(settings.fullscreen, currentActiveSlide);
        }
    };
    
    afterChange = function() {
        if (settings.isTouch) {
            return;
        }
        
        $activeSlide = $slider.find('.' + slickTheme.vars.activeClass);
        $allSlides.addClass(slickTheme.vars.hiddenClass);
        $activeSlide.removeClass(slickTheme.vars.hiddenClass);
    };
    
    setFullScreen = function() {
        sizeFullScreen();
        
        // Resize hero after screen resize
        slickTheme.cache.$window.resize(function() {
            afterResize(
                function() {
                    sizeFullScreen();
                },
                200,
                'sizeFullScreen'
            );
        });
    };
    
    sizeFullScreen = function() {
        windowHeight = slickTheme.cache.$window.height();
        settings.$element.css('height', windowHeight);
    };
    
    setParallax = function() {
        $heroText = $('.hero__text-content');
        $heroImage = $('.hero__image');
        
        slickTheme.cache.$window.on('scroll', function() {
            calculateParallax(settings.fullscreen, currentActiveSlide);
        });
    };
    
    calculateParallax = function(parallaxImage, currentSlide) {
        scrolled = slickTheme.cache.$window.scrollTop();
        
        $($heroText[currentSlide]).css({
            transform: 'translate3d(0, ' + scrolled / 8 + 'px, 0)'
        });
        
        if (parallaxImage) {
            $($heroImage[currentSlide]).css({
                transform: 'translate3d(0, ' + scrolled / 8 + 'px, 0)'
            });
        }
    };
    
    module = {
        init: init,
        onInit: onInit,
        beforeChange: beforeChange,
        afterChange: afterChange
    };
    
    return module;
})(slickTheme || {}, jQuery);


/* ================ Sections ================ */
window.theme = window.theme || {};

theme.Product = (function() {
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
        
        if (!$('#ProductJson-' + sectionId).html()) {
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
        
        if (this.zoomType) {
            this.productImageZoom();
        }
        
        if (theme.settings.cartType === 'drawer') {
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
    
            console.log ('prototype!!!', this);
    
        },
        
        initBreakpoints: function() {
            var self = this;
            var $container = self.$container;
            self.zoomType = $container.data('image-zoom-type');
            
            enquire.register(theme.variables.mediaQuerySmall, {
                match: function() {
                    self.createImageCarousel();
                    if (self.zoomType) {
                        if ($(self.selectors.productImagePhoto).length) {
                            // remove event handlers for product zoom on mobile
                            $(self.selectors.productImagePhoto).off();
                        }
                    }
                },
                unmatch: function() {
                    self.destroyImageCarousel();
                    self.reorderImages();
                    if (self.zoomType) {
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
            
            if (variant && variant.featured_image) {
                this.setActiveThumbnail(variant.featured_image.id);
            }
            
            if (theme.variables.bpSmall) {
                // Switch carousel slide, unless it's the first photo on load
                imageIndex = $newImage.closest('.slick-slide').attr('index');
                // Navigate to slide unless it's the first photo on load
                // If there is no index, slider is not initalized.
                if (_.isUndefined(imageIndex)) {
                    return;
                }
                
                if (imageIndex !== 0 || theme.variables.productPageLoad) {
                    $(this.selectors.productImages, this.$container).slickGoTo(
                        imageIndex
                    );
                }
                // Switch image variant on thumbnail layout for desktop view;
                // When a image variant is updated on mobile view, update the
                // desktop view also.
                if (!this.$container.data('scroll-to-image')) {
                    this.switchImage(variant.featured_image.id);
                }
            } else {
                if (this.$container.data('scroll-to-image')) {
                    imageIndex = $newImage.closest('.slick-slide').index();
                    // Scroll to/reorder image unless it's the first photo on load
                    if (imageIndex !== 0 || theme.variables.productPageLoad) {
                        if (theme.variables.productPageSticky) {
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
            
            if (!theme.variables.productPageLoad) {
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
            
            if ($productThumbnails.length) {
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
            
            if ($productThumbnails.length) {
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
            ) {
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
            ) {
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
            if (!$(this.selectors.productImages, this.$container).length) {
                return;
            }
            $(this.selectors.productImages, this.$container).unslick();
        },
        
        productPage: function(evt) {
            var moneyFormat = theme.strings.moneyFormat;
            var variant = evt.variant;
            var translations = theme.strings;
          //  console.log('pppppppppppppppppppp',evt)
            if (variant) {
                // Display variant image on featured product
                if (!$('body').hasClass('template-product')) {
                    if (variant.featured_image) {
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
                if (variant.available) {
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
                    if ($link.length) {
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
                if (variant.compare_at_price > variant.price) {
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
            
            if (url.match(re)) {
                return url.replace(re, '$1' + key + '=' + value + '$2');
            } else {
                return url + separator + key + '=' + value;
            }
        },
        
        initStickyProductMeta: function() {
            var $meta = $(this.selectors.meta, this.$container);
            var $wrapper = $(this.selectors.productWrapper, this.$container);
            
            if ($meta.find('#shopify-product-reviews').length) {
                theme.variables.productPageSticky = false;
                return;
            }
            
            if (
                !$meta.length ||
                $(this.selectors.productImagePhoto, this.$container).length < 2
            ) {
                return;
            }
            
            // Force detatch if already detached. Prevent layout issues.
            $meta.trigger('detach.ScrollToFixed');
            
            // Detach and stop if on mobile breakpoint
            if (theme.variables.bpSmall) {
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
            ) {
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
})();

window.theme = window.theme || {};

theme.Collection = (function() {
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
        if (!Modernizr.csstransforms3d) {
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
            
            if (this.gridType === 'collage') {
                this.initCollageGrid();
            } else if (this.gridType === 'grid') {
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
            if (!this.cache.$sortDropdown.length) {
                return;
            }
            
            Shopify.queryParams = this.parseQueryString();
        },
        
        parseQueryString: function() {
            if (!location.search.length) {
                return {};
            }
            
            var params = {};
            
            for (
                var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&');
                i < aCouples.length;
                i++
            ) {
                aKeyValue = aCouples[i].split('=');
                if (aKeyValue.length > 1) {
                    params[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(
                        aKeyValue[1]
                    );
                }
            }
            return params;
        },
        
        initCollageGrid: function() {
            if (!this.cache.$productGridRows.length) {
                return;
            }
            
            this.collageGridHeights();
            
            theme.cache.$window.on(
                'resize',
                theme.debounce(this.collageGridHeights, 500)
            );
        },
        
        collageGridHeights: function() {
            if (theme.variables.bpSmall || !this.cache.$productGridRows.length) {
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
                if (smallImageOffset > largeImageOffset) {
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
            if (!this.cache.$productGridRows.length) {
                return;
            }
            
            this.cache.$productGridPhotosLarge.removeAttr('style');
        },
        
        collectionSorting: function() {
            if (!this.cache.$tagList.length) {
                return;
            }
            
            this.cache.$tagList.on('change', function() {
                window.location.href = $(this).val();
            });
        },
        
        sortCollection: function() {
            if (!this.cache.$sortDropdown.length) {
                return;
            }
            
            if (Shopify.queryParams.page) {
                delete Shopify.queryParams.page;
            }
            Shopify.queryParams.sort_by = this.cache.$sortDropdown.val();
            location.search = jQuery.param(Shopify.queryParams);
        }
    });
    
    return Collection;
})();

window.theme = window.theme || {};

theme.HeaderSection = (function() {
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
        ) {
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
        if ($('#Hero').hasClass('hero')) {
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
            ) {
                setTimeout(function() {
                    timber.LeftDrawer.drawerIsOpen = false;
                    timber.LeftDrawer.open();
                }, 500);
            } else if (!theme.cache.$siteNav.hasClass('site-nav--compress')) {
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
                if (currentlyExpanded === 'true') {
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
})();

window.theme = window.theme || {};

theme.FeaturedContentSection = (function() {
    function FeaturedContent() {
        theme.styleTextLinks();
    }
    
    return FeaturedContent;
})();

window.theme = window.theme || {};

theme.NewsletterSection = (function() {
    function Newsletter() {
        theme.styleTextLinks();
    }
    
    return Newsletter;
})();

theme.SlideshowSection = (function() {
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
        if (!$(this.slideshow).hasClass('hero')) {
            $('.header-wrapper').removeClass('hero__header');
        }
    }
    
    return SlideshowSection;
})();

theme.SlideshowSection.prototype = _.assignIn(
    {},
    theme.SlideshowSection.prototype,
    {
        onUnload: function() {
            $(this.slideshow).unslick();
        },
        
        onSelect: function() {
            $(this.slideshow).slickPause();
        },
        
        onDeselect: function() {
            $(this.slideshow).slickPlay();
        },
        
        onBlockSelect: function(evt) {
            // Ignore the cloned version
            var $slide = $('.slide--' + evt.detail.blockId);
            var slideIndex = $slide.attr('index');
            
            // Go to selected slide, pause autoplay
            $(this.slideshow)
            .slickGoTo(slideIndex)
            .slickPause();
        },
        
        onBlockDeselect: function() {
            // Resume autoplay
            $(this.slideshow).slickPlay();
        }
    }
);

window.theme = window.theme || {};

theme.PasswordHeader = (function() {
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
            if ($('.storefront-password-form .errors').size()) {
                $('.js-toggle-login-modal').click();
            }
        }
    });
    
    return PasswordHeader;
})();

window.theme = window.theme || {};

theme.PasswordContent = (function() {
    function PasswordContent() {
        theme.styleTextLinks();
    }
    
    return PasswordContent;
})();

////errors if i dont have this

theme.Maps = (function() {
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
        
        if (Shopify.designMode) {
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
        
        if (typeof this.key !== 'string' || this.key === '') {
            return;
        }
        
        if (apiStatus === 'loaded') {
            var self = this;
            
            // Check if the script has previously been loaded with this key
            var $script = $('script[src*="' + this.key + '&"]');
            if ($script.length === 0) {
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
            
            if (apiStatus !== 'loading') {
                apiStatus = 'loading';
                if (typeof window.google === 'undefined') {
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
        
        geocoder.geocode({ address: address }, function(results, status) {
            if (status !== google.maps.GeocoderStatus.OK) {
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
                if (Shopify.designMode) {
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
            if (this.$map.length === 0) {
                return;
            }
            google.maps.event.clearListeners(this.map, 'resize');
        }
    });
    
    return Map;
})();

window.theme = window.theme || {};

theme.Search = (function() {
    function Search() {
        theme.equalHeights();
    }
    
    return Search;
})();


theme.variables = {
    productPageLoad     : false,
    productPageSticky   : true,
    
    // Breakpoints from src/stylesheets/global/variables.scss.liquid
    mediaQuerySmall     : 'screen and (max-width: 590px)',
    mediaQueryMedium    : 'screen and (min-width: 591px) and (max-width: 768px)',
    mediaQueryMediumUp  : 'screen and (min-width: 591px)',
    mediaQueryLarge     : 'screen and (min-width: 769px)',
    bpSmall             : false
};

theme.initCache = function() {
    this.cache = {
        $window                 : $(window),
        $html                   : $('html'),
        $body                   : $('body'),
        $drawerRight            : $('.drawer--right'),
        
        $hero                   : $('#Hero'),
        $customSelect           : $('.js-selector'),
        
        $collectionImage        : $('.collection-hero__image'),
        
        $siteNav                : $('.site-nav'),
        $siteNavOpen            : $('.site-nav--open'),
        $cartBuggle             : $('.cart-link__bubble'),
        $logoWrapper            : $('.site-header__logo'),
        $logo                   : $('.site-header__logo img'),
        $toggleSearchModal      : $('.js-toggle-search-modal'),
        $searchBox              : $('.site-nav--search__bar'),
        
        $productImages          : $('.product-single__photos'),
        $productImagePhoto      : $('.product-single__photo'),
        
        $indentedRteImages      : $('.rte--indented-images'),
        
        $productGridRows        : $('.collage-grid__row'),
        $productGridPhotosLarge : $('.grid__item--large .grid-product__image-link'),
        
        // Equal height elements
        $productGridImages      : $('.grid-uniform .grid-product__image-wrapper'),
        
        $returnLink             : $('.return-link')
    };
};

theme.init = function() {
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
};

theme.returnLink = function() {
    if (!document.referrer || !theme.cache.$returnLink.length || !window.history.length) {
        return;
    }
    
    theme.cache.$returnLink.on('click', theme.backButton);
};

theme.backButton = function() {
    var referrerDomain = urlDomain(document.referrer);
    var shopDomain = urlDomain(document.url);
    
    if (shopDomain === referrerDomain) {
        history.back();
        return false;
    }
    
    function urlDomain(url) {
        var    a      = document.createElement('a');
        a.href = url;
        return a.hostname;
    }
};

theme.setBreakpoints = function() {
    enquire.register(theme.variables.mediaQuerySmall, {
        match: function() {
            if (theme.settings.gridType === 'collage') {
                theme.clearCollageGridHeights();
            }
            
            theme.variables.bpSmall = true;
        },
        unmatch: function() {
            theme.variables.bpSmall = false;
        }
    });
    
};

theme.fitNav = function() {
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
        
        if (navItemWidth > navWidth) {
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
};

theme.resizeLogo = function() {
    // Using .each() as there can be a reversed logo too
    theme.cache.$logo.each(function() {
        var $el = $(this),
            logoWidthOnScreen = $el.width(),
            containerWidth = $el.closest('.grid__item').width();
        // If image exceeds container, let's make it smaller
        if (logoWidthOnScreen > containerWidth) {
            $el.css('maxWidth', containerWidth);
        }
        else {
            $el.removeAttr('style');
        }
    });
};

theme.sizeCartDrawerFooter = function() {
    // Stop if our drawer doesn't have a fixed footer
    if (!theme.cache.$drawerRight.hasClass('drawer--has-fixed-footer')) {
        return;
    }
    
    // Elements are reprinted regularly so selectors are not cached
    var $cartFooter = $('.ajaxcart__footer').removeAttr('style');
    var $cartInner = $('.ajaxcart__inner').removeAttr('style');
    var cartFooterHeight = $cartFooter.outerHeight();
    var cartDrawerTitleHeight = $('.drawer--right .drawer__header').outerHeight();
    var $cartDrawerInner = $('.drawer--right .drawer__inner');
    
    if(cartDrawerTitleHeight != 80) {
        $cartDrawerInner.css('top', cartDrawerTitleHeight);
    }
    
    $cartInner.css('bottom', cartFooterHeight);
    $cartFooter.css('height', cartFooterHeight);
};

theme.afterCartLoad = function() {
    theme.cache.$body.on('ajaxCart.afterCartLoad', function(evt, cart) {
        // Open cart drawer
        timber.RightDrawer.open();
        
        // Size the cart's fixed footer
        theme.sizeCartDrawerFooter();
        
        // Show cart bubble in nav if items exist
        if (cart.items.length > 0) {
            theme.cache.$cartBuggle.addClass('cart-link__bubble--visible');
        } else {
            theme.cache.$cartBuggle.removeClass('cart-link__bubble--visible');
        }
    });
};

theme.checkoutIndicator = function() {
    // Add a loading indicator on the cart checkout button (/cart and drawer)
    theme.cache.$body.on('click', '.cart__checkout', function() {
        $(this).addClass('btn--loading');
    });
};

theme.searchModal = function() {
    if (!theme.cache.$toggleSearchModal.length) {
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
}

theme.clearCollageGridHeights = function() {
    if (!theme.cache.$productGridRows.length) {
        return;
    };
    
    theme.cache.$productGridPhotosLarge.removeAttr('style');
};

theme.articleImages = function() {
    if (!theme.cache.$indentedRteImages.length) {
        return;
    }
    
    theme.cache.$indentedRteImages.find('img').each(function() {
        var $el = $(this);
        var attr = $el.attr('style');
        
        // Check if undefined or float: none
        if (!attr || attr == 'float: none;') {
            // Remove grid-breaking styles if image isn't wider than parent
            if ($el.width() < theme.cache.$indentedRteImages.width()) {
                $el.addClass('rte__no-indent');
            }
        }
    });
};

theme.styleTextLinks = function() {
    $('.rte').find('a:not(:has(img))').addClass('text-link');
};

theme.equalHeights = function() {
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
};

theme.cartInit = function() {
    if (!theme.cookiesEnabled()) {
        theme.cache.$body.addClass('cart--no-cookies');
    }
};

theme.cookiesEnabled = function() {
    var cookieEnabled = navigator.cookieEnabled;
    
    if (!cookieEnabled){
        document.cookie = 'testcookie';
        cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
    }
    return cookieEnabled;
}
