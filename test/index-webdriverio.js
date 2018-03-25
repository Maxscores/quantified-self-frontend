var assert = require('chai').assert
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);
