var person = require('./firstExample');

var king = function (name, age) {
  var func = person.bind(this);
  console.log('1', this);

  func(name,age);

  this.getDetails = function () {
    console.log(`Hi!, I am ${this.name} and I am King`);
  }
}



var king1 = new king('ram', 21);

king1.getDetails();
module.exports = king;

