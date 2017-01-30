function toReduceUtility(wordsArray, reduceHelper, initialObject, index = 0, errorArray = []) {
  if (wordsArray.length === index) return;
  else {
    if (typeof wordsArray[index] !== 'string')
      errorArray.push(index);
    var updatedCountObject = reduceHelper(initialObject, wordsArray[index++]);
    toReduceUtility(wordsArray, reduceHelper, updatedCountObject, index, errorArray);
    return updatedCountObject;
  }
}

function toReduce(wordsArray, reduceHelper, initialObject = {}) {
  if (typeof arguments[1] !== 'function')
    return 'Expecting function as second argument given: ' +
      typeof reduceHelper;
  if (arguments[0] instanceof  Array === false)
    return 'Expecting array as first argument given: ' +
      typeof wordsArray;
  var errorArray = [], index = 0, resultObject;
  resultObject = toReduceUtility(wordsArray, reduceHelper, initialObject, index, errorArray);
  if (errorArray.length === 0)
    return resultObject;
  else return 'undefined elements at index : ' + errorArray;
}

module.exports = toReduce;




// function toReduce(wordsArray, toReduceUtility, initialCount, index = 0) {
//   console.log(''+toReduceUtility);
//   if (wordsArray.length === index) return;
//   else {
//     var updatedCount = toReduceUtility(initialCount, wordsArray[index++]);
//     toReduce(wordsArray, toReduceUtility, updatedCount, index);
//     return updatedCount;
//   }
// }

// module.exports = toReduce;

