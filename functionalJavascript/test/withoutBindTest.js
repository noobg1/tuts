var chai = require('chai');
var expect = chai.expect;
var testFunction = require('../withoutBind');
var slice = Array.prototype.slice;

describe('#positive cases: logger takes namespace as arguments and ', function (){

  it('should return a function which ', function (){
    var namespace = 'INFO:'; 
    var logger = testFunction(namespace);
    expect(logger).to.be.a('function');
  });

  it('should return a function which consolelogs namespace with appended arguments', function (){
    var namespace = 'INFO:'; 
    var logger = testFunction(namespace);
    expect( logger('a','b') ).to.eqls(console.log('INFO: a b'));
  });

  it('should return a function which consolelogs namespace when there are no arguments', function (){
    var namespace = 'INFO:'; 
    var logger = testFunction(namespace);
    expect( logger() ).to.eqls(console.log());
  });

  it('should return a function which consolelogs arguments when no namepsace is passed', function (){
    var namespace = 'INFO:'; 
    var logger = testFunction();
    expect( logger('a','b') ).to.eqls(console.log('a','b'));
  });

  it('should return a function which consolelogs arguments when  namepsace is empty', function (){
    var namespace = ''; 
    var logger = testFunction(namespace);
    expect( logger('a','b') ).to.eqls(console.log('a','b'));
  });

  it('should return a function which consolelogs arguments when  namepsace is empty', function (){
    var namespace = 'WARN:'; 
    var logger = testFunction(namespace);
    expect( logger('sdfdgfd') ).to.be.equal(console.log('a','b'));
  });

});
