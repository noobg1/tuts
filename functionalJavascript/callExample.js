function isQuack(argument) {
    return Object.prototype.hasOwnProperty.call(argument, 'quack');
}

function duckCount() {
    
    var arguemnetsArray = Array.prototype.slice.call(arguments);
    return arguemnetsArray.filter(isQuack).length;
}

module.exports = duckCount;