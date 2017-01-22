function repeat(operation, num) {

    for(var iter = 0; iter < num ; iter++)
        {
            operation();
        } 
      
}

module.exports = repeat;