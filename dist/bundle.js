/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _dispatcher = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Flux = __webpack_require__(2);
	
	var _action_constants = __webpack_require__(3);
	
	var ApplicationDispatcher = new _Flux.Dispatcher();
	
	ApplicationDispatcher.handleViewAction = function (action) {
	  this.dispatch({
	    source: _action_constants.Actions.VIEW_ACTION,
	    action: action
	  });
	};
	
	ApplicationDispatcher.handleServerAction = function (action) {
	  this.dispatch({
	    source: _action_constants.Actions.SERVER_ACTION,
	    action: action
	  });
	};
	
	exports.default = ApplicationDispatcher;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	!function(i,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):"object"==typeof exports?exports.Flux=t():i.Flux=t()}(this,function(){return function(i){function t(s){if(n[s])return n[s].exports;var e=n[s]={exports:{},id:s,loaded:!1};return i[s].call(e.exports,e,e.exports,t),e.loaded=!0,e.exports}var n={};return t.m=i,t.c=n,t.p="",t(0)}([function(i,t,n){"use strict";i.exports.Dispatcher=n(1)},function(i,t,n){"use strict";function s(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}var e,o,r;t.__esModule=!0,e=n(2),o="ID_",r=function(){function i(){s(this,i),this._callbacks={},this._isDispatching=!1,this._isHandled={},this._isPending={},this._lastID=1}return i.prototype.register=function(i){var t=o+this._lastID++;return this._callbacks[t]=i,t},i.prototype.unregister=function(i){this._callbacks[i]?void 0:e(!1),delete this._callbacks[i]},i.prototype.waitFor=function(i){var t,n;for(this._isDispatching?void 0:e(!1),t=0;t<i.length;t++)n=i[t],this._isPending[n]?this._isHandled[n]?void 0:e(!1):(this._callbacks[n]?void 0:e(!1),this._invokeCallback(n))},i.prototype.dispatch=function(i){this._isDispatching?e(!1):void 0,this._startDispatching(i);try{for(var t in this._callbacks)this._isPending[t]||this._invokeCallback(t)}finally{this._stopDispatching()}},i.prototype.isDispatching=function(){return this._isDispatching},i.prototype._invokeCallback=function(i){this._isPending[i]=!0,this._callbacks[i](this._pendingPayload),this._isHandled[i]=!0},i.prototype._startDispatching=function(i){for(var t in this._callbacks)this._isPending[t]=!1,this._isHandled[t]=!1;this._pendingPayload=i,this._isDispatching=!0},i.prototype._stopDispatching=function(){delete this._pendingPayload,this._isDispatching=!1},i}(),i.exports=r},function(i,t,n){"use strict";var s=function(i,t,n,s,e,o,r,a){var c,p,l;if(!i)throw void 0===t?c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."):(p=[n,s,e,o,r,a],l=0,c=new Error("Invariant Violation: "+t.replace(/%s/g,function(){return p[l++]}))),c.framesToPop=1,c};i.exports=s}])});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ACTIONS = {
	  VIEW_ACTION: 'VIEW_ACTION',
	  SERVER_ACTION: 'SERVER_ACTION'
	};
	
	exports.default = ACTIONS;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map