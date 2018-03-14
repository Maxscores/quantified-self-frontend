/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// const Food = require("./foods").Food
	var getFoods = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Food = function Food(id, name, calories) {
	  _classCallCheck(this, Food);

	  this.id = id;
	  this.name = name;
	  this.calories = calories;
	};

	var baseUrl = "https://qs-1710-rails.herokuapp.com";

	var getFoods = function getFoods() {
	  fetch(baseUrl + "/api/v1/foods").then(function (response) {
	    return response.json();
	  }).then(function (foods) {
	    return foods.forEach(function (food) {
	      console.log(food);
	    });
	  }).catch(function (error) {
	    return console.error(error);
	  });
	};

	// module.exports = {Food:Food, getFoods:getFoods}
	module.exports = getFoods;

/***/ })
/******/ ]);