function repeat(operation, numberTimes) {
    // modify this so it can be interrupted
    if (numberTimes <= 0) return;
    setTimeout(operation, 50);
    return repeat(operation, --numberTimes)
}

module.exports = repeat;