var chai = require('chai');
var expect = require('chai').expect;
var testMap = require('../map');

describe('Checking on map function usage taking array as input and giving array as output with each element multiplied by 2 (valid inputs)', function () {

  it('should return array with each value multiplied by 2', function () {
    expect(testMap([2, 3, 4, 5])).to.eqls([4, 6, 8, 10]);
  });
  it('should return array with each value multiplied by 2 with string number as input', function () {
    expect(testMap(['2', '3', '4', '5'])).to.eqls([4, 6, 8, 10]);
  });
  it('should be twice the array value with elements being string numbers with some input being string number', function () {
    expect(testMap(['2', '3', '4', 5])).to.eqls([4, 6, 8, 10]);
  });
  it('should return empty array on given empty array input', function () {
    expect(testMap([])).to.eqls([]);
  });

});

describe('Checking on map function usage taking array as input and giving array as output with each element multiplied by 2 (invalid inputs)', function () {

  it('should throw error message on given one of the element being not a number', function () {
    expect(testMap(['2', '3', '4', 'fgddfg'])).to.eqls('Invalid input type');
  });
  it('should throw error message for non array input (object)', function () {
    expect(testMap({})).to.eqls('Invalid input type');
  });
  it('should throw error message for non array input (object)', function () {
    expect(testMap({ id: '1' })).to.eqls('Invalid input type');
  });
  it('should throw error message for non array input (string)', function () {
    expect(testMap('random string')).to.eqls('Invalid input type');
  });
  it('should throw error message for non input/ no arguments', function () {
    expect(testMap()).to.eqls('Invalid input type');
  });
  it('should throw error message for null input', function () {
    expect(testMap(null)).to.eqls('Invalid input type');
  });

});

