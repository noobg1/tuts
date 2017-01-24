
function getDependencies(tree) {
    //console.log(tree);
    var dependecyList = [];
    //var keyArray = Object.keys(tree);
    var obj = tree.dependencies || {};
    var key = Object.keys(obj)[0] || [];
    var versionValue = obj[Object.keys(obj)[0]] || [];
    var result = key + '@' + versionValue.version;
    console.log(result);
    dependecyList.push(result);
    
    return dependecyList;

}
module.exports = getDependencies;