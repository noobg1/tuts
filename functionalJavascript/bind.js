function logger(namespace) {

    return function() {
        var loggingUtility = console.log.bind(console);
        return loggingUtility(namespace,slice.call(arguments).join(' '));
    }
    
}

module.exports = logger;