var chai = require('chai');
var expect = require('chai').expect;
var testMap = require('../mapTest');

describe('Check on map function usage taking array as output and giving array with each elemenst multiplied by 2', function () {
  it('should return empty array', function () {
    expect(testMap([])).to.eqls([]);
  });
  it('should be twice the array value', function () {
    expect(testMap([2, 3, 4, 5])).to.eqls([4, 6, 8, 10]);
  });
  it('should be twice the array value with elements being string numbers', function () {
    expect(testMap(['2', '3', '4', '5'])).to.eqls([4, 6, 8, 10]);
  });
  it('should be twice the array value with elements being string numbers', function () {
    expect(testMap(['2', '3', '4', 5])).to.eqls([4, 6, 8, 10]);
  });
  it('should throw Invalid input', function () {
    expect(testMap(['2', '3', '4', 'fgddfg'])).to.eqls('Invalid input type');
  });
  it('should throw Invalid input for non array', function () {
    expect(testMap({})).to.eqls(undefined);
  });
  it('should throw Invalid input for non array', function () {
    expect(testMap({ id: '1' })).to.eqls(undefined);
  });
  it('should throw Invalid input for non array', function () {
    expect(testMap('random string')).to.eqls(undefined);
  });
});

