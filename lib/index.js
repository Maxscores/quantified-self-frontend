// const Food = require("./foods").Food
const FoodService = require("./food-service")

const foodService = new FoodService

foodService.getFoods()

$(".food-form").on('submit', (e) => {
  e.preventDefault();
  foodService.validateFood()
})
