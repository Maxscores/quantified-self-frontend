const Food = require('./foods')
const [handleResponse, errorLog] = require('./response-handlers')

class MealService {
  constructor() {
    this.baseUrl = "https://qs-1710-rails.herokuapp.com/api/v1/meals"
  }
  getMealFoods() {
    fetch(this.baseUrl)
      .then(handleResponse)
      .then((meals) => (this.addMeals(meals)))
      .catch(errorLog)
  }
  addMeals(meals) {
    var dailyCalories = this.calculateTotalCal(meals);
    for (var i = 0; i < meals.length; i++) {
      $(`#${meals[i].name.toLowerCase()}`).find('table').html('<th>Name</th><th>Calories</th>')
      let foods = this.sortFoods(meals[i].foods)
      this.appendFoods(foods, meals[i].name)
      this.appendMealTotalCal(foods, meals[i].name)
    }
    this.appendTotalsTable(dailyCalories);
  }
  postFoodsToMeal(mealId, mealName) {
    let foods = $('.add-foods-table').find('input:checked')
    for (var i = 0; i < foods.length; i++) {
      let $food = $(foods[i]).parent().parent()
      fetch(`${this.baseUrl}/${mealId}/foods/${$food.attr('id')}`, this.postFoodToMealConfig())
        .then(handleResponse)
        .then((response) => (this.appendFoodToMeal($food, mealName)))
        .catch(errorLog)
    }
  }
  deleteFoodFromMeal(e) {
    let mealId = e.target.parentNode.parentNode.id
    let foodId = e.target.parentNode.id
    fetch(`${this.baseUrl}/${mealId}/foods/${foodId}`, {method: "DELETE"})
      .then((response) => this.removeFoodRow(e))
      .catch(errorLog)
  }
  removeFoodRow(e) {
    e.target.parentNode.remove()
  }
  appendFoodToMeal($food, mealName) {
    let foodId = $food.attr('id')
    let foodName = $food.find('#name').html()
    let foodCalories = $food.find('#calories').html()
    let food = new Food(foodId, foodName, foodCalories)
    food.prependFood($(`#${mealName.toLowerCase()}`).find('table'))
  }
  postFoodToMealConfig() {
    return {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
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
  appendFoods(foods, mealName) {
    return foods.forEach((newFood) => {
      let food = new Food(newFood.id, newFood.name, newFood.calories)
      food.appendFood($(`#${mealName.toLowerCase()}`).find('table'), 'delete')
    })
  }
  appendMealTotalCal(foods , meal){
    var total_cal = 0
    foods.forEach((food) => {
      total_cal += food.calories
    })
    this.appendCalorieRows($(`#${meal.toLowerCase()}`).find('table'), total_cal, meal)
  }
  appendCalorieRows(table, total_cal, meal){
    table.append(this.totalCalRow(total_cal))
    table.append(this.remainingCaloriesRow(total_cal, meal))
  }
  totalCalRow(total_cal){
    return `<tr class=meal_total>
              <td class="total_cal_label">Total Calories:</td>
              <td class="total_calories">${total_cal}</td>
            </tr>`
  }
  remainingCaloriesRow(total_cal,meal) {
    if (meal === "Snack"){
      let goal = 200;
      if (goal - total_cal < 0) {
        return `<tr class="remaining_cals">
        <td>Calories Remaining:</td>
        <td class="negative-cal">${goal - total_cal}</td>
        </tr>`
      } else if (goal - total_cal > 0) {
        return `<tr class="remaining_cals">
        <td>Calories Remaining:</td>
        <td class="positive-cal">${goal - total_cal}</td>
        </tr>`
      }
    }
    else if (meal === "Breakfast"){
      let goal = 400;
      if (goal - total_cal < 0) {
        return `<tr class='remaining_cals'>
        <td>Calories Remaining:</td>
        <td class="negative-cal">${goal - total_cal}</td>
        </tr>`
      } else if (goal - total_cal > 0) {
        return `<tr class=remaining_cals>
        <td>Calories Remaining:</td>
        <td class="positive-cal">${goal - total_cal}</td>
        </tr>`
      }
    }
    else if (meal === "Lunch"){
      let goal = 600;
      if (goal - total_cal < 0) {
        return `<tr class='remaining_cals'>
        <td>Calories Remaining:</td>
        <td class="negative-cal">${goal - total_cal}</td>
        </tr>`
      } else if (goal - total_cal > 0) {
        return `<tr class='remaining_cals'>
        <td>Calories Remaining:</td>
        <td class="positive-cal">${goal - total_cal}</td>
        </tr>`
      }
    }
    else if (meal === "Dinner"){
      let goal = 800;
      if (goal - total_cal < 0) {
        return `<tr class='remaining_cals'>
        <td>Calories Remaining:</td>
        <td class="negative-cal">${goal - total_cal}</td>
        </tr>`
      } else if (goal - total_cal > 0) {
        return `<tr class="remaining_cals">
        <td>Calories Remaining:</td>
        <td class="positive-cal">${goal - total_cal}</td>
        </tr>`
      }
    }
  }
  appendTotalsTable(dailyCalories){
    $("#totals")
    .append(this.getTotalGoalCalRow())
    .append(this.getCalorieConsumedRow(dailyCalories))
    .append(this.getRemainingCaloriesRow(dailyCalories))
  }
  getTotalGoalCalRow(){
    return `<tr>
              <td>Goal Calories</td>
              <td id="goal-caalories">2000</td>
            </tr>`
  }
  getCalorieConsumedRow(dailyCalories){
    return `<tr>
              <td>Calories Consumed</td>
              <td id="calories-consumed">${dailyCalories}</td>
            </tr>`
  }
  getRemainingCaloriesRow(dailyCalories){
    if (2000 - dailyCalories > 0) {
      return `<tr>
      <td>Remaining Calories</td>
      <td class="positive-cal">${2000 - dailyCalories}</td></tr>`
    } else if ( 2000 - dailyCalories < 0) {
      return `<tr>
      <td>Remaining Calories</td>
      <td class="negative-cal">${2000 - dailyCalories}</td></tr>`
    }
  }
  calculateTotalCal(meals){
    var dailyTotal = 0
    for (var i = 0; i < meals.length; i++) {
      let mealTotal = 0
      meals[i].foods.forEach((food) => {
        mealTotal += food.calories;
      })
      dailyTotal += mealTotal;
    }
    return dailyTotal;
  }
}

module.exports = MealService
