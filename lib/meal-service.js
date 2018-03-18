const Food = require('./foods')
const [handleResponse, errorLog] = require('./response-handlers')

class MealService {
  constructor() {
    this.baseUrl = "https://qs-1710-rails.herokuapp.com/api/v1/meals"
  }
  getMealFoods() {
    fetch(this.baseUrl)
      .then(handleResponse)
      .then((meals) => (this.addMeals(meals)))
      .catch(errorLog)
  }
  addMeals(meals) {
    console.log(meals)
    for (var i = 0; i < meals.length; i++) {
      $(`#${meals[i].name.toLowerCase()}`).find('table').html('<th>Name</th><th>Calories</th>')
      let foods = this.sortFoods(meals[i].foods)
      this.appendFoods(foods, meals[i].name)
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
  appendFoods(foods, mealName) {
    return foods.forEach((newFood) => {
      let food = new Food(newFood.id, newFood.name, newFood.calories)
      food.appendFood($(`#${mealName.toLowerCase()}`).find('table'))
    })
  }
}

module.exports = MealService
