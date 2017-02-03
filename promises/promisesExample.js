var myPromise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log(`Do first async work`);
    resolve(2);
  }, 2000);
  
});

myPromise.then((result) => {
  setTimeout(() => {
    console.log(`Do ${result} async work`);
    // resolve(result+1);
  }, 2000);
  throw new Error('something went wrong');
  return result+1;
})
  .then((result) => {
    setTimeout(() => {
      console.log(`Do ${result} async work`);
    }, 2000);
    return result+1;
  })
  .then((result) => {
    setTimeout(() => {
      console.log(`Do ${result} async work`);
    }, 2000);
    
    return result+1;
  })
  .catch((error) => {
    console.log(`Error ocuured ${error}`)
  });

