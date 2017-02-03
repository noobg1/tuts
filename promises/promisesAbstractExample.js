//Immediatley Resolved
var myPromise = Promise.reject('Doo');

myPromise.then((res) => console.log(res))
.catch((error) => console.log(error));

/*
var myPromise = new Promise(function(resolve, reject){
  setTimeout(() => resolve(4), 2000);
});
myPromise.then((res) => {
  res +=3;
  console.log(res);
});
*/