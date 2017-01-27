let userArray = process.argv.slice(2);
var user = {};
[   ,user.username,user.email,user.num ] = userArray;

delete(user.num);

console.log(user);