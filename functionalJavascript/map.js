function doubleAll(numbers) {

    function toMultiply(x)
    {
        return x * 2;
    }
    return numbers.map(toMultiply);
      
}

module.exports = doubleAll;