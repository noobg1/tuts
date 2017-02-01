var person = function(name, age) {
  console.log('2', this, name, age);
  this.name = name;
  this.age = age;
  this.getDetails = function (){
     console.log(`Hi!, I am ${this.name}, my age ${this.age}`);
  }
}

module.exports = person;