(this["webpackJsonpblockchain-explorer"]=this["webpackJsonpblockchain-explorer"]||[]).push([[17],{199:function(t,e,r){"use strict";r.d(e,"b",(function(){return n})),r.d(e,"e",(function(){return a})),r.d(e,"c",(function(){return i})),r.d(e,"f",(function(){return o})),r.d(e,"g",(function(){return c})),r.d(e,"d",(function(){return s})),r.d(e,"a",(function(){return l}));var n="/assets/issuingBoxes",a="/assets/issuingBoxes/total",i="assets/id:/issuingBoxes",o="/transactions/unconfirmed",c="/transactions/unconfirmed/:id",s="oracle/frontendData",l="addresses/balances"},205:function(t,e,r){"use strict";r.d(e,"a",(function(){return s}));var n=r(1),a=r(67),i=r(34),o=r.n(i),c={transformResponse:function(t){return t},dispatch:function(t){return t}},s=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:c,i=r.dispatch,s=r.transformResponse;return i(Object(a.startStructFetch)(t)),o.a.request(Object(n.a)({},e)).then((function(t){return t.data})).then(s).then((function(e){if(!e)return i(Object(a.stopStructFetch)(t,e)),Promise.resolve(e);var r=e.errors||e.error;return r?(i(Object(a.stopStructFetch)(t,new Error(r))),Promise.reject(new Error(r))):(i(Object(a.stopStructFetch)(t,e)),Promise.resolve(e))})).catch((function(e){return i(Object(a.stopStructFetch)(t,e)),Promise.reject(e)}))}},251:function(t,e,r){t.exports=r(252)},252:function(t,e,r){var n=function(t){"use strict";var e=Object.prototype,r=e.hasOwnProperty,n="function"===typeof Symbol?Symbol:{},a=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",o=n.toStringTag||"@@toStringTag";function c(t,e,r,n){var a=e&&e.prototype instanceof u?e:u,i=Object.create(a.prototype),o=new E(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(a,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw i;return k()}for(r.method=a,r.arg=i;;){var o=r.delegate;if(o){var c=g(o,r);if(c){if(c===l)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,o),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}t.wrap=c;var l={};function u(){}function f(){}function d(){}var h={};h[a]=function(){return this};var p=Object.getPrototypeOf,m=p&&p(p(x([])));m&&m!==e&&r.call(m,a)&&(h=m);var v=d.prototype=u.prototype=Object.create(h);function b(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function y(t,e){var n;this._invoke=function(a,i){function o(){return new e((function(n,o){!function n(a,i,o,c){var l=s(t[a],t,i);if("throw"!==l.type){var u=l.arg,f=u.value;return f&&"object"===typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,o,c)}),(function(t){n("throw",t,o,c)})):e.resolve(f).then((function(t){u.value=t,o(u)}),(function(t){return n("throw",t,o,c)}))}c(l.arg)}(a,i,n,o)}))}return n=n?n.then(o,o):o()}}function g(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,g(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var a=n.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function w(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function x(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:k}}function k(){return{value:void 0,done:!0}}return f.prototype=v.constructor=d,d.constructor=f,d[o]=f.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,o in t||(t[o]="GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},b(y.prototype),y.prototype[i]=function(){return this},t.AsyncIterator=y,t.async=function(e,r,n,a,i){void 0===i&&(i=Promise);var o=new y(c(e,r,n,a),i);return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},b(v),v[o]="Generator",v[a]=function(){return this},v.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=x,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return o.type="throw",o.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],o=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),w(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;w(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:x(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}(t.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}},253:function(t,e,r){"use strict";function n(t,e,r,n,a,i,o){try{var c=t[i](o),s=c.value}catch(l){return void r(l)}c.done?e(s):Promise.resolve(s).then(n,a)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(a,i){var o=t.apply(e,r);function c(t){n(o,a,i,c,s,"next",t)}function s(t){n(o,a,i,c,s,"throw",t)}c(void 0)}))}}r.d(e,"a",(function(){return a}))},286:function(t,e,r){"use strict";r.d(e,"a",(function(){return v}));var n=r(47),a=r(251),i=r.n(a),o=r(35),c=r(253),s=r(7),l=r(8),u=r(199),f=r(34),d=r.n(f),h=r(16),p=r(205),m=function(){function t(){Object(s.a)(this,t)}return Object(l.a)(t,null,[{key:"getAddress",value:function(t){return d.a.get("".concat(h.a.apiUrl,"/addresses/").concat(t)).then((function(e){return e?e.data:Promise.reject("Address api service. Request: ".concat(h.a.apiUrl,"/addresses/").concat(t,"."))}))}},{key:"getConfirmed",value:function(t,e){return d.a.get("".concat(h.a.apiUrl,"/addresses/").concat(t,"/transactions"),{params:e}).then((function(e){return e?e.data:Promise.reject("Address api service. Request: ".concat(h.a.apiUrl,"/addresses/").concat(t,"/transactions."))}))}},{key:"getUnconfirmed",value:function(t,e){return d.a.get("".concat(h.a.apiUrl,"/transactions/unconfirmed/byAddress/").concat(t),{params:e}).then((function(e){return e?e.data:Promise.reject("Address api service. Request: ".concat(h.a.apiUrl,"/addresses/").concat(t,"/transactions."))}))}},{key:"getAddressTransactions",value:function(){var t=Object(c.a)(i.a.mark((function t(e,r){var n,a,c,s,l,u,f;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=r.offset,a=r.limit,t.next=3,this.getUnconfirmed(e,{offset:n,limit:a});case 3:if(!(0===(c=t.sent).total||c.total<n)){t.next=9;break}return t.next=7,this.getConfirmed(e,{offset:n-c.total,limit:a});case 7:return s=t.sent,t.abrupt("return",{items:s.items,total:c.total+s.total});case 9:if(!(c.items.length<a)){t.next=15;break}return l=a-c.items.length,t.next=13,this.getConfirmed(e,{offset:0,limit:l});case 13:return u=t.sent,t.abrupt("return",{items:[].concat(Object(o.a)(c.items),Object(o.a)(u.items)),total:c.total+u.total});case 15:return t.next=17,this.getConfirmed(e,{offset:0,limit:1});case 17:return f=t.sent,t.abrupt("return",{items:Object(o.a)(c.items),total:c.total+f.total});case 19:case"end":return t.stop()}}),t,this)})));return function(e,r){return t.apply(this,arguments)}}()},{key:"getAddressesBalances",value:function(t){return Object(p.a)(u.a,{method:"get",url:"".concat(h.a.apiUrl,"/addresses/balances?limit=100")},{dispatch:t})}},{key:"apiUrl",get:function(){return"".concat(h.a.apiUrl,"/addresses")}}]),t}(),v={getAddress:function(t){return function(e){e({type:n.a}),m.getAddress(t).then((function(t){e({payload:{data:t},type:n.b})}))}},getAddressTransactions:function(t,e){return function(r){r({type:n.c}),m.getAddressTransactions(t,e).then((function(t){r({payload:{data:t},type:n.d})}))}},getAddressesBalances:function(){return function(t){return m.getAddressesBalances(t)}}}},652:function(t,e,r){},668:function(t,e,r){"use strict";r.r(e);var n=r(1),a=r(0),i=r.n(a),o=(r(652),r(25)),c=r(67),s=r(199),l=function(t){return Object(c.getStruct)(s.a)(t)},u=r(286),f=r(17),d=r(70),h=r(41),p=r.n(h),m=r(29);e.default=Object(o.b)((function(t){return{addressesBalances:l(t)}}),(function(t){return Object(f.bindActionCreators)(Object(n.a)({},u.a),t)}))((function(t){var e,r=t.addressesBalances,n=t.getAddressesBalances;console.log(r),Object(a.useEffect)((function(){n()}),[]);var o=Object(a.useMemo)((function(){var t;return(null===(t=r.data)||void 0===t?void 0:t.items.filter((function(t){return"2Z4YBkDsDvQj8BX7xiySFewjitqp2ge9c99jfes2whbtKitZTxdBYqbrVZUvZvKv6aqn9by4kp3LE1c26LCyosFnVnm6b6U1JYvWpYmL2ZnixJbXLjWAWuBThV1D6dLpqZJYQHYDznJCk49g5TUiS4q8khpag2aNmHwREV7JSsypHdHLgJT7MGaw51aJfNubyzSKxZ4AJXFS27EfXwyCLzW1K6GVqwkJtCoPvrcLqmqwacAWJPkmh78nke9H4oT88XmSbRt2n9aWZjosiZCafZ4osUDxmZcc5QVEeTWn8drSraY3eFKe8Mu9MSCcVU"!==t.address})))||[]}),[r.data]);return(null===r||void 0===r||null===(e=r.data)||void 0===e?void 0:e.items)?i.a.createElement("div",{className:"rich-list"},i.a.createElement("h1",{className:"rich-list__title"},"Rich List"),i.a.createElement("h4",{className:"rich-list__subtitle"},"Want financial privacy? Use"," ",i.a.createElement("a",{href:"https://github.com/ergoMixer/ergoMixBack",target:"_blank",rel:"noreferrer noopener"},"ErgoMixer"),"!"),i.a.createElement("div",{className:"rich-list-table"},i.a.createElement("div",{className:"rich-list-table__body bi-table"},i.a.createElement("div",{className:"rich-list-table-header rich-list-table__row bi-table__row"},i.a.createElement("div",{className:"rich-list-table__cell bi-table__cell"},"Rank"),i.a.createElement("div",{className:"rich-list-table__cell bi-table__cell"},"Quantity"),i.a.createElement("div",{className:"rich-list-table__cell bi-table__cell"},"Address")),o.map((function(t,e){return i.a.createElement(m.Link,{className:"rich-list-table__row bi-table__row",key:e+1,to:"/addresses/".concat(t.address)},i.a.createElement("div",{className:"rich-list-table__cell bi-table__cell bi-tokens-table__cell"},i.a.createElement("div",{className:"rich-list-table__cell-name bi-tokens-table__cell-name"},"Rank"),e+1),i.a.createElement("div",{className:"rich-list-table__cell bi-table__cell  bi-tokens-table__cell"},i.a.createElement("div",{className:"rich-list-table__cell-name bi-tokens-table__cell-name"},"Quantity"),i.a.createElement("span",null,p()({integerSeparator:","})(Number(String(t.balance/1e9).split(".")[0])),i.a.createElement("span",{className:"text-gray"},".",p()({integerSeparator:""})(Number(String(t.balance/1e9).split(".")[1]||0))),"\xa0ERG")),i.a.createElement("div",{className:"rich-list-table__cell bi-table__cell bi-tokens-table__cell"},i.a.createElement("div",{className:"rich-list-table__cell-name bi-tokens-table__cell-name"},"Address"),t.address.slice(0,8)))}))))):i.a.createElement(d.a,null)}))}}]);
//# sourceMappingURL=17.6af3820c.chunk.js.map