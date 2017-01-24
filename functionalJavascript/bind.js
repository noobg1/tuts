var slice = Array.prototype.slice;
function logger(namespace) {

    return console.log.bind(console,namespace);
    // return function() {
    //     var loggingUtility = console.log.bind(console);
    //     return loggingUtility(namespace,slice.call(arguments).join(' '));
        
    // }
    
}

module.exports = logger;