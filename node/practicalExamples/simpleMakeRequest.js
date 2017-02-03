const axios = require('axios');


const getGoogle = () => axios.get('http://www.google.com')
console.log(axios.get('http://www.google.com'))

getGoogle()
  .then(function (response) {
    console.log(response.data.slice(0,10));
    getFb = () =>axios.get('https://www.facebook.com/')
    console.log(getFb);
    return getFb();
  })
  .then(function (response){
    console.log(response.data.slice(0,10));
  })
  .catch(function (error) {
    console.log(error);
  });

module.exports = getGoogle;

//This should be in the Test file


