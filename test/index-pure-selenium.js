var assert = require('chai').assert
var webdriver = require('selenium-webdriver')
var test = require('selenium-webdriver/testing')
var exec = require('child_process').exec

// const timeOut = 15000

const sleep = (miliseconds) => {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

test.before(() => {
  driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build()

  driver.get('localhost:8080/foods.html')
})

test.after(() => {
  driver.quit()
})

test.describe("visit page", () => {
  test.it("Can create new food", () => {
    var foodInput = driver.findElement(webdriver.By.name('name'))
    foodInput.sendKeys('Special Brownies')

    var calorieInput = driver.findElement(webdriver.By.name('calories'))
    calorieInput.sendKeys('123')

    driver.findElement(webdriver.By.name('submit')).click()

    driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[contains(text(),'" + "Special Brownies" + "')]")))

    assert.isOk(driver.findElement(webdriver.By.xpath("//*[contains(text(),'" + "Special Brownies" + "')]")))
  })

  test.xit("Can delete food", () => {
    driver.findElement(webdriver.By.xpath("//img.delete[0]")).click()

    driver.wait(() => {
      return driver.findElement(webdriver.By.xpath("//*[contains(text(),'" + "Special Brownies" + "')]"))
        .then((element) => {return !element})
    }, 10000, "the element is still present")

    driver.findElement(webdriver.By.xpath("//*[contains(text(),'" + "Special Brownies" + "')]"))
      .then((present) => {assert.equal(present, false)})
  })

  test.xit("Can filter food", () => {
    var filter = driver.findElement(webdriver.By.name('filter'))
    filter.sendKeys('fancy')
      assert.isNotOk(driver.findElement(webdriver.By.xpath("//*[contains(text(),'" + "Bahn Mi" + "')]")))
      assert.isOk(driver.findElement(webdriver.By.xpath("//*[contains(text(),'" + "Fancy Feast" + "')]")))
  })
})
