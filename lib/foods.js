class Food {
  constructor(id, name, calories) {
    this.id = +id
    this.name = name
    this.calories = +calories
  }
  appendFood(table, type) {
    if (type === 'delete') {
      table.append(this.foodRowDeletable())
    } else if (type === 'checkbox') {
      table.append(this.foodRowCheckable())
    }
  }
  prependFood(table) {
    table.find('tr:first').before(this.foodRowDeletable())
  }
  foodRowDeletable() {
    return `<tr class='food' id=${this.id}>
              <td id="name" contentEditable>${this.name}</td>
              <td id="calories" contentEditable>${this.calories}</td>
              <td id="delete">delete</td>
            </tr>`
  }
  foodRowCheckable() {
    return `<tr class='food' id='${this.id}'>
              <td><input type="checkbox" id="${this.id}"> </td>
              <td id="name" contentEditable>${this.name}</td>
              <td id="calories" contentEditable>${this.calories}</td>
            </tr>`
  }
}
  
module.exports = Food
