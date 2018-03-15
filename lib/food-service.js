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
  var post_url = $(this).attr("action");
  var request_method = $(this).attr("method");
  var form_data = $(this).serialize();

  $.ajax({
    url: post_url,
    type: request_method,
    data: form_data
  }).done(function(response){
    $("#server-results").html(response)
  })
})

// module.exports = {Food:Food, getFoods:getFoods}
module.exports = FoodService
