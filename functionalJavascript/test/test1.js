var chai = require('chai');
var expect = chai.expect;
var getShortMessages = require('../array-filter.js');
describe('Main function', function () {
  
    it('Check funcitonality', function () {
        expect(getShortMessages(messagesTest1)).to.eqls([ 'Welcome Chai.js and Mocha.js']);
    });
    it('When no message is less than 50 characters', function () {
         expect(getShortMessages(messagesTest2)).to.eqls([]);
    });
    it('Check when input is empty',function (){
        expect(getShortMessages([])).to.eqls([]);
    });
});
describe('Input Related Testing', function () {
     
    var error = 'Input is incorrect. It is supposed to be array of objects with message property';
    it('When input is not an array of objects',function(){
        expect(getShortMessages('Hello Testing')).to.eqls(error);
    });
    
});