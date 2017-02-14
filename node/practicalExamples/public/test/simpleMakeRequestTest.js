const expect = require('chai').expect();
const getGoogle = require('../simpleMakeRequest');

describe('getGoogle ');

it('should gets status code for google url', (done)=>{
    getGoogle()
    .then(result => {
        expect(result).to.equal('<html>')
    })
    .then(done, done)
})