class Food {
  constructor(id, name, calories) {
    this.id = id
    this.name = name
    this.calories = calories
  }
}

const baseUrl = "https://qs-1710-rails.herokuapp.com"


const getFoods = () => {
  fetch(`${baseUrl}/api/v1/foods`)
    .then((response) => response.json())
    .then((foods) => {
      return foods.forEach((food) => {
        console.log(food)
      })
    })
    .catch((error) => console.error(error))
  }

// module.exports = {Food:Food, getFoods:getFoods}
module.exports = getFoods
