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
      .wait("tr[data-name='special-brownies']")
      .end()
      .exists("tr[data-name='special-brownies']")
      .then((exists) => {
        assert.isOk(exists)
      })
      .then(done)
      .catch(done)
  })

  it("gives error if name is not inputted", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/foods.html")
      .click("input#submit")
      .wait(".error")
      .end()
      .exists(".error")
      .then((exists) => {
        assert.isOk(exists)
      })
      .then(done)
      .catch(done)
  })

  it("gives error if calories is not inputted", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/foods.html")
      .type("input#name", "Special Brownies")
      .click("input#submit")
      .wait(".error")
      .end()
      .exists(".error")
      .then((exists) => {
        assert.isOk(exists)
      })
      .then(done)
      .catch(done)
  })

  it("Can delete a food", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/foods.html")
      .wait(".delete")
      .click(".delete:nth-of-type(1)")
      .wait(500)
      .end()
      .exists("tr[data-name='special-brownies']")
      .then((exists) => {
        assert.isNotOk(exists)
      })
      .then(done)
      .catch(done)
  })

  it("Can filter foods by B and grapes aren't visible", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/foods.html")
      .wait(".food")
      .type("input#filter", "B")
      .wait(500)
      .end()
      .visible("tr[data-name='grapes']")
      .then((visible) => {
        assert.isNotOk(visible)
      })
      .then(done)
      .catch(done)
  })

  it("Can filter foods by B and banana is visible", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/foods.html")
      .wait(".food")
      .type("input#filter", "B")
      .wait(500)
      .end()
      .visible("tr[data-name='banana']")
      .then((visible) => {
        assert.isOk(visible)
      })
      .then(done)
      .catch(done)
  })
})
