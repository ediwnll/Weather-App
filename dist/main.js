(()=>{"use strict";function e(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function t(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function r(e){t(1,arguments);var r=Object.prototype.toString.call(e);return e instanceof Date||"object"===n(e)&&"[object Date]"===r?new Date(e.getTime()):"number"==typeof e||"[object Number]"===r?new Date(e):("string"!=typeof e&&"[object String]"!==r||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function a(n,a){t(2,arguments);var o=r(n).getTime(),i=e(a);return new Date(o+i)}function o(n,r){t(2,arguments);var o=e(r);return a(n,1e3*o)}function i(n){t(1,arguments);var a=e(n);return r(1e3*a)}const u={getLocData:async function(e,t="metric"){try{const n=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=38982387bce58058b2661be97bbebcb5`,{mode:"cors"}),r=await n.json();return n.status>=400?(console.log("Error",r),r):async function(e,t){const{coord:n}=e;try{const r=await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${n.lat}&lon=${n.lon}&exclude=alerts,minutely&units=${t}&appid=38982387bce58058b2661be97bbebcb5`,{mode:"cors"}),a=await r.json();return console.log(a),async function(e){const t=new Intl.DisplayNames(["en"],{type:"region"}),{locationData:n,forecastData:r,units:a}=e,u={city:n.name,country:t.of(n.sys.country),units:a,current:{temperature:Math.round(r.current.temp),feelsLike:Math.round(r.current.feels_like),icon:r.current.weather[0].icon,tempDescription:r.current.weather[0].description,windSpeed:Math.round(r.current.wind_speed),windDegree:r.current.wind_deg,chanceOfRain:Math.round(100*r.daily[0].pop),humidity:r.current.humidity,dateAndTime:new Date,sunriseTime:o(i(r.current.sunrise),r.timezone_offset+60*(new Date).getTimezoneOffset()),sunsetTime:o(i(r.current.sunset),r.timezone_offset+60*(new Date).getTimezoneOffset()),clouds:r.current.clouds,uvi:Math.round(r.current.uvi),visibility:r.current.visibility/1e3,moonPhase:r.daily[0].moon_phase,time:o(new Date,r.timezone_offset+60*(new Date).getTimezoneOffset())},daily:[],hourly:[]};for(let e=1;e<7;e+=1)u.daily[e-1]={date:o(i(r.daily[e].dt),r.timezone_offset),icon:r.daily[e].weather[0].icon,dayTemperature:Math.round(r.daily[e].temp.day),nightTemperature:Math.round(r.daily[e].temp.night),tempDescription:r.daily[e].weather[0].description,windSpeed:r.daily[e].wind_speed,windDegree:r.daily[e].wind_deg};for(let e=0;e<24;e+=1)u.hourly[e]={date:o(i(r.hourly[e].dt),r.timezone_offset),icon:r.hourly[e].weather[0].icon,temperature:r.hourly[e].temp,tempDescription:r.hourly[e].weather[0].description,windSpeed:r.hourly[e].wind_speed,windDegree:r.hourly[e].wind_deg,windGust:r.hourly[e].wind_gust};return console.log(u),u}({locationData:e,forecastData:a,units:t})}catch(e){return{cod:e.name,message:e.message}}}(r,t)}catch(e){return{cod:e.name,message:e.message}}}};function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function d(e){return t(1,arguments),e instanceof Date||"object"===s(e)&&"[object Date]"===Object.prototype.toString.call(e)}function c(e){if(t(1,arguments),!d(e)&&"number"!=typeof e)return!1;var n=r(e);return!isNaN(Number(n))}function l(n,r){t(2,arguments);var o=e(r);return a(n,-o)}var m=864e5;function h(e){t(1,arguments);var n=1,a=r(e),o=a.getUTCDay(),i=(o<n?7:0)+o-n;return a.setUTCDate(a.getUTCDate()-i),a.setUTCHours(0,0,0,0),a}function f(e){t(1,arguments);var n=r(e),a=n.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(a+1,0,4),o.setUTCHours(0,0,0,0);var i=h(o),u=new Date(0);u.setUTCFullYear(a,0,4),u.setUTCHours(0,0,0,0);var s=h(u);return n.getTime()>=i.getTime()?a+1:n.getTime()>=s.getTime()?a:a-1}function g(e){t(1,arguments);var n=f(e),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=h(r);return a}var w=6048e5,v={};function y(){return v}function p(n,a){var o,i,u,s,d,c,l,m;t(1,arguments);var h=y(),f=e(null!==(o=null!==(i=null!==(u=null!==(s=null==a?void 0:a.weekStartsOn)&&void 0!==s?s:null==a||null===(d=a.locale)||void 0===d||null===(c=d.options)||void 0===c?void 0:c.weekStartsOn)&&void 0!==u?u:h.weekStartsOn)&&void 0!==i?i:null===(l=h.locale)||void 0===l||null===(m=l.options)||void 0===m?void 0:m.weekStartsOn)&&void 0!==o?o:0);if(!(f>=0&&f<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var g=r(n),w=g.getUTCDay(),v=(w<f?7:0)+w-f;return g.setUTCDate(g.getUTCDate()-v),g.setUTCHours(0,0,0,0),g}function b(n,a){var o,i,u,s,d,c,l,m;t(1,arguments);var h=r(n),f=h.getUTCFullYear(),g=y(),w=e(null!==(o=null!==(i=null!==(u=null!==(s=null==a?void 0:a.firstWeekContainsDate)&&void 0!==s?s:null==a||null===(d=a.locale)||void 0===d||null===(c=d.options)||void 0===c?void 0:c.firstWeekContainsDate)&&void 0!==u?u:g.firstWeekContainsDate)&&void 0!==i?i:null===(l=g.locale)||void 0===l||null===(m=l.options)||void 0===m?void 0:m.firstWeekContainsDate)&&void 0!==o?o:1);if(!(w>=1&&w<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var v=new Date(0);v.setUTCFullYear(f+1,0,w),v.setUTCHours(0,0,0,0);var b=p(v,a),C=new Date(0);C.setUTCFullYear(f,0,w),C.setUTCHours(0,0,0,0);var T=p(C,a);return h.getTime()>=b.getTime()?f+1:h.getTime()>=T.getTime()?f:f-1}function C(n,r){var a,o,i,u,s,d,c,l;t(1,arguments);var m=y(),h=e(null!==(a=null!==(o=null!==(i=null!==(u=null==r?void 0:r.firstWeekContainsDate)&&void 0!==u?u:null==r||null===(s=r.locale)||void 0===s||null===(d=s.options)||void 0===d?void 0:d.firstWeekContainsDate)&&void 0!==i?i:m.firstWeekContainsDate)&&void 0!==o?o:null===(c=m.locale)||void 0===c||null===(l=c.options)||void 0===l?void 0:l.firstWeekContainsDate)&&void 0!==a?a:1),f=b(n,r),g=new Date(0);g.setUTCFullYear(f,0,h),g.setUTCHours(0,0,0,0);var w=p(g,r);return w}var T=6048e5;function S(e,t){for(var n=e<0?"-":"",r=Math.abs(e).toString();r.length<t;)r="0"+r;return n+r}const M=function(e,t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return S("yy"===t?r%100:r,t.length)},D=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):S(n+1,2)},x=function(e,t){return S(e.getUTCDate(),t.length)},k=function(e,t){return S(e.getUTCHours()%12||12,t.length)},E=function(e,t){return S(e.getUTCHours(),t.length)},N=function(e,t){return S(e.getUTCMinutes(),t.length)},P=function(e,t){return S(e.getUTCSeconds(),t.length)},U=function(e,t){var n=t.length,r=e.getUTCMilliseconds();return S(Math.floor(r*Math.pow(10,n-3)),t.length)};function q(e,t){var n=e>0?"-":"+",r=Math.abs(e),a=Math.floor(r/60),o=r%60;if(0===o)return n+String(a);var i=t||"";return n+String(a)+i+S(o,2)}function W(e,t){return e%60==0?(e>0?"-":"+")+S(Math.abs(e)/60,2):Y(e,t)}function Y(e,t){var n=t||"",r=e>0?"-":"+",a=Math.abs(e);return r+S(Math.floor(a/60),2)+n+S(a%60,2)}const O={G:function(e,t,n){var r=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var r=e.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return M(e,t)},Y:function(e,t,n,r){var a=b(e,r),o=a>0?a:1-a;return"YY"===t?S(o%100,2):"Yo"===t?n.ordinalNumber(o,{unit:"year"}):S(o,t.length)},R:function(e,t){return S(f(e),t.length)},u:function(e,t){return S(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return S(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return S(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){var r=e.getUTCMonth();switch(t){case"M":case"MM":return D(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){var r=e.getUTCMonth();switch(t){case"L":return String(r+1);case"LL":return S(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(e,n,a,o){var i=function(e,n){t(1,arguments);var a=r(e),o=p(a,n).getTime()-C(a,n).getTime();return Math.round(o/T)+1}(e,o);return"wo"===n?a.ordinalNumber(i,{unit:"week"}):S(i,n.length)},I:function(e,n,a){var o=function(e){t(1,arguments);var n=r(e),a=h(n).getTime()-g(n).getTime();return Math.round(a/w)+1}(e);return"Io"===n?a.ordinalNumber(o,{unit:"week"}):S(o,n.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):x(e,t)},D:function(e,n,a){var o=function(e){t(1,arguments);var n=r(e),a=n.getTime();n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0);var o=n.getTime(),i=a-o;return Math.floor(i/m)+1}(e);return"Do"===n?a.ordinalNumber(o,{unit:"dayOfYear"}):S(o,n.length)},E:function(e,t,n){var r=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){var a=e.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return S(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){var a=e.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return S(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,n){var r=e.getUTCDay(),a=0===r?7:r;switch(t){case"i":return String(a);case"ii":return S(a,t.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){var r,a=e.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){var r,a=e.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var r=e.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return k(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):E(e,t)},K:function(e,t,n){var r=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(r,{unit:"hour"}):S(r,t.length)},k:function(e,t,n){var r=e.getUTCHours();return 0===r&&(r=24),"ko"===t?n.ordinalNumber(r,{unit:"hour"}):S(r,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):N(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):P(e,t)},S:function(e,t){return U(e,t)},X:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return W(a);case"XXXX":case"XX":return Y(a);default:return Y(a,":")}},x:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"x":return W(a);case"xxxx":case"xx":return Y(a);default:return Y(a,":")}},O:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+q(a,":");default:return"GMT"+Y(a,":")}},z:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+q(a,":");default:return"GMT"+Y(a,":")}},t:function(e,t,n,r){var a=r._originalDate||e;return S(Math.floor(a.getTime()/1e3),t.length)},T:function(e,t,n,r){return S((r._originalDate||e).getTime(),t.length)}};var z=function(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}},H=function(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}},L={p:H,P:function(e,t){var n,r=e.match(/(P+)(p+)?/)||[],a=r[1],o=r[2];if(!o)return z(e,t);switch(a){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",z(a,t)).replace("{{time}}",H(o,t))}};const A=L;function F(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var j=["D","DD"],G=["YY","YYYY"];function _(e){return-1!==j.indexOf(e)}function Q(e){return-1!==G.indexOf(e)}function R(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var X={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function B(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth,r=e.formats[n]||e.formats[e.defaultWidth];return r}}var J,I={date:B({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:B({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:B({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},$={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function V(e){return function(t,n){var r;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&e.formattingValues){var a=e.defaultFormattingWidth||e.defaultWidth,o=null!=n&&n.width?String(n.width):a;r=e.formattingValues[o]||e.formattingValues[a]}else{var i=e.defaultWidth,u=null!=n&&n.width?String(n.width):e.defaultWidth;r=e.values[u]||e.values[i]}return r[e.argumentCallback?e.argumentCallback(t):t]}}function K(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],o=t.match(a);if(!o)return null;var i,u=o[0],s=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],d=Array.isArray(s)?ee(s,(function(e){return e.test(u)})):Z(s,(function(e){return e.test(u)}));i=e.valueCallback?e.valueCallback(d):d,i=n.valueCallback?n.valueCallback(i):i;var c=t.slice(u.length);return{value:i,rest:c}}}function Z(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}function ee(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n}const te={code:"en-US",formatDistance:function(e,t,n){var r,a=X[e];return r="string"==typeof a?a:1===t?a.one:a.other.replace("{{count}}",t.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:I,formatRelative:function(e,t,n,r){return $[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:V({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:V({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:V({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:V({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:V({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(J={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.match(J.matchPattern);if(!n)return null;var r=n[0],a=e.match(J.parsePattern);if(!a)return null;var o=J.valueCallback?J.valueCallback(a[0]):a[0];o=t.valueCallback?t.valueCallback(o):o;var i=e.slice(r.length);return{value:o,rest:i}}),era:K({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:K({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:K({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:K({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:K({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};var ne=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,re=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ae=/^'([^]*?)'?$/,oe=/''/g,ie=/[a-zA-Z]/;function ue(n,a,o){var i,u,s,d,m,h,f,g,w,v,p,b,C,T,S,M,D,x;t(2,arguments);var k=String(a),E=y(),N=null!==(i=null!==(u=null==o?void 0:o.locale)&&void 0!==u?u:E.locale)&&void 0!==i?i:te,P=e(null!==(s=null!==(d=null!==(m=null!==(h=null==o?void 0:o.firstWeekContainsDate)&&void 0!==h?h:null==o||null===(f=o.locale)||void 0===f||null===(g=f.options)||void 0===g?void 0:g.firstWeekContainsDate)&&void 0!==m?m:E.firstWeekContainsDate)&&void 0!==d?d:null===(w=E.locale)||void 0===w||null===(v=w.options)||void 0===v?void 0:v.firstWeekContainsDate)&&void 0!==s?s:1);if(!(P>=1&&P<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var U=e(null!==(p=null!==(b=null!==(C=null!==(T=null==o?void 0:o.weekStartsOn)&&void 0!==T?T:null==o||null===(S=o.locale)||void 0===S||null===(M=S.options)||void 0===M?void 0:M.weekStartsOn)&&void 0!==C?C:E.weekStartsOn)&&void 0!==b?b:null===(D=E.locale)||void 0===D||null===(x=D.options)||void 0===x?void 0:x.weekStartsOn)&&void 0!==p?p:0);if(!(U>=0&&U<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!N.localize)throw new RangeError("locale must contain localize property");if(!N.formatLong)throw new RangeError("locale must contain formatLong property");var q=r(n);if(!c(q))throw new RangeError("Invalid time value");var W=F(q),Y=l(q,W),z={firstWeekContainsDate:P,weekStartsOn:U,locale:N,_originalDate:q},H=k.match(re).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,A[t])(e,N.formatLong):e})).join("").match(ne).map((function(e){if("''"===e)return"'";var t=e[0];if("'"===t)return se(e);var r=O[t];if(r)return null!=o&&o.useAdditionalWeekYearTokens||!Q(e)||R(e,a,String(n)),null!=o&&o.useAdditionalDayOfYearTokens||!_(e)||R(e,a,String(n)),r(Y,e,N.localize,z);if(t.match(ie))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return e})).join("");return H}function se(e){var t=e.match(ae);return t?t[1].replace(oe,"'"):e}const de=(()=>{const e=document.querySelector(".main-container");function t(e,t){let n,r=e;return"imperial"===t&&(r*=.44704),r<.5?n="Calm":r<1.6?n="Light air":r<3.4?n="Light breeze":r<5.6?n="Gentle breeze":r<8?n="Moderate breeze":r<10.8?n="Fresh breeze":r<13.9?n="Strong breeze":r<17.2?n="High wind":r<20.8?n="Gale":r<24.5?n="Strong gale":r<28.5?n="Storm":r<32.7?n="Violent storm, seek shelter":r>=32.7&&(n="Hurricane, stay safe"),{windDesc:n,roundedSpeed:Math.round(e)}}function n(e){let t="",n="";return 0!==e&&1!==e||(n="New Moon",t="./svg/moon-new.svg"),.25===e&&(n="First Quarter Moon",t="./svg/moon-first-quarter.svg"),.5===e&&(n="Full Moon",t="./svg/moon-full.svg"),.75===e&&(n="Last Quarter",t="./svg/moon-last-quarter.svg"),e>0&&e<.25&&(n="Waxing Crescent",t="./svg/moon-waxing-crescent.svg"),e>.25&&e<.5&&(n="Waxing Gibbous",t="./svg/moon-waxing-gibbous.svg"),e>.5&&e<.75&&(n="Waning Gibbous",t="./svg/moon-waning-gibbous.svg"),e>.75&&e<1&&(n="Waning Crescent",t="./svg/moon-waning-crescent.svg"),{moonDesc:n,moonDesc:n}}function r(e){const t=document.querySelector(".units-metric"),n=document.querySelector(".units-imperial"),r=document.querySelectorAll(".unit-temp"),a=document.querySelectorAll(".unit-speed");let o,i;"metric"===e?(t.className="units-metric active",n.className="units-imperial",o="°C",i="m/s"):(t.className="units-metric",n.className="units-imperial active",o="°F",i="mph"),r.forEach((e=>{e.textContent=o})),a.forEach((e=>{e.textContent=i}))}function a(e,t){let n,r,a,o;return"imperial"===t?(n=ue(e,"EEEE d MMMM yyyy | h:mm aa"),r=ue(e,"hh:mm aa"),a=ue(e,"hh:mm aa"),o=ue(e,"EEEE"),{formattedTime:n,formattedSunrise,formattedSunset,formattedWeekDay:o}):(n=ue(e,"EEEE d MMMM yyyy | H:mm"),r=ue(e,"HH:mm"),a=ue(e,"HH:mm"),o=ue(e,"EEEE"),{formattedTime:n,formattedSunriseTime:r,formattedSunsetTime:a,formattedWeekDay:o})}return{loading:function(t){const n=document.querySelector(".loading");"loading"===t?(n.className="loading show",e.className="main-container hide"):n.className="loading hide"},renderApp:function(o){const i=document.querySelector(".error");if(o.cod)i.className="error show",e.className="main-container hide",i.textContent=o.message.charAt(0).toUpperCase()+o.message.slice(1);else{i.className="error hide",e.className="main-container";const{city:u,country:s,current:d,daily:c,units:l}=o;r(l),function(e,r,o,i){const u=document.querySelector(".icon-weather"),s=document.querySelector(".data-city"),d=document.querySelector(".data-country"),c=document.querySelector(".data-temp"),l=document.querySelector(".data-time"),m=document.querySelector(".data-feels-like"),h=document.querySelector(".data-temp-desc"),f=document.querySelector(".data-wind-speed"),g=document.querySelector(".data-wind-desc"),w=document.querySelector(".data-humidity"),v=document.querySelector(".data-visibility"),y=document.querySelector(".data-clouds"),p=document.querySelector(".data-rain-chance"),b=document.querySelector(".data-uvi"),C=document.querySelector(".data-sunrise"),T=document.querySelector(".data-sunset"),S=document.querySelector(".data-moon"),M=document.querySelector(".data-moon-icon"),D=document.createElement("i");u.textContent="",u.appendChild(D),s.textContent=e,d.textContent=r,c.textContent=o.temperature,l.textContent=a(o.time,i).formattedTime,m.textContent=o.feelsLike,h.textContent=o.tempDescription.charAt(0).toUpperCase()+o.tempDescription.slice(1),f.textContent=t(o.windSpeed,i).roundedSpeed,g.textContent=t(o.windSpeed,i).windDesc,w.textContent=o.humidity,v.textContent=o.visibility,y.textContent=o.clouds,p.textContent=o.chanceOfRain,b.textContent=o.uvi,b.className=function(e){let t="";return e<=2?t="data-uvi uvi-green":e<=5?t="data-uvi uvi yellow":e<=7?t="data-uvi uvi-orange":e>7&&(t="data-uvi uvi-red"),t}(o.uvi),C.textContent=a(o.sunriseTime,i).formattedSunriseTime,T.textContent=a(o.sunsetTime,i).formattedSunsetTime,S.textContent=n(o.moonPhase).moonName,M.setAttribute("src",n(o.moonPhase).moonIcon),M.setAttribute("title",n(o.moonPhase).moonName)}(u,s,d,l),function(e,n){const o=document.querySelector(".daily-list");o.textContent="";for(let r=0;r<e.length;r+=1){const i=document.createElement("div");i.className="daily-item";const u=document.createElement("span");u.className="data-daily-date daily-item-date",u.textContent=a(e[r].date,n).formattedWeekDay;const s=document.createElement("span");s.className="daily-item-day-temp",s.setAttribute("title",e[r].tempDescription.charAt(0).toUpperCase()+e[r].tempDescription.slice(1));const d=document.createElement("span");d.className="data-daily-temp",d.textContent=e[r].dayTemperature;const c=document.createElement("span");c.className="unit-temp";const l=document.createElement("span");l.className="daily-item-night-temp";const m=document.createElement("span");m.className="data-daily-night-temp",m.textContent=e[r].nightTemperature;const h=document.createElement("span");h.className="unit-temp";const f=document.createElement("span");f.className="daily-item-wind",f.setAttribute("title",t(e[r].windSpeed,n).windDesc);const g=document.createElement("span");g.className="data-daily-wind-speed",g.textContent=t(e[r].windSpeed,n).roundedSpeed;const w=document.createElement("span");w.className="unit-speed",o.appendChild(i),i.appendChild(u),i.appendChild(s),s.appendChild(d),s.appendChild(c),i.appendChild(l),l.appendChild(m),l.appendChild(h),i.appendChild(f),f.appendChild(g),f.appendChild(w)}r(n)}(c,l)}}}})(),ce=(()=>{const e=document.querySelector(".location-input"),t=document.querySelector(".navi");async function n(e="Amsterdam",t="metric"){de.loading("loading");const n=await u.getLocData(e,t);de.renderApp(n),de.loading("finished")}return{clickHandler:function(){let r,a;t.addEventListener("click",(async t=>{t.target.parentElement.classList.contains("submit")||t.target.classList.contains("submit")?(t.preventDefault(),r=e.value,n(r,a)):t.target.classList.contains("units-metric")?(a="metric",n(r,a)):t.target.classList.contains("units-imperial")&&(a="imperial",n(r,a))}))},load:n}})();ce.load(),ce.clickHandler()})();