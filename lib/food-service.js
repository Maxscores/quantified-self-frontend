const Food = require("./foods")
const [handleResponse, errorLog] = require('./response-handlers')

class FoodService {
  constructor() {
    this.baseUrl = "https://qs-1710-js.herokuapp.com/api/v1/foods",
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
      .then((foods) => this.sortFoods(foods, "id"))
      .then((foods) => this.storeFoods(foods))
      .then((foods) => this.appendFoods(foods))
      .catch(errorLog)
  }
  postFood(foodInfo) {
    fetch(this.baseUrl, this.postConfig(foodInfo))
      .then(handleResponse)
      .then(this.newFoodObject)
      .then((food) => food.prependFood($('.foods-table'), 'edit'))
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
  sortFoods(foods, attribute) {
    return foods.sort((food1, food2) => {
      if (this.sortMethod(food1, food2, attribute)) {
        return 1
      } else {
        return -1
      }
    })
  }
  sortMethod(food1, food2, attribute) {
    if (attribute === "id") {
      return food1.id < food2.id
    } else if (attribute === "calAsc") {
      return food1.calories < food2.calories
    } else if (attribute === "calDesc") {
      return food1.calories > food2.calories
    }
  }
  appendFoods(foods) {
    return foods.forEach((newFood) => {
      let food = new Food(newFood.id, newFood.name, newFood.calories)
      food.appendFood($('.add-foods-table'), 'checkbox')
      food.appendFood($('.foods-table'), 'edit')
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
    var rowId = e.target.parentNode.dataset.id
    var $foodsRow = $(`tr[data-id=${rowId}]`)
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
      this.patchFood(foodInfo, rowId)
    }
  }
  patchFood(foodInfo, rowId) {
    fetch(`${this.baseUrl}/${rowId}`, this.patchConfig(foodInfo))
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
    fetch(`${this.baseUrl}/${e.target.parentNode.parentNode.dataset.id}`, {method: "DELETE"})
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
        if ($(food).find('[data-id="name"]').html().toLowerCase().includes(filter)) {
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
  sortCalories() {
    let foods = this.foods
    if (this.counter === 0 ) {
      foods = this.sortFoods(foods, "calAsc")
      this.counter++
    }
    else if (this.counter === 1) {
      foods = this.sortFoods(foods, "calDesc")
      this.counter++
    }
    else if (this.counter === 2) {
      foods = this.sortFoods(foods, "id")
      this.counter = 0
    }
  $(".foods-table").find("tr").remove()
  this.appendFoods(foods)
  }
}

module.exports = FoodService
