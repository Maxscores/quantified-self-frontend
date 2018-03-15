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
      .then((foods) => {
        foods.sort((food1, food2) => {
          if (food1.id < food2.id) {
            return 1
          } else {
            return -1
          }
        })
        return foods.forEach((newFood) => {
          let food = new Food(newFood.id, newFood.name, newFood.calories)
          food.appendFood()
        })
      })
      .catch(errorLog)
  }
  validateFood() {
    var $foodForm = $('.food-form')
    var foodNameField = $foodForm.find('input[name="name"]')
    var foodCalorieField = $foodForm.find('input[name="calories"]')
    if (foodNameField.val() === "") {
      foodNameField.after('<br><span class="error">Please enter a food name</span><br>')
    } else if (foodCalorieField.val() === "") {
      foodCalorieField.after('<br><span class="error">Please enter a calorie amount</span><br>')
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
