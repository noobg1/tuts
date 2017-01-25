function repeat(operation, num) {
    // Modify this so it doesn't cause a stack overflow!
    if (num <= 0) return
    //setTimeout(operation, 50);
    operation();
    return repeat(operation, --num)
}

function trampoline(fn,operation, num) {
    
    setTimeout( repeat, 50, operation,num);
    
}

module.exports = function (operation, num) {
   
    setTimeout( trampoline, 50);
    //return repeat(operation, num)
}