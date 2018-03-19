class Food {
  constructor(id, name, calories) {
    this.id = id
    this.name = name
    this.calories = calories
  }
  appendFoodCheckable(table) {
    table.append(this.foodRowCheckable())
  }
  appendFoodDeletable(table) {
    table.append(this.foodRowDeletable())

  }
  prependFood() {
    $('.foods-table tr:first').before(this.foodRow())
  }
  foodRowDeletable() {
    return `<tr class='food' id=${this.id}>
              <td contentEditable>${this.name}</td>
              <td contentEditable>${this.calories}</td>
              <td id="delete">delete</td>
            </tr>`
  }
  foodRowCheckable() {
    return `<tr class='food' id='${this.id}'>
              <td><input type="checkbox" id="${this.id}"> </td>
              <td contentEditable>${this.name}</td>
              <td contentEditable>${this.calories}</td>
            </tr>`
  }
}

module.exports = Food
