class Food {
  constructor(id, name, calories) {
    this.id = id
    this.name = name
    this.calories = calories
  }
  appendFood() {
    $('.foods-table').append(this.foodRow())
  }
  foodRow() {
    return `<tr><td>${this.name}</td><td>${this.calories}</td><td id="delete">delete</td></tr>`
  }
}

module.exports = Food
