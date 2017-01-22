function arrayMapping(inputArray, operationFunction) {
    
    var arrayElements = [];
    function utility(element,curr, index, arr) {
        arrayElements.push(operationFunction(curr));
    }
    inputArray.reduce(utility,[]);
    return arrayElements;
}

module.exports = arrayMapping;