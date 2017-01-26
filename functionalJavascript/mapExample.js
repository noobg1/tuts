function doubleAll(numbers) {
    var isValid = true, result, errorMessage = 'Invalid input type';

    function toMultiply(x) {
        if (isNaN(x)) isValid = false;
        return x * 2;
    }

    if (numbers instanceof Array) {
        result = numbers.map(toMultiply);
    }
    else isValid = false;

    if (isValid) {
        return result;
    }
    else
        return errorMessage;

}

module.exports = doubleAll;