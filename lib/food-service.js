const Food = require("./foods")
const [handleResponse, errorLog] = require('./response-handlers')

class FoodService {
  constructor() {
    this.baseUrl = "https://qs-1710-rails.herokuapp.com/api/v1/foods",
    this.counter = 0,
    this.foods   = []
  }
  storeFoods(foods){
    this.foods = [...foods]
    return this.foods
  }
  getFoods() {
    $('.foods-table').html('<th>Name</th><th>Calories</th>')
    $('.add-foods-table').html('<th></th><th>Name</th><th>Calories</th>')
    fetch(this.baseUrl)
      .then(handleResponse)
      .then((foods) => this.storeFoods(foods))
      .then((foods) => this.sortFoods(foods))
      .then((foods) => this.appendFoods(foods))
      .catch(errorLog)
  }
  postFood(foodInfo) {
    fetch(this.baseUrl, this.postConfig(foodInfo))
      .then(handleResponse)
      .then(this.newFoodObject)
      .then((food) => food.prependFood($('.foods-table')))
      .then(this.clearFields)
      .catch(errorLog)
  }
  newFoodObject(newFood) {
    return new Food(newFood.id, newFood.name, newFood.calories)
  }
  clearFields() {
    var $foodForm = $('.food-form')
    $foodForm.find('input[name="name"]').val("")
    $foodForm.find('input[name="calories"]').val("")
    $foodForm.find('.error').remove()
  }
  postConfig(foodInfo) {
    return {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(foodInfo)
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
  appendFoods(foods) {
    return foods.forEach((newFood) => {
      let food = new Food(newFood.id, newFood.name, newFood.calories)
      food.appendFood($('.add-foods-table'), 'checkbox')
      food.appendFood($('.foods-table'), 'delete')
    })
  }
  validateFood() {
    var $foodForm = $('.food-form')
    var foodNameField = $foodForm.find('input[name="name"]')
    var foodCalorieField = $foodForm.find('input[name="calories"]')
    if (foodNameField.val() === "") {
      $('.error:first').remove()
      foodNameField.after('<span class="error">Please enter a food name</span>')
    } else if (foodCalorieField.val() === "") {
      $('.error:first').remove()
      foodCalorieField.after('<span class="error">Please enter a calorie amount</span>')
    } else {
      var foodInfo = {
        food: {
          name: foodNameField.val(),
          calories: foodCalorieField.val()
        }
      }
      this.postFood(foodInfo)
    }
  }

  validateFoodPatch(e) {
    var rowId = e.target.parentNode.id
    var $foodsRow = $(`tr#${rowId}`)
    var editFoodNameField = $foodsRow.find('td:nth-child(1)')
    var editFoodCalorieField =$foodsRow.find('td:nth-child(2)')

    if (editFoodNameField.html() === "") {
      $('.error:first').remove()
      editFoodNameField.after('<span class="error"><br>Please enter a food name</span>')
    } else if (editFoodCalorieField.html() === "") {
      $('.error:first').remove()
      editFoodCalorieField.after('<span class="error"><br>Please enter a calorie amount</span>')
    } else {
      var foodInfo = {
        food: {
          name: editFoodNameField.html(),
          calories: editFoodCalorieField.html()
        }
      }
      this.patchFood(foodInfo, e)
    }
  }
  patchFood(foodInfo, e) {
    fetch(`${this.baseUrl}/${e.target.parentNode.id}`, this.patchConfig(foodInfo))
    .then(handleResponse)
    .catch(errorLog)
  }
  patchConfig(foodInfo, e) {
    return {
      method: "PATCH",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(foodInfo)
    }
  }
  destroyFood(e) {
    fetch(`${this.baseUrl}/${e.target.parentNode.id}`, {method: "DELETE"})
    .then((response) => this.removeFoodFromDom(response, e))
    .catch(errorLog);
  }
  removeFoodFromDom(response, e) {
    if (response.ok) {
      e.target.closest('tr').remove();
    } else {
      alert("Item can't be deleted due to meal association!")
    }
  }
  filterFoods() {
    let filter = $('input[name="filter"]').val().toLowerCase()
    let foods = this.setFilterTable()
    if (filter !== "") {
      foods.hide()
      $.each(foods, (index, food) => {
        if ($(food).find('#name').html().toLowerCase().includes(filter)) {
          $(food).show()
        }
      })
    } else {
      foods.show()
    }
  }
  setFilterTable() {
    let uri = window.location.pathname
    if (uri === '/' || uri === '') {
      return $('.add-foods-table').find('.food')
    } else if (uri === '/foods.html') {
      return $('.foods-table').find('.food')
    }
  }
}

module.exports = FoodService
