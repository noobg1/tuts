var numbersToFilter = [1,2,3,4,5,6,7,8,9,10];
var filteredNumber = numbersToFilter.filter(evenNumbers);

function evenNumbers(number)
{
    return number % 2 == 0;
}

console.log(filteredNumber);
