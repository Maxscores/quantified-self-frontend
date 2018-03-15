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
	var FoodService = __webpack_require__(1);

	var foodService = new FoodService();

	foodService.getFoods();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Food = __webpack_require__(2);

	var FoodService = function () {
	  function FoodService() {
	    _classCallCheck(this, FoodService);

	    this.baseUrl = "https://qs-1710-rails.herokuapp.com";
	  }

	  _createClass(FoodService, [{
	    key: "getFoods",
	    value: function getFoods() {
	      fetch(this.baseUrl + "/api/v1/foods").then(function (response) {
	        return response.json();
	      }).then(function (foods) {
	        return foods.forEach(function (newFood) {
	          var food = new Food(newFood.id, newFood.name, newFood.calories);
	          food.appendFood();
	        });
	      }).catch(function (error) {
	        return console.error(error);
	      });
	    }
	  }]);

	  return FoodService;
	}();

	$(".food-form").on('submit', function (e) {
	  e.preventDefault();
	  var post_url = $(this).attr("action");
	  var request_method = $(this).attr("method");
	  var form_data = $(this).serialize();

	  $.ajax({
	    url: post_url,
	    type: request_method,
	    data: form_data
	  }).done(function (response) {
	    $("#server-results").html(response);
	  });
	});

	// module.exports = {Food:Food, getFoods:getFoods}
	module.exports = FoodService;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Food = function () {
	  function Food(id, name, calories) {
	    _classCallCheck(this, Food);

	    this.id = id;
	    this.name = name;
	    this.calories = calories;
	  }

	  _createClass(Food, [{
	    key: 'appendFood',
	    value: function appendFood() {
	      $('.foods-table').append(this.foodRow());
	    }
	  }, {
	    key: 'foodRow',
	    value: function foodRow() {
	      return '<tr><td>' + this.name + '</td><td>' + this.calories + '</td><td id="delete">delete</td></tr>';
	    }
	  }]);

	  return Food;
	}();

	module.exports = Food;

/***/ })
/******/ ]);