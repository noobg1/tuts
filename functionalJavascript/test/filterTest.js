var chai = require('chai');
var expect = chai.expect;
var getShortMessages = require('../filter.js');

describe('getShortMessages function takes input as an array of objects with message property and returns an array with messages having character length less than 50', function () {
   var messagesTest1 = [
       {
           message: 'Welcome Chai.js and Mocha.js'
       },
       {
           message: 'Hello, I am new to javascript and it is a great language. I am enjoying learning it.'
       }
   ];
   var messagesTest2 = [
       {
           message: 'Welcome Chai.js and Mocha.js. These are the testing frameworks'
       },
       {
           message: 'Hello, I am new to javascript and it is a great language. I am enjoying learning it.'
       }
   ];

   it('should return an array with a string', function () {
       expect(getShortMessages(messagesTest1)).to.eqls(['Welcome Chai.js and Mocha.js']);
   });

   it('should return an empty array since no message in the array of objects is less than 50 characters', function () {
       expect(getShortMessages(messagesTest2)).to.eqls([]);
   });

   it('should return an empty array when empty array of objects is passed', function () {
       expect(getShortMessages([])).to.eqls([]);
   });

});

describe('getShortMessages function gets incorrect input and returns an error mesasge', function () {

   var errorMessage = 'Incorrect input.Array does not have message property';

   var messagesTest1 = [
       {
           key1: 'Welcome Chai.js and Mocha.js'
       },
       {
           key2: 'Hello, I am new to javascript and it is a great language. I am enjoying learning it.'
       }
   ];

   it('should return an error message when input is a string but not an array of objects', function () {
       expect(getShortMessages('Hello Testing')).to.eqls(errorMessage);
   });

   it('should return an error message when input is an object but not an array of objects', function () {
       expect(getShortMessages({})).to.eqls(errorMessage);
   });
   //console.log(getShortMessages(messagesTest1));
   it('should return an error message when input is an array of object without message property', function () {
       expect(getShortMessages(messagesTest1)).to.equal(errorMessage);
   });
});