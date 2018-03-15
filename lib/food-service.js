const Food = require("./foods")
const [handleResponse, errorLog] = require('./response-handlers')

class FoodService {
  constructor() {
    this.baseUrl = "https://qs-1710-rails.herokuapp.com/api/v1/foods"
  }
  getFoods() {
    $('.foods-table').html('<th>Name</th><th>Calories</th>')
    fetch(this.baseUrl)
      .then(handleResponse)
      .then((foods) => this.sortFoods(foods))
      .then((foods) => this.appendFoods(foods))
      .catch(errorLog)
  }
  postFood(foodInfo) {
    fetch(this.baseUrl, this.postConfig(foodInfo))
      .then(handleResponse)
      .then(this.newFoodObject)
      .then((food) => food.prependFood())
      .then(this.clearFields)
      .catch(errorLog)
  }
  postConfig(foodInfo) {
    return {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(foodInfo)
    }
  }
  sortFoods(foods) {
    return foods.sort((food1, food2) => {
      if (food1.id < food2.id) {
        return 1
      } else {
        return -1
      }
    })
  }
  appendFoods(foods) {
    return foods.forEach((newFood) => {
      let food = this.newFoodObject(newFood)
      food.appendFood()
    })
  }
  newFoodObject(newFood) {
    return new Food(newFood.id, newFood.name, newFood.calories)
  }
  validateFood() {
    var $foodForm = $('.food-form')
    var foodNameField = $foodForm.find('input[name="name"]')
    var foodCalorieField = $foodForm.find('input[name="calories"]')
    if (foodNameField.val() === "") {
      $('.error:first').remove()
      foodNameField.after('<span class="error"><br>Please enter a food name</span>')
    } else if (foodCalorieField.val() === "") {
      $('.error:first').remove()
      foodCalorieField.after('<span class="error"><br>Please enter a calorie amount</span>')
    } else {
      var foodInfo = {
        food: {
          name: foodNameField.val(),
          calories: foodCalorieField.val()
        }
      }
      this.postFood(foodInfo)
    }
  }
  destroyFood(e) {
    fetch(`${this.baseUrl}/${e.target.parentNode.id}`, {method: "DELETE"})
    .then((response) => this.removeFoodFromDom(response, e))
    .catch(errorLog);
  }
  removeFoodFromDom(response, e) {
    if (response.ok) {
      e.target.closest('tr').remove();
    } else {
      alert("Item can't be deleted due to meal association!")
    }
  }
  postFood(foodInfo) {
    fetch(this.baseUrl, this.postConfig(foodInfo))
      .then(handleResponse)
      .then(this.getFoods())
      .catch(errorLog)
  }
  postConfig(foodInfo) {
    return {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(foodInfo)
    }
  }
}



// module.exports = {Food:Food, getFoods:getFoods}
module.exports = FoodService
