function getAverage(...numbers)
{
  var result = 0;
        numbers.forEach(function (value) {
            result += value;
        });
        if(!numbers.length)
          return 0;
        return result/numbers.length;
}

module.exports = getAverage;