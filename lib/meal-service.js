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
    for (var i = 0; i < meals.length; i++) {
      $(`#${meals[i].name.toLowerCase()}`).find('table').html('<th>Name</th><th>Calories</th>')
      let foods = this.sortFoods(meals[i].foods)
      this.appendFoods(foods, meals[i].name)
      this.appendMealTotalCal(foods, meals[i].name)
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
}

module.exports = MealService
