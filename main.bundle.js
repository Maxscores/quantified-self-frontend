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

	$(".food-form").on('submit', function (e) {
	  e.preventDefault();
	  foodService.validateFood();
	});

	$(".foods-table").on('click', function (e) {
	  e.preventDefault();
	  if (e.target.id === "delete") {
	    foodService.destroyFood(e);
	  }
	});

	$('input[name="filter"]').on('keyup', function () {
	  foodService.filterFoods();
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Food = __webpack_require__(2);

	var _require = __webpack_require__(3),
	    _require2 = _slicedToArray(_require, 2),
	    handleResponse = _require2[0],
	    errorLog = _require2[1];

	var FoodService = function () {
	  function FoodService() {
	    _classCallCheck(this, FoodService);

	    this.baseUrl = "https://qs-1710-rails.herokuapp.com/api/v1/foods";
	  }

	  _createClass(FoodService, [{
	    key: "getFoods",
	    value: function getFoods() {
	      var _this = this;

	      $('.foods-table').html('<th>Name</th><th>Calories</th>');
	      fetch(this.baseUrl).then(handleResponse).then(function (foods) {
	        return _this.sortFoods(foods);
	      }).then(function (foods) {
	        return _this.appendFoods(foods);
	      }).catch(errorLog);
	    }
	  }, {
	    key: "postFood",
	    value: function postFood(foodInfo) {
	      fetch(this.baseUrl, this.postConfig(foodInfo)).then(handleResponse).then(this.newFoodObject).then(function (food) {
	        return food.prependFood();
	      }).then(this.clearFields).catch(errorLog);
	    }
	  }, {
	    key: "postConfig",
	    value: function postConfig(foodInfo) {
	      return {
	        method: 'POST',
	        headers: { 'Content-Type': "application/json" },
	        body: JSON.stringify(foodInfo)
	      };
	    }
	  }, {
	    key: "sortFoods",
	    value: function sortFoods(foods) {
	      return foods.sort(function (food1, food2) {
	        if (food1.id < food2.id) {
	          return 1;
	        } else {
	          return -1;
	        }
	      });
	    }
	  }, {
	    key: "appendFoods",
	    value: function appendFoods(foods) {
	      var _this2 = this;

	      return foods.forEach(function (newFood) {
	        var food = _this2.newFoodObject(newFood);
	        food.appendFood();
	      });
	    }
	  }, {
	    key: "newFoodObject",
	    value: function newFoodObject(newFood) {
	      return new Food(newFood.id, newFood.name, newFood.calories);
	    }
	  }, {
	    key: "validateFood",
	    value: function validateFood() {
	      var $foodForm = $('.food-form');
	      var foodNameField = $foodForm.find('input[name="name"]');
	      var foodCalorieField = $foodForm.find('input[name="calories"]');
	      if (foodNameField.val() === "") {
	        $('.error:first').remove();
	        foodNameField.after('<span class="error"><br>Please enter a food name</span>');
	      } else if (foodCalorieField.val() === "") {
	        $('.error:first').remove();
	        foodCalorieField.after('<span class="error"><br>Please enter a calorie amount</span>');
	      } else {
	        var foodInfo = {
	          food: {
	            name: foodNameField.val(),
	            calories: foodCalorieField.val()
	          }
	        };
	        this.postFood(foodInfo);
	      }
	    }
	  }, {
	    key: "destroyFood",
	    value: function destroyFood(e) {
	      var _this3 = this;

	      fetch(this.baseUrl + "/" + e.target.parentNode.id, { method: "DELETE" }).then(function (response) {
	        return _this3.removeFoodFromDom(response, e);
	      }).catch(errorLog);
	    }
	  }, {
	    key: "removeFoodFromDom",
	    value: function removeFoodFromDom(response, e) {
	      if (response.ok) {
	        e.target.closest('tr').remove();
	      } else {
	        alert("Item can't be deleted due to meal association!");
	      }
	    }
	  }, {
	    key: "postFood",
	    value: function postFood(foodInfo) {
	      fetch(this.baseUrl, this.postConfig(foodInfo)).then(handleResponse).then(this.getFoods()).catch(errorLog);
	    }
	  }, {
	    key: "postConfig",
	    value: function postConfig(foodInfo) {
	      return {
	        method: 'POST',
	        headers: { 'Content-Type': "application/json" },
	        body: JSON.stringify(foodInfo)
	      };
	    }
	  }, {
	    key: "filterFoods",
	    value: function filterFoods() {
	      var filter = $('input[name="filter"]').val().toLowerCase();
	      var foods = $('.food');
	      if (filter !== "") {
	        foods.hide();
	        $.each(foods, function (index, food) {
	          if (food.innerHTML.toLowerCase().includes(filter)) {
	            $("#" + food.id).show();
	          }
	        });
	      } else {
	        foods.show();
	      }
	    }
	  }]);

	  return FoodService;
	}();

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
	    key: 'prependFood',
	    value: function prependFood() {
	      $('.foods-table tr:first').before(this.foodRow());
	    }
	  }, {
	    key: 'foodRow',
	    value: function foodRow() {
	      return '<tr class=\'food\' id=' + this.id + '>\n              <td>' + this.name + '</td>\n              <td>' + this.calories + '</td>\n              <td id="delete">delete</td>\n            </tr>';
	    }
	  }]);

	  return Food;
	}();

	module.exports = Food;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	var handleResponse = function handleResponse(response) {
	  return response.json().then(function (json) {
	    if (!response.ok) {
	      var error = {
	        status: response.status,
	        statusText: response.statusText,
	        json: json
	      };
	      return Promise.reject(error);
	    }
	    return json;
	  });
	};

	var errorLog = function errorLog(error) {
	  console.error({ error: error });
	};

	module.exports = [handleResponse, errorLog];

/***/ })
/******/ ]);