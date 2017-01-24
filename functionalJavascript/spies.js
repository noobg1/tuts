// var spyResult = {count : 0};
// function Spy(target, method) {
//     //console.log(target[method]);
//     target[method] = function spied(){
//         spyResult.count++;
//     }
//     return spyResult;
// }

// module.exports = Spy;

function Spy(object, methodString) {

   var spy = {
       count: 0
   };

   var originalMethod = object[methodString];
   object[methodString] = function () {
           var args = Array.prototype.slice.call(arguments);
           spy.count++;
           return originalMethod.apply(this, args);
       }
   return spy ;
}

module.exports = Spy ;