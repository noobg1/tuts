function countWords(inputWords) {
    function toCount(initialDict, currentWord) {
        initialDict[currentWord] = ++initialDict[currentWord] || 1;
        return initialDict;
    }
    return inputWords.reduce(toCount, {});
}

module.exports = countWords;





