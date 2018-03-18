const Meal = require("./meals")
const Food = require('./foods')
const [handleResponse, errorLog] = require('./response-handlers')

class MealService {
  constructor() {
    this.baseUrl = "https://qs-1710-rails.herokuapp.com/api/v1/meals"
  }
  getMealFoods() {

    $('.meal-container').each((index, mealContainer) => {
      let mealId = mealContainer.id
      $(`#${mealId}`).find('table').html('<th>Name</th><th>Calories</th>')
      if (Number.isInteger(+mealId)) {
        fetch(`${this.baseUrl}/${mealId}/foods`)
          .then(handleResponse)
          .then((meal) => this.sortFoods(meal.foods))
          .then((foods) => this.appendFoods(foods, mealId))
          .catch(errorLog)
      }
    })
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
  appendFoods(foods, mealId) {
    return foods.forEach((newFood) => {
      let food = new Food(newFood.id, newFood.name, newFood.calories)
      food.appendFood($(`#${mealId}`).find('table'))
    })
  }
}

module.exports = MealService
