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

$(".food-form").on('submit', function(e){
  e.preventDefault();
  var postUrl = $(this).attr("action");
  var requestMethod = $(this).attr("method");
  var formData = $(this).serialize();
  var foodNameField = $(this).find('input[name="food[name]"]')
  var foodCalorieField = $(this).find('input[name="food[calories]"]')
  if (foodNameField.val() === "") {
    foodNameField.after('<br><span class="error">Please enter a food name</span><br>')
  } else if (foodCalorieField.val() === "") {
    foodCalorieField.after('<br><span class="error">Please enter a calorie amount</span><br>')
  } else {
    $.ajax({
      url: postUrl,
      type: requestMethod,
      data: formData
    }).done(function(response){
      $("#server-results").html(response)
    })
  }

})

// module.exports = {Food:Food, getFoods:getFoods}
module.exports = FoodService
