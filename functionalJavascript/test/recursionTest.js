var chai = require('chai');
var expect = chai.expect;
var testFunction = require('../recursion.js');
var reduceHelper = function (prev, curr) {
    prev[curr] = ++prev[curr] || 1;
    return prev;
    }

describe('#positive cases : toReduce function takes (String array, helper function for reduce operation, initial value object) as arguments and ', function(){
  
  it('should return reduced object for string array',function(){
    var inputWordArray = ['qwerty', 'blah', 'non', 'qwerty', 'blah'] ;//,'',''];
    var initialObject = {};
    var outputObject = { qwerty: 2, blah: 2, non: 1};
    expect(testFunction(inputWordArray, reduceHelper,initialObject)).to.eqls(outputObject);

  });

  it('should return reduced object for string array with empty string',function(){
    var inputWordArray = ['qwerty', 'blah', 'non', 'qwerty', 'blah','',''];
    var initialObject = {};
    var outputObject = { qwerty: 2, blah: 2, non: 1,'': 2};
    expect(testFunction(inputWordArray, reduceHelper,initialObject)).to.eqls(outputObject);
  });

  it('should return reduced object even for string array with empty elements',function(){
    var inputWordArray = ['qwerty', 'blah', 'non', 'qwerty', 'blah',''];
    var initialObject = {};
    var outputObject = { qwerty: 2, blah: 2, non: 1,'': 1};
    expect(testFunction(inputWordArray, reduceHelper,initialObject)).to.eqls(outputObject);

  });

  it('should return reduced object even for non empty initialObject',function(){
    var inputWordArray = ['qwerty', 'blah', 'non', 'qwerty', 'blah',''];
    var initialObject = {pre: 2, inb: 'fn'};
    var outputObject = { pre: 2, inb: 'fn', qwerty: 2, blah: 2, non: 1,'': 1};
    expect(testFunction(inputWordArray, reduceHelper,initialObject)).to.eqls(outputObject);

  });

  it('should return reduced object for string array with same element semantics but different case(Upper/ Lower)',function(){
    var inputWordArray = ['qwerty', 'QWERTY', 'non', 'qwerty', 'blah'] ;//,'',''];
    var initialObject = {};
    var outputObject = { qwerty: 2, QWERTY: 1, blah: 1, non: 1};
    expect(testFunction(inputWordArray, reduceHelper,initialObject)).to.eqls(outputObject);

  });

  it('should return reduced object for string array with skipping initialObject object argument',function(){
    var inputWordArray = ['qwerty', 'QWERTY', 'non', 'qwerty', 'blah'] ;//,'',''];
    var initialObject = {};
    var outputObject = { qwerty: 2, QWERTY: 1, blah: 1, non: 1};
    expect(testFunction(inputWordArray, reduceHelper)).to.eqls(outputObject);

  });
  

});

describe('#negative cases :toReduce function takes (String array, helper function for reduce operation, initial value object) as arguments and ',function(){

  it('should return error indices  for non string array elements',function(){
    var inputWordArray = [123, 'blah', 'non', 'qwerty', 'blah', '', {}];
    var initialObject = {};
    //var outputObject = { qwerty: 2, blah: 2, non: 1,'': 1, undefined: 1};
    
    expect(testFunction(inputWordArray, reduceHelper,initialObject)).to.eqls('undefined elements at index : 0,6');
  });

  it('should return error indices  for non string array elements',function(){
    var inputWordArray = ['123', 'blah', , 'qwerty', , '', {}];
    var initialObject = {};
    //var outputObject = { qwerty: 2, blah: 2, non: 1,'': 1, undefined: 1};
    
    expect(testFunction(inputWordArray, reduceHelper,initialObject)).to.eqls('undefined elements at index : 2,4,6');
  });

  it('should return error message for non function second argument',function(){
    var inputWordArray = ['123', 'blah', , 'qwerty', , '', {}];
    var initialObject = {};
    //var outputObject = { qwerty: 2, blah: 2, non: 1,'': 1, undefined: 1};
    
    expect(testFunction(inputWordArray, {},initialObject)).to.eqls('Expecting function as second argument given: object');
  });

  it('should return error message for non function second argument',function(){
    var inputWordArray = ['123', 'blah', , 'qwerty', , '', {}];
    var initialObject = {};
    //var outputObject = { qwerty: 2, blah: 2, non: 1,'': 1, undefined: 1};
    
    expect(testFunction(inputWordArray, [2,3,4],initialObject)).to.eqls('Expecting function as second argument given: object');
  });

});