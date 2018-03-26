const Nightmare = require('nightmare')
const assert = require('chai').assert

describe("visit index page", function() {
  this.timeout(10000)
  it("Can see totals table", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/")
      .wait("#totals > tr")
      .end()
      .exists("#totals > tr")
      .then((exists) => {
        assert.isOk(exists)
      })
      .then(done)
      .catch(done)
  })

  it("Can click on breakfast to see foods", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/")
      .wait("#totals > tr")
      .click("#breakfast-title")
      .wait("tr.food")
      .end()
      .visible("#breakfast > table > tr.food")
      .then((visible) => {
        assert.isOk(visible)
      })
      .then(done)
      .catch(done)
  })

  it("Can click on lunch to see foods", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/")
      .wait("#totals > tr")
      .click("#lunch-title")
      .wait("tr.food")
      .end()
      .visible("#lunch > table > tr.food")
      .then((visible) => {
        assert.isOk(visible)
      })
      .then(done)
      .catch(done)
  })

  it("Can click on dinner to see foods", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/")
      .wait("#totals > tr")
      .click("#dinner-title")
      .wait("tr.food")
      .end()
      .visible("#dinner > table > tr.food")
      .then((visible) => {
        assert.isOk(visible)
      })
      .then(done)
      .catch(done)
  })

  it("Can click on snack to see foods", done => {
    let nightmare = Nightmare({ show: true })
    nightmare
      .goto("http://localhost:8080/")
      .wait("#totals > tr")
      .click("#snack-title")
      .wait("tr.food")
      .end()
      .visible("#snack > table > tr.food")
      .then((visible) => {
        assert.isOk(visible)
      })
      .then(done)
      .catch(done)
  })
})
