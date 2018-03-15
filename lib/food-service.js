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
  var form_data = $(this).serialize();

  $.post( post_url, form_data, function(response){
    $("#server_results").html( response )
  })
})

// module.exports = {Food:Food, getFoods:getFoods}
module.exports = FoodService
