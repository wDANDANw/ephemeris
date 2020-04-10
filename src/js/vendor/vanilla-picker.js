/*!
 * vanilla-picker v2.10.1
 * https://vanilla-picker.js.org
 *
 * Copyright 2017-2019 Andreas Borgen (https://github.com/Sphinxxxx), Adam Brooks (https://github.com/dissimulate)
 * Released under the ISC license.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Picker=t()}(this,function(){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var e=function(e,t,r){return t&&i(e.prototype,t),r&&i(e,r),e};function i(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var h=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],i=!0,n=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(i=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);i=!0);}catch(e){n=!0,o=e}finally{try{!i&&s.return&&s.return()}finally{if(n)throw o}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};String.prototype.startsWith=String.prototype.startsWith||function(e){return 0===this.indexOf(e)},String.prototype.padStart=String.prototype.padStart||function(e,t){for(var r=this;r.length<e;)r=t+r;return r};var n={cb:"0f8ff",tqw:"aebd7",q:"-ffff",qmrn:"7fffd4",zr:"0ffff",bg:"5f5dc",bsq:"e4c4",bck:"---",nch:"ebcd",b:"--ff",bvt:"8a2be2",brwn:"a52a2a",brw:"deb887",ctb:"5f9ea0",hrt:"7fff-",chcT:"d2691e",cr:"7f50",rnw:"6495ed",crns:"8dc",crms:"dc143c",cn:"-ffff",Db:"--8b",Dcn:"-8b8b",Dgnr:"b8860b",Dgr:"a9a9a9",Dgrn:"-64-",Dkhk:"bdb76b",Dmgn:"8b-8b",Dvgr:"556b2f",Drng:"8c-",Drch:"9932cc",Dr:"8b--",Dsmn:"e9967a",Dsgr:"8fbc8f",DsTb:"483d8b",DsTg:"2f4f4f",Dtrq:"-ced1",Dvt:"94-d3",ppnk:"1493",pskb:"-bfff",mgr:"696969",grb:"1e90ff",rbrc:"b22222",rwht:"af0",stg:"228b22",chs:"-ff",gnsb:"dcdcdc",st:"8f8ff",g:"d7-",gnr:"daa520",gr:"808080",grn:"-8-0",grnw:"adff2f",hnw:"0fff0",htpn:"69b4",nnr:"cd5c5c",ng:"4b-82",vr:"0",khk:"0e68c",vnr:"e6e6fa",nrb:"0f5",wngr:"7cfc-",mnch:"acd",Lb:"add8e6",Lcr:"08080",Lcn:"e0ffff",Lgnr:"afad2",Lgr:"d3d3d3",Lgrn:"90ee90",Lpnk:"b6c1",Lsmn:"a07a",Lsgr:"20b2aa",Lskb:"87cefa",LsTg:"778899",Lstb:"b0c4de",Lw:"e0",m:"-ff-",mgrn:"32cd32",nn:"af0e6",mgnt:"-ff",mrn:"8--0",mqm:"66cdaa",mmb:"--cd",mmrc:"ba55d3",mmpr:"9370db",msg:"3cb371",mmsT:"7b68ee","":"-fa9a",mtr:"48d1cc",mmvt:"c71585",mnLb:"191970",ntc:"5fffa",mstr:"e4e1",mccs:"e4b5",vjw:"dead",nv:"--80",c:"df5e6",v:"808-0",vrb:"6b8e23",rng:"a5-",rngr:"45-",rch:"da70d6",pgnr:"eee8aa",pgrn:"98fb98",ptrq:"afeeee",pvtr:"db7093",ppwh:"efd5",pchp:"dab9",pr:"cd853f",pnk:"c0cb",pm:"dda0dd",pwrb:"b0e0e6",prp:"8-080",cc:"663399",r:"--",sbr:"bc8f8f",rb:"4169e1",sbrw:"8b4513",smn:"a8072",nbr:"4a460",sgrn:"2e8b57",ssh:"5ee",snn:"a0522d",svr:"c0c0c0",skb:"87ceeb",sTb:"6a5acd",sTgr:"708090",snw:"afa",n:"-ff7f",stb:"4682b4",tn:"d2b48c",t:"-8080",thst:"d8bfd8",tmT:"6347",trqs:"40e0d0",vt:"ee82ee",whT:"5deb3",wht:"",hts:"5f5f5",w:"-",wgrn:"9acd32"};function a(e,t){var r=1<arguments.length&&void 0!==t?t:1;return(0<r?e.toFixed(r).replace(/0+$/,"").replace(/\.$/,""):e.toString())||"0"}var s=(e(g,[{key:"printRGB",value:function(e){var t=(e?this.rgba:this.rgba.slice(0,3)).map(function(e,t){return a(e,3===t?3:0)});return e?"rgba("+t+")":"rgb("+t+")"}},{key:"printHSL",value:function(e){var r=[360,100,100,1],i=["","%","%",""],t=(e?this.hsla:this.hsla.slice(0,3)).map(function(e,t){return a(e*r[t],3===t?3:1)+i[t]});return e?"hsla("+t+")":"hsl("+t+")"}},{key:"printHex",value:function(e){var t=this.hex;return e?t:t.substring(0,7)}},{key:"rgba",get:function(){if(this._rgba)return this._rgba;if(!this._hsla)throw new Error("No color is set");return this._rgba=g.hslToRgb(this._hsla)},set:function(e){3===e.length&&(e[3]=1),this._rgba=e,this._hsla=null}},{key:"rgbString",get:function(){return this.printRGB()}},{key:"rgbaString",get:function(){return this.printRGB(!0)}},{key:"hsla",get:function(){if(this._hsla)return this._hsla;if(!this._rgba)throw new Error("No color is set");return this._hsla=g.rgbToHsl(this._rgba)},set:function(e){3===e.length&&(e[3]=1),this._hsla=e,this._rgba=null}},{key:"hslString",get:function(){return this.printHSL()}},{key:"hslaString",get:function(){return this.printHSL(!0)}},{key:"hex",get:function(){return"#"+this.rgba.map(function(e,t){return t<3?e.toString(16):Math.round(255*e).toString(16)}).map(function(e){return e.padStart(2,"0")}).join("")},set:function(e){this.rgba=g.hexToRgb(e)}}],[{key:"hexToRgb",value:function(e){var t=(e.startsWith("#")?e.slice(1):e).replace(/^(\w{3})$/,"$1F").replace(/^(\w)(\w)(\w)(\w)$/,"$1$1$2$2$3$3$4$4").replace(/^(\w{6})$/,"$1FF");if(!t.match(/^([0-9a-fA-F]{8})$/))throw new Error("Unknown hex color; "+e);var r=t.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1).map(function(e){return parseInt(e,16)});return r[3]=r[3]/255,r}},{key:"nameToRgb",value:function(e){var t=e.toLowerCase().replace("at","T").replace(/[aeiouyldf]/g,"").replace("ght","L").replace("rk","D").slice(-5,4),r=n[t];return void 0===r?r:g.hexToRgb(r.replace(/\-/g,"00").padStart(6,"f"))}},{key:"rgbToHsl",value:function(e){var t=h(e,4),r=t[0],i=t[1],n=t[2],o=t[3];r/=255,i/=255,n/=255;var a=Math.max(r,i,n),s=Math.min(r,i,n),p=void 0,l=void 0,c=(a+s)/2;if(a===s)p=l=0;else{var u=a-s;switch(l=.5<c?u/(2-a-s):u/(a+s),a){case r:p=(i-n)/u+(i<n?6:0);break;case i:p=(n-r)/u+2;break;case n:p=(r-i)/u+4}p/=6}return[p,l,c,o]}},{key:"hslToRgb",value:function(e){var t=h(e,4),r=t[0],i=t[1],n=t[2],o=t[3],a=void 0,s=void 0,p=void 0;if(0===i)a=s=p=n;else{var l=function(e,t,r){return r<0&&(r+=1),1<r&&(r-=1),r<1/6?e+6*(t-e)*r:r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e},c=n<.5?n*(1+i):n+i-n*i,u=2*n-c;a=l(u,c,r+1/3),s=l(u,c,r),p=l(u,c,r-1/3)}var d=[255*a,255*s,255*p].map(Math.round);return d[3]=o,d}}]),g);function g(e,t,r,i){o(this,g);var f=this;if(void 0===e);else if(Array.isArray(e))this.rgba=e;else if(void 0===r){var n=e&&""+e;n&&function(e){if(e.startsWith("hsl")){var t=e.match(/([\-\d\.e]+)/g).map(Number),r=h(t,4),i=r[0],n=r[1],o=r[2],a=r[3];void 0===a&&(a=1),i/=360,n/=100,o/=100,f.hsla=[i,n,o,a]}else if(e.startsWith("rgb")){var s=e.match(/([\-\d\.e]+)/g).map(Number),p=h(s,4),l=p[0],c=p[1],u=p[2],d=p[3];void 0===d&&(d=1),f.rgba=[l,c,u,d]}else e.startsWith("#")?f.rgba=g.hexToRgb(e):f.rgba=g.nameToRgb(e)||g.hexToRgb(e)}(n.toLowerCase())}else this.rgba=[e,t,r,void 0===i?1:i]}var t=(e(p,[{key:"add",value:function(e,t,r){e.addEventListener(t,r,!1),this._events.push({target:e,type:t,handler:r})}},{key:"remove",value:function(r,i,n){this._events=this._events.filter(function(e){var t=!0;return r&&r!==e.target&&(t=!1),i&&i!==e.type&&(t=!1),n&&n!==e.handler&&(t=!1),t&&p._doRemove(e.target,e.type,e.handler),!t})}},{key:"destroy",value:function(){this._events.forEach(function(e){return p._doRemove(e.target,e.type,e.handler)}),this._events=[]}}],[{key:"_doRemove",value:function(e,t,r){e.removeEventListener(t,r,!1)}}]),p);function p(){o(this,p),this._events=[]}function l(e,c,u){var d=!1;function f(e,t,r){return Math.max(t,Math.min(e,r))}function r(e,t,r){if(r&&(d=!0),d){e.preventDefault();var i=c.getBoundingClientRect(),n=i.width,o=i.height,a=t.clientX,s=t.clientY,p=f(a-i.left,0,n),l=f(s-i.top,0,o);u(p/n,l/o)}}function t(e,t){1===(void 0===e.buttons?e.which:e.buttons)?r(e,e,t):d=!1}function i(e,t){1===e.touches.length?r(e,e.touches[0],t):d=!1}e.add(c,"mousedown",function(e){t(e,!0)}),e.add(c,"touchstart",function(e){i(e,!0)}),e.add(window,"mousemove",t),e.add(c,"touchmove",i),e.add(window,"mouseup",function(e){d=!1}),e.add(c,"touchend",function(e){d=!1}),e.add(c,"touchcancel",function(e){d=!1})}var c="keydown",u="mousedown",d="focusin";function v(e,t){return(t||document).querySelector(e)}function f(e){e.preventDefault(),e.stopPropagation()}function b(e,t,r,i,n){e.add(t,c,function(e){0<=r.indexOf(e.key)&&(n&&f(e),i(e))})}var r=document.createElement("style");function m(e){o(this,m),this.settings={popup:"right",layout:"default",alpha:!0,editor:!0,editorFormat:"hex",cancelButton:!1,defaultColor:"#0cf"},this._events=new t,this.onChange=null,this.onDone=null,this.onOpen=null,this.onClose=null,this.setOptions(e)}return r.textContent=".picker_wrapper.no_alpha .picker_alpha{display:none}.picker_wrapper.no_editor .picker_editor{position:absolute;z-index:-1;opacity:0}.picker_wrapper.no_cancel .picker_cancel{display:none}.layout_default.picker_wrapper{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-flow:row wrap;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:stretch;align-items:stretch;font-size:10px;width:25em;padding:.5em}.layout_default.picker_wrapper input,.layout_default.picker_wrapper button{font-size:1rem}.layout_default.picker_wrapper>*{margin:.5em}.layout_default.picker_wrapper::before{content:'';display:block;width:100%;height:0;-webkit-box-ordinal-group:2;order:1}.layout_default .picker_slider,.layout_default .picker_selector{padding:1em}.layout_default .picker_hue{width:100%}.layout_default .picker_sl{-webkit-box-flex:1;flex:1 1 auto}.layout_default .picker_sl::before{content:'';display:block;padding-bottom:100%}.layout_default .picker_editor{-webkit-box-ordinal-group:2;order:1;width:6.5rem}.layout_default .picker_editor input{width:100%;height:100%}.layout_default .picker_sample{-webkit-box-ordinal-group:2;order:1;-webkit-box-flex:1;flex:1 1 auto}.layout_default .picker_done,.layout_default .picker_cancel{-webkit-box-ordinal-group:2;order:1}.picker_wrapper{box-sizing:border-box;background:#f2f2f2;box-shadow:0 0 0 1px silver;cursor:default;font-family:sans-serif;color:#444;pointer-events:auto}.picker_wrapper:focus{outline:none}.picker_wrapper button,.picker_wrapper input{box-sizing:border-box;border:none;box-shadow:0 0 0 1px silver;outline:none}.picker_wrapper button:focus,.picker_wrapper button:active,.picker_wrapper input:focus,.picker_wrapper input:active{box-shadow:0 0 2px 1px dodgerblue}.picker_wrapper button{padding:.4em .6em;cursor:pointer;background-color:whitesmoke;background-image:-webkit-gradient(linear, left bottom, left top, from(gainsboro), to(transparent));background-image:-webkit-linear-gradient(bottom, gainsboro, transparent);background-image:linear-gradient(0deg, gainsboro, transparent)}.picker_wrapper button:active{background-image:-webkit-gradient(linear, left bottom, left top, from(transparent), to(gainsboro));background-image:-webkit-linear-gradient(bottom, transparent, gainsboro);background-image:linear-gradient(0deg, transparent, gainsboro)}.picker_wrapper button:hover{background-color:white}.picker_selector{position:absolute;z-index:1;display:block;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);border:2px solid white;border-radius:100%;box-shadow:0 0 3px 1px #67b9ff;background:currentColor;cursor:pointer}.picker_slider .picker_selector{border-radius:2px}.picker_hue{position:relative;background-image:-webkit-gradient(linear, left top, right top, from(red), color-stop(yellow), color-stop(lime), color-stop(cyan), color-stop(blue), color-stop(magenta), to(red));background-image:-webkit-linear-gradient(left, red, yellow, lime, cyan, blue, magenta, red);background-image:linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red);box-shadow:0 0 0 1px silver}.picker_sl{position:relative;box-shadow:0 0 0 1px silver;background-image:-webkit-gradient(linear, left top, left bottom, from(white), color-stop(50%, rgba(255,255,255,0))),-webkit-gradient(linear, left bottom, left top, from(black), color-stop(50%, rgba(0,0,0,0))),-webkit-gradient(linear, left top, right top, from(gray), to(rgba(128,128,128,0)));background-image:-webkit-linear-gradient(top, white, rgba(255,255,255,0) 50%),-webkit-linear-gradient(bottom, black, rgba(0,0,0,0) 50%),-webkit-linear-gradient(left, gray, rgba(128,128,128,0));background-image:linear-gradient(180deg, white, rgba(255,255,255,0) 50%),linear-gradient(0deg, black, rgba(0,0,0,0) 50%),linear-gradient(90deg, gray, rgba(128,128,128,0))}.picker_alpha,.picker_sample{position:relative;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E\") left top/contain white;box-shadow:0 0 0 1px silver}.picker_alpha .picker_selector,.picker_sample .picker_selector{background:none}.picker_editor input{font-family:monospace;padding:.2em .4em}.picker_sample::before{content:'';position:absolute;display:block;width:100%;height:100%;background:currentColor}.picker_arrow{position:absolute;z-index:-1}.picker_wrapper.popup{position:absolute;z-index:2;margin:1.5em}.picker_wrapper.popup,.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{background:#f2f2f2;box-shadow:0 0 10px 1px rgba(0,0,0,0.4)}.picker_wrapper.popup .picker_arrow{width:3em;height:3em;margin:0}.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{content:\"\";display:block;position:absolute;top:0;left:0;z-index:-99}.picker_wrapper.popup .picker_arrow::before{width:100%;height:100%;-webkit-transform:skew(45deg);transform:skew(45deg);-webkit-transform-origin:0 100%;transform-origin:0 100%}.picker_wrapper.popup .picker_arrow::after{width:150%;height:150%;box-shadow:none}.popup.popup_top{bottom:100%;left:0}.popup.popup_top .picker_arrow{bottom:0;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.popup.popup_bottom{top:100%;left:0}.popup.popup_bottom .picker_arrow{top:0;left:0;-webkit-transform:rotate(90deg) scale(1, -1);transform:rotate(90deg) scale(1, -1)}.popup.popup_left{top:0;right:100%}.popup.popup_left .picker_arrow{top:0;right:0;-webkit-transform:scale(-1, 1);transform:scale(-1, 1)}.popup.popup_right{top:0;left:100%}.popup.popup_right .picker_arrow{top:0;left:0}",document.documentElement.firstElementChild.appendChild(r),e(m,[{key:"setOptions",value:function(e){var t=this;if(e){var r=this.settings;if(e instanceof HTMLElement)r.parent=e;else{r.parent&&e.parent&&r.parent!==e.parent&&(this._events.remove(r.parent),this._popupInited=!1),function(e,t,r){for(var i in e)r&&0<=r.indexOf(i)||(t[i]=e[i])}(e,r),e.onChange&&(this.onChange=e.onChange),e.onDone&&(this.onDone=e.onDone),e.onOpen&&(this.onOpen=e.onOpen),e.onClose&&(this.onClose=e.onClose);var i=e.color||e.colour;i&&this._setColor(i)}var n=r.parent;if(n&&r.popup&&!this._popupInited){var o=function(e){return t.openHandler(e)};this._events.add(n,"click",o),b(this._events,n,[" ","Spacebar","Enter"],o),this._popupInited=!0}else e.parent&&!r.popup&&this.show()}}},{key:"openHandler",value:function(e){if(this.show()){e&&e.preventDefault(),this.settings.parent.style.pointerEvents="none";var t=e&&e.type===c?this._domEdit:this.domElement;setTimeout(function(){return t.focus()},100),this.onOpen&&this.onOpen(this.colour)}}},{key:"closeHandler",value:function(e){var t=e&&e.type,r=!1;if(e)if(t===u||t===d){var i=(this.__containedEvent||0)+100;e.timeStamp>i&&(r=!0)}else f(e),r=!0;else r=!0;r&&this.hide()&&(this.settings.parent.style.pointerEvents="",t!==u&&this.settings.parent.focus(),this.onClose&&this.onClose(this.colour))}},{key:"movePopup",value:function(e,t){this.closeHandler(),this.setOptions(e),t&&this.openHandler()}},{key:"setColor",value:function(e,t){this._setColor(e,{silent:t})}},{key:"_setColor",value:function(e,t){if("string"==typeof e&&(e=e.trim()),e){t=t||{};var r=void 0;try{r=new s(e)}catch(e){if(t.failSilently)return;throw e}if(!this.settings.alpha){var i=r.hsla;i[3]=1,r.hsla=i}this.colour=this.color=r,this._setHSLA(null,null,null,null,t)}}},{key:"setColour",value:function(e,t){this.setColor(e,t)}},{key:"show",value:function(){if(!this.settings.parent)return!1;if(this.domElement){var e=this._toggleDOM(!0);return this._setPosition(),e}var t=function(e){var t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.settings.template||'<div class="picker_wrapper" tabindex="-1"><div class="picker_arrow"></div><div class="picker_hue picker_slider"><div class="picker_selector"></div></div><div class="picker_sl"><div class="picker_selector"></div></div><div class="picker_alpha picker_slider"><div class="picker_selector"></div></div><div class="picker_editor"><input aria-label="Type a color name or hex value"/></div><div class="picker_sample"></div><div class="picker_done"><button>Ok</button></div><div class="picker_cancel"><button>Cancel</button></div></div>');return this.domElement=t,this._domH=v(".picker_hue",t),this._domSL=v(".picker_sl",t),this._domA=v(".picker_alpha",t),this._domEdit=v(".picker_editor input",t),this._domSample=v(".picker_sample",t),this._domOkay=v(".picker_done button",t),this._domCancel=v(".picker_cancel button",t),t.classList.add("layout_"+this.settings.layout),this.settings.alpha||t.classList.add("no_alpha"),this.settings.editor||t.classList.add("no_editor"),this.settings.cancelButton||t.classList.add("no_cancel"),this._ifPopup(function(){return t.classList.add("popup")}),this._setPosition(),this.colour?this._updateUI():this._setColor(this.settings.defaultColor),this._bindEvents(),!0}},{key:"hide",value:function(){return this._toggleDOM(!1)}},{key:"destroy",value:function(){this._events.destroy(),this.domElement&&this.settings.parent.removeChild(this.domElement)}},{key:"_bindEvents",value:function(){var r=this,i=this,n=this.domElement,o=this._events;function a(e,t,r){o.add(e,t,r)}a(n,"click",function(e){return e.preventDefault()}),l(o,this._domH,function(e,t){return i._setHSLA(e)}),l(o,this._domSL,function(e,t){return i._setHSLA(null,e,1-t)}),this.settings.alpha&&l(o,this._domA,function(e,t){return i._setHSLA(null,null,null,1-t)});var e=this._domEdit;function t(e){r._ifPopup(function(){return r.closeHandler(e)}),r.onDone&&r.onDone(r.colour)}a(e,"input",function(e){i._setColor(this.value,{fromEditor:!0,failSilently:!0})}),a(e,"focus",function(e){this.selectionStart===this.selectionEnd&&this.select()}),this._ifPopup(function(){function e(e){return r.closeHandler(e)}function t(e){r.__containedEvent=e.timeStamp}a(window,u,e),a(window,d,e),b(o,n,["Esc","Escape"],e),a(n,u,t),a(n,d,t),a(r._domCancel,"click",e)}),a(this._domOkay,"click",t),b(o,n,["Enter"],t)}},{key:"_setPosition",value:function(){var r=this.settings.parent,i=this.domElement;r!==i.parentNode&&r.appendChild(i),this._ifPopup(function(e){"static"===getComputedStyle(r).position&&(r.style.position="relative");var t=!0===e?"popup_right":"popup_"+e;["popup_top","popup_bottom","popup_left","popup_right"].forEach(function(e){e===t?i.classList.add(e):i.classList.remove(e)}),i.classList.add(t)})}},{key:"_setHSLA",value:function(e,t,r,i,n){n=n||{};var o=this.colour,a=o.hsla;[e,t,r,i].forEach(function(e,t){!e&&0!==e||(a[t]=e)}),o.hsla=a,this._updateUI(n),this.onChange&&!n.silent&&this.onChange(o)}},{key:"_updateUI",value:function(e){if(this.domElement){e=e||{};var t=this.colour,r=t.hsla,i="hsl("+360*r[0]+", 100%, 50%)",n=t.hslString,o=t.hslaString,a=this._domH,s=this._domSL,p=this._domA,l=v(".picker_selector",a),c=v(".picker_selector",s),u=v(".picker_selector",p);k(0,l,r[0]),this._domSL.style.backgroundColor=this._domH.style.color=i,k(0,c,r[1]),_(0,c,1-r[2]),s.style.color=n,_(0,u,1-r[3]);var d=n,f=d.replace("hsl","hsla").replace(")",", 0)"),h="linear-gradient("+[d,f]+")";if(this._domA.style.backgroundImage=h+", url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E\")",!e.fromEditor){var g=this.settings.editorFormat,b=this.settings.alpha,m=void 0;switch(g){case"rgb":m=t.printRGB(b);break;case"hsl":m=t.printHSL(b);break;default:m=t.printHex(b)}this._domEdit.value=m}this._domSample.style.color=o}function k(e,t,r){t.style.left=100*r+"%"}function _(e,t,r){t.style.top=100*r+"%"}}},{key:"_ifPopup",value:function(e,t){this.settings.parent&&this.settings.popup?e&&e(this.settings.popup):t&&t()}},{key:"_toggleDOM",value:function(e){var t=this.domElement;if(!t)return!1;var r=e?"":"none",i=t.style.display!==r;return i&&(t.style.display=r),i}}],[{key:"StyleElement",get:function(){return r}}]),m});
