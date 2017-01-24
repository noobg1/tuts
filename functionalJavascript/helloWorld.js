function upperCaser(inputString)
{   if('string' === typeof inputString)
        return inputString.toUpperCase();
    else 'Invalid input';
}

module.exports = upperCaser;