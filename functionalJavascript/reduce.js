function countWords(inputWords) {
    var reducedDict = {};
    function toInit(inputWord) {
        reducedDict[inputWord] = 0;
    }
    function toCount(inputWord) {
        reducedDict[inputWord]++;
    }

    inputWords.map(toInit);
    inputWords.map(toCount);
    return reducedDict;

}

module.exports = countWords;

// function countWords(arr) {
//       return arr.reduce(function(countMap, word) {
//         countMap[word] = ++countMap[word] || 1 // increment or initialize to 1
//         return countMap
//       }, {}) // second argument to reduce initialises countMap to {}
//     }

//     module.exports = countWords