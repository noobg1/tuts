var result = {count : 0};
function Spy(target, method) {
    //console.log(target[method]);
    target[method] = function spied(){
        result.count++;
    }
    return result;
}

module.exports = Spy;