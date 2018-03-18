// const Food = require("./foods").Food
const FoodService = require("./food-service")
const MealService = require("./meal-service")

const foodService = new FoodService
const mealService = new MealService

foodService.getFoods()
mealService.getMealFoods()

$('#meal-type').on('click', (e) => {
  e.preventDefault();
  let mealId = e.target.id
  let mealName = e.target.value.toLowerCase()
  mealService.postFoodsToMeal(mealId, mealName)
})

$(".food-form").on('submit', (e) => {
  e.preventDefault();
  foodService.validateFood()
})

$(".foods-table").on('click', (e) => {
  e.preventDefault();
  if (e.target.id === "delete") {
    foodService.destroyFood(e)
  }
})

$(".foods-table").on("focusout", (e) => {
  foodService.validateFoodPatch(e);
})

$('input[name="filter"]').on('keyup', () => {
  foodService.filterFoods()
})
