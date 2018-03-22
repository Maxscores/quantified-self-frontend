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

$('.meal-container').on('click', (e) => {
  if (e.target.className.includes("delete")) {
    e.preventDefault()
    mealService.deleteFoodFromMeal(e)
  }
})

$(".food-form").on('submit', (e) => {
  e.preventDefault();
  foodService.validateFood()
})

$(".foods-table").on('click', (e) => {
  if (e.target.className.includes("delete")) {
    e.preventDefault();
    foodService.destroyFood(e)
  } else if (e.target.innerHTML === "Calories") {
      e.preventDefault();
      foodService.sortCalories()
  }
})

$(".foods-table").on("focusout", (e) => {
  if (!e.target.className.includes("delete")) {
    foodService.validateFoodPatch(e);
  }
})

$('input[name="filter"]').on('keyup', () => {
  foodService.filterFoods()
})
