// const Food = require("./foods").Food
const FoodService = require("./food-service")

const foodService = new FoodService

foodService.getFoods()

$(".food-form").on('submit', (e) => {
  e.preventDefault();
  foodService.validateFood()
})

$('input[name="filter"]').on('keyup', () => {
  let filter = $('input[name="filter"]').val()
  let foods = $('.food')
  if (filter !== "") {
    foods.hide()
    $.each(foods, (index, food) => {
      if (food.innerHTML.includes(filter)) {
        $(`#${food.id}`).show()
      }
    })
  } else {
    foods.show()
  }
})
