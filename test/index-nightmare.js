const Nightmare = require('nightmare')
const assert = require('chai').assert

describe("visit food page", function() {
  this.timeout(10000)
  it("Can create new food", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/foods.html")
      .type("input#name", "Special Brownies")
      .type("input#calories", "420")
      .click("input#submit")
      .wait(2000)
      .end(done)
      .catch(done)
  })

  it("gives error if name is not inputted", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/foods.html")
      .click("input#submit")
      .wait(".error")
      .end(done)
      .catch(done)
  })

  it("gives error if calories is not inputted", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/foods.html")
      .type("input#name", "Special Brownies")
      .click("input#submit")
      .wait(".error")
      .end(done)
      .catch(done)
  })

  it("Can delete a food", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/foods.html")
      .wait(".delete")
      .click(".delete:nth-of-type(1)")
      .wait(1000)
      .exists("tr[data-name='special brownies']")
      .then((exists) => {
        assert.isOk(exists)
      })
      .then(done)
      .catch(done)
  })
})
