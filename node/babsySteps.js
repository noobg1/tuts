var numbers = process.argv.slice(2), sum = 0, errorArray = [];
for(var iter = 0; iter < numbers.length; iter++)
  { 
    
    if(isNaN(numbers[iter]))
      { 
        errorArray.push(iter);
      }
    else sum += Number(numbers[iter]);
  }

if(errorArray.length === 0)
  console.log(sum);
else console.log( `Expecting numbers as arguments given NaN at: ${errorArray}`);