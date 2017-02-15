const apiCall = require('../routes/api')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)

describe('/GET ', () => {
      it(' should  return 200 status', (done) => {
        chai.request(server)
            .get('/api/read')
            .end((err, res) => {
              expect(res.status).to.be.eqls(200)
              done()
            })
      })
  })


describe('/POST ', () => {
    it(' should return 200 status and added message', (done) => {
      const data = 'new todo'
      chai.request(server)
          .post('/api/write/' + data)
          .end((err, res) => {
            expect(res.body.message).to.be.eqls('Task added')
            expect(res.status).to.be.eqls(200)
            done()
          })
    })

    it('should return 404 status and added message', (done) => {
      const data = 'new todo'
      chai.request(server)
          .post('/api/write/')
          .end((err, res) => {
            console.log(res.Error)
            expect(res.status).to.be.eqls(404)
            done()
          })
    })
})

describe('/PUT update status', () => {
    it(' should return 200 status and updating status if id is present else 501', (done) => {
      const id = 12 // try with valid id and not vaild id
      chai.request(server)
          .put('/api/update/' + id)
          .send({ status: false })
          .end((err, res) => {
            if (err) {
              expect(res.status).to.be.eqls(501)
            }
            else {
              expect(res.body.message).to.be.eqls(`{ Updated task for returnn id = ${id} }`)
              expect(res.status).to.be.eqls(200)
            }
            
            done()
          })
    })
})

describe('/PUT update description ', () => {
    it(' should return 501 status and updating status/ description if id is not present', (done) => {
      const id = 12 // try with valid id and not vaild id
      const data = { status: false, task: 'update to this' }

      chai.request(server)
          .put('/api/update/' + id)
          .send(data)
          .end((err, res) => {
            if (err) {
              expect(res.status).to.be.eqls(501)
              expect(res.text).to.be.eqls(`{"message":"id ${id} is invalid"}`)
            }
            done()
          })
    })

    it(' should return 200 status and updating status if id is present', (done) => {
      const id = 615 // try with valid id and not vaild id
      const data = { status: false, task: 'update to this' }

      chai.request(server)
          .put('/api/update/' + id)
          .send(data)
          .end((err, res) => {
            if(!err) {
              expect(res.text).to.be.eqls(`{ Updated task for given id = ${id} }`)
              expect(res.status).to.be.eqls(200)
            }
            done()
          })
    })
})

describe('/DELETE ', () => {
    it(' should return 501 status on invalid id', (done) => {
      const id = 61 // check this
      chai.request(server)
          .delete('/api/delete/' + id)
          .end((err, res) => {
            if (err) {
              expect(res.status).to.be.eqls(501)
            }
            done()
          })
    })

    it(' should return 200 status on valid id', (done) => {
      const id = 616 // try with valid id and not vaild id  check this
      chai.request(server)
          .delete('/api/delete/' + id)
          .end((err, res) => {
            if(!err) {
              expect(res.status).to.be.eqls(200)
            }
            done()
          })
    })
})
