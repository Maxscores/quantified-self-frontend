const Food = require("./foods")

class FoodService {
  constructor() {
    this.baseUrl = "https://qs-1710-rails.herokuapp.com"
  }
  getFoods() {
    fetch(`${this.baseUrl}/api/v1/foods`)
      .then((response) => response.json())
      .then((foods) => {
        return foods.forEach((newFood) => {
          let food = new Food(newFood.id, newFood.name, newFood.calories)
          food.appendFood()
        })
      })
      .catch((error) => console.error(error))
  }
}

// module.exports = {Food:Food, getFoods:getFoods}
module.exports = FoodService
