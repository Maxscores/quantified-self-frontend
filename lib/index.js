// const Food = require("./foods").Food
const FoodService = require("./food-service")
const MealService = require("./meal-service")

let baseUrl

if (window.isTestEnvironment) {
  baseUrl = "https://qs-1710-test.herokuapp.com"
} else {
  baseUrl = "https://qs-1710-rails.herokuapp.com"
}

const foodService = new FoodService(baseUrl)
const mealService = new MealService(baseUrl)

foodService.getFoods()
mealService.getMealFoods()

$('#meal-type').on('click', (e) => {
  e.preventDefault();
  let mealId = e.target.dataset.id
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

$('input[name="filter"]').on('input', () => {
  foodService.filterFoods()
})

$('.title').on('click', (e) => {
  $(e.target).siblings('.hidden').first().slideToggle()
})

$('.title').on('keydown', (e) => {
  if (e.keyCode === 13) {
    $(e.target).siblings('.hidden').first().slideToggle()
  }
})
